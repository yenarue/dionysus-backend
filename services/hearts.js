const HeartsModel = require('../models/hearts');

const insertHeart = (showId, userId) => {
  const heart = {
    showId: showId,
    userId: userId
  };

  return new HeartsModel(heart).save();
}

const insertHearts = (showIds, userId) => {
  const hearts = showIds.map(showId =>  {
    return {
      showId: showId,
      userId: userId,
    }
  });

  return HeartsModel.insertMany(hearts);
}

const removeHeart = (showId, userId) => {
  return HeartsModel.remove({
    showId: showId,
    userId: userId
  });
}

const getHearts = (userId) => {
  return HeartsModel.find({
    userId: userId
  })
}

module.exports = {
  insertHeart,
  insertHearts,
  removeHeart,
  getHearts,
};