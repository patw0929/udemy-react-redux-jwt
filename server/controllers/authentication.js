const User = require('../models/user');

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // check email is existing
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // duplicated email - error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if not existing, create and save
    const user = new User({
      email: email,
      password: password
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // response success msg
      res.json({ success: true });
    });
  });
}
