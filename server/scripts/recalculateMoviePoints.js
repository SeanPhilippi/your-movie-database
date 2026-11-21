require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('../models/MovieModel');
const List = require('../models/ListModel');
const movieRankingsQuery = require('../controllers/queries/movieRankingsQuery');

// recomputes every movie's averageRanking/points/overallRanking from the
// current List collection (the source of truth) and writes the corrected
// values back onto the Movie documents (the cached values the Top Movies
// List reads). Safe to re-run any time; it's a pure, idempotent recompute.
const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const movieDocs = await Movie.find({});
  const lists = await List.find({});

  // union of every movie id that's cached on a Movie doc or currently on
  // someone's list, keeping title/year/director from wherever we find them
  const infoById = new Map();
  movieDocs.forEach(m =>
    infoById.set(m.id, { id: m.id, title: m.title, year: m.year, director: m.director })
  );
  lists.forEach(list => {
    (list.items || []).forEach(item => {
      infoById.set(item.id, { id: item.id, title: item.title, year: item.year, director: item.director });
    });
  });

  const results = [];
  for (const info of infoById.values()) {
    const data = await List.aggregate(movieRankingsQuery(info.id));
    const voters = data.map(({ rank }) => rank + 1);

    let averageRanking = 0;
    let points = 0;
    if (voters.length > 1) {
      averageRanking = Math.round(voters.reduce((a, c) => a + c) / voters.length);
      points = voters.map(r => 21 - r).reduce((a, c) => a + c);
    } else if (voters.length === 1) {
      averageRanking = voters[0];
      points = 21 - voters[0];
    }

    results.push({ ...info, averageRanking, points, numVoters: voters.length });
  }

  // overallRanking is required by the schema but not actually read anywhere
  // in the frontend (rank is re-derived from array position on every fetch);
  // still populate it so the write is a valid, complete document
  results.sort((a, b) => b.points - a.points);
  results.forEach((r, idx) => {
    r.overallRanking = idx + 1;
  });

  const beforeById = new Map(movieDocs.map(m => [m.id, m]));
  const changed = results.filter(r => {
    const before = beforeById.get(r.id);
    return !before || before.points !== r.points || before.averageRanking !== r.averageRanking;
  });

  if (changed.length) {
    console.log(`${changed.length} movie(s) had incorrect cached stats:\n`);
    changed.forEach(r => {
      const before = beforeById.get(r.id);
      const beforeStr = before ? `${before.points}pts / avg ${before.averageRanking}` : '(no cached doc)';
      console.log(`  ${r.title} (${r.year}): ${beforeStr}  ->  ${r.points}pts / avg ${r.averageRanking} [${r.numVoters} voter(s)]`);
    });
    console.log('');
  } else {
    console.log('No discrepancies found — all cached movie stats already match the live list data.\n');
  }

  const ops = results.map(r => ({
    updateOne: {
      filter: { id: r.id },
      update: {
        $set: {
          id: r.id,
          title: r.title,
          year: r.year,
          director: r.director,
          averageRanking: r.averageRanking,
          points: r.points,
          overallRanking: r.overallRanking,
        },
      },
      upsert: true,
    },
  }));

  if (ops.length) {
    const res = await Movie.bulkWrite(ops);
    console.log(`Wrote ${res.modifiedCount} updated and ${res.upsertedCount} new movie document(s).`);
  }

  await mongoose.disconnect();
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
