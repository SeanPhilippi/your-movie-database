module.exports = (movieId) => [
  {
    $match: {
      'items.id': movieId
    }
  },
  {
    $project: {
      'username': '$username',
      'rank': {
        '$indexOfArray': [
          '$items.id', movieId
        ]
      }
    }
  }
];