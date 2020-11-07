const HeartsModel = require('../models/hearts');

const insertHeart = (heart) => {
  return new HeartsModel(heart).save();
}

const insertHearts = (hearts) => {
  return HeartsModel.insertMany(hearts);
}

module.exports = {
  insertHeart,
  insertHearts
};