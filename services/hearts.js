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
  console.log(showId)
  console.log(userId)
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