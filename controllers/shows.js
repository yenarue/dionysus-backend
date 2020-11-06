const GoogleSpreadSheets = require('../utils/googleSpreadSheets');
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

    console.log('headers=', headers);
    console.log(rows.length);
    console.log(rows[0]);

    const data = rows.map((row, index) => {
      const answer = {
        id: row['고유b'],
        order: index + 1,
      };

      headers.forEach(header => {
        answer[header] = row[header];
      })

      return answer;
    })

    res.json({
      headers: headers,
      data: data,
    })
  }).catch(err => console.error(err));
}

module.exports = { getAllShows };