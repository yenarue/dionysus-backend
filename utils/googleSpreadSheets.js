const GoogleSpreadsheet = require('google-spreadsheet').GoogleSpreadsheet;
const credentials = require('../google-docs-credentials.json');

const getDocument = async (spreadsheetUrl) => {
  const idMatchResults = spreadsheetUrl.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/([A-Za-z0-9_-]*)[?]?.*/);
  const sheetId = idMatchResults[1];

  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(credentials);
  await doc.loadInfo();
  console.log("Get Document Title : " + doc.title);

  return doc;
}

module.exports = { getDocument };