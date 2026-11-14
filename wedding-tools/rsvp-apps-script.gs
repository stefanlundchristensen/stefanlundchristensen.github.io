/**
 * S + C bryllup: RSVP receiver.
 *
 * Saves each answer as a row in the Google Sheet this script belongs to
 * and sends a notification mail. Setup steps are in wedding-tools/README.md.
 *
 * Open the Sheet → Extensions → Apps Script, paste this file, then
 * Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 */

// Where the notification mail goes. Empty = the Google account that owns the script.
// Several addresses: 'a@example.com,b@example.com'
const NOTIFY_EMAIL = '';

const SHEET_NAME = 'Svar';
const HEADERS = ['Modtaget', 'Navn(e)', 'E-mail', 'Kommer', 'Antal', 'Allergier og hensyn', 'Besked', 'Sangønske'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const p = (e && e.parameter) || {};

    // Honeypot: bots fill it in. Answer "ok" but store nothing.
    if (p._gotcha) return json({ ok: true });

    const names = clean(p.names, 300);
    const email = clean(p.email, 254);
    const attendance = p.attendance === 'yes' ? 'yes' : p.attendance === 'no' ? 'no' : '';
    if (!names || !attendance || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: 'invalid' });
    }
    const coming = attendance === 'yes';
    const count = coming ? Math.min(20, Math.max(1, parseInt(p.guest_count, 10) || 1)) : 0;
    const needs = coming ? clean(p.allergies_and_needs, 1500) : '';
    const message = clean(p.message, 2000);
    const song = coming ? clean(p.song, 200) : '';

    lock.waitLock(20000);
    const book = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = book.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    ensureOverview(book);
    sheet.appendRow([new Date(), cell(names), cell(email), coming ? 'Ja' : 'Nej', count, cell(needs), cell(message), cell(song)]);
    lock.releaseLock();

    // The row is saved. A mail problem (e.g. daily quota) must not make the guest retry.
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL || Session.getEffectiveUser().getEmail(),
        replyTo: email,
        subject: 'S & C Bryllup | Svar fra ' + names.replace(/[\r\n]+/g, ' ') + (coming ? ' (kommer, ' + count + ')' : ' (afbud)'),
        body: [
          'Navn(e): ' + names,
          'E-mail: ' + email,
          'Kommer: ' + (coming ? 'Ja, ' + count + ' person(er)' : 'Nej'),
          'Allergier og hensyn: ' + (needs || '-'),
          'Besked: ' + (message || '-'),
          'Sangønske: ' + (song || '-'),
          '',
          'Alle svar: ' + book.getUrl()
        ].join('\n')
      });
    } catch (mailError) {
      console.error(mailError);
    }
    return json({ ok: true });
  } catch (error) {
    console.error(error);
    try { lock.releaseLock(); } catch (ignored) {}
    return json({ ok: false, error: 'server' });
  }
}

// Run once from the editor (select setup, press Run) to create the "Svar" and
// "Overblik" tabs before the first answer arrives. Safe to run again.
function setup() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  ensureOverview(book);
}

// "Overblik": live totals plus every allergy and song wish in one place, for
// planning, the caterer and the DJ. Formulas only, so it updates by itself.
// Created once; delete the tab to have it rebuilt.
function ensureOverview(book) {
  if (book.getSheetByName('Overblik')) return;
  const o = book.insertSheet('Overblik', 0);
  const s = "'" + SHEET_NAME + "'!";
  o.getRange('A1').setValue('Overblik').setFontWeight('bold').setFontSize(14);
  o.getRange('A3:A6').setValues([['Svar i alt'], ['Svar, der kommer'], ['Gæster i alt'], ['Afbud']]);
  o.getRange('B3').setFormula('=COUNTA(' + s + 'B2:B)');
  o.getRange('B4').setFormula('=COUNTIF(' + s + 'D2:D,"Ja")');
  o.getRange('B5').setFormula('=SUMIF(' + s + 'D2:D,"Ja",' + s + 'E2:E)');
  o.getRange('B6').setFormula('=COUNTIF(' + s + 'D2:D,"Nej")');
  o.getRange('A8').setValue('Allergier og hensyn').setFontWeight('bold');
  o.getRange('A9').setFormula('=IFERROR(FILTER({' + s + 'B2:B,' + s + 'F2:F},' + s + 'F2:F<>""),"Ingen endnu")');
  o.getRange('D8').setValue('Sangønsker').setFontWeight('bold');
  o.getRange('D9').setFormula('=IFERROR(FILTER({' + s + 'B2:B,' + s + 'H2:H},' + s + 'H2:H<>""),"Ingen endnu")');
  o.setColumnWidth(1, 220);
  o.setColumnWidth(2, 260);
  o.setColumnWidth(4, 220);
  o.setColumnWidth(5, 260);
}

// Opening the web app URL in a browser shows that it is alive.
function doGet() {
  return json({ ok: true, service: 'S + C RSVP' });
}

function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

// Stop text such as "=IMPORTXML(...)" from running as a formula in the Sheet.
function cell(text) {
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
