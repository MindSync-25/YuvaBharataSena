const SPREADSHEET_ID = '1JO8grTWxHeuQzeJs9h_dpLB_dp2hDRgyIXykHRRIID4';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getOrCreateSheet_();
    ensureHeaderRow_(sheet);

    const data = e.parameter || {};
    const now = new Date();

    sheet.appendRow([
      now,
      data.fullName || '',
      data.phone || '',
      data.district || '',
      data.taluk || '',
      data.source || ''
    ]);

    return json_({
      ok: true,
      spreadsheetId: SPREADSHEET_ID,
      sheetName: sheet.getName(),
      row: sheet.getLastRow()
    });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, message: 'YBS join form endpoint is active.' });
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheets()[0];
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    'Submitted At',
    'Name',
    'Phone',
    'District',
    'Taluk',
    'Source URL'
  ]);
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
