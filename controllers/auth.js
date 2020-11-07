const UsersService = require('../services/users');

const signUp = (req, res, next) => {
  return UsersService.findAndAddUser(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err instanceof UsersService.AlreadyExistError) {
        res.sendStatus(409);
      } else {
        next(err)
      }
    });
}

module.exports = {
  signUp
};