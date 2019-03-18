const bcrypt = require("bcrypt-nodejs");

const hash = (word, err, done) => {
    bcrypt.hash(word, null, null, (hashErr, hashedWord) => {
      if (hashErr) {
        console.log(hashErr);
      }
      if (hashErr && err) {
        return err(hashErr);
      }
      return done(hashedWord);
    });
}

exports.hash = hash;