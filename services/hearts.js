const HeartsModel = require('../models/hearts');

const insertHeart = (heart) => {
  return new HeartsModel(heart).save();
}

const insertHearts = (hearts) => {
  return HeartsModel.insertMany(hearts);
}

const removeHeart = (showId, userId) => {
  return HeartsModel.remove({
    showId: showId,
    userId: userId
  });
}

module.exports = {
  insertHeart,
  insertHearts,
  removeHeart,
};