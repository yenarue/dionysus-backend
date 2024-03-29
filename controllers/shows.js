const GoogleSpreadSheets = require('../utils/googleSpreadSheets');
const HeartsService = require('../services/hearts');
const config = require('../config');

const getAllShows = async (req, res) => {
  // 이거 서비스 로직같긴한데 일단 고
  const doc = await GoogleSpreadSheets.getDocument(config.spreadsheets.rawData);
  const sheet = doc.sheetsByIndex[0];

  // for headers
  // await sheet.loadHeaderRow();
  // const headers = sheet.headerValues;
  // const rows = await sheet.getRows();

  let headers;

  sheet.loadHeaderRow()
    .then(async () => {
      headers = sheet.headerValues;

      return sheet.getRows({
        offset: req.query.offset,
        limit: req.query.limit
      });
    }).then(async rows => {

    const data = rows.map((row, index) => {
      const answer = {
        id: row['고유b'],
        order: index + 1,
        tags: [],
      };

      headers.forEach(header => {
        if (header.includes('특징') && !!row[header]) {
          const feature = row[header].trim();

          if (feature.length > 0) {
            answer.tags.push(feature);
          }
        } else {
          answer[header] = row[header];
        }
      })

      return answer;
    })

    res.json({
      headers: headers,
      data: data,
    })
  }).catch(err => console.error(err));
}

const putHeart = (req, res, next) => {
  const userId = req.userId ? req.userId : req.headers['x-id-token'];

  HeartsService.insertHeart(req.params.showId, userId)
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
}

const postHearts = (req, res) => {
  const userId = req.userId;

  HeartsService.insertHearts(req.body.showIds, userId)
    .then(() => res.sendStatus(200)) // 제대로 : 몇 개 저장했고 몇 개 실패했는지 보내야 함
    .catch(err => next(err));
}

const deleteHeart = (req, res) => {
  const userId = req.userId ? req.userId : req.headers['x-id-token'];

  HeartsService.removeHeart(req.params.showId, userId)
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
}

const getHeartedShows = (req, res, next) => {
  const userId = req.userId;

  HeartsService.getHearts(userId)
    .then(results => {
      res.json(results.map(result => result.showId))
    })
    .catch(err => next(err));
}

module.exports = {
  getAllShows,
  putHeart,
  postHearts,
  deleteHeart,
  getHeartedShows,
};