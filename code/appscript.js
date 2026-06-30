
const SPREADSHEET_ID  = '**********';
const CONTACT_SHEET   = 'Contact Submissions';
const OWNER_EMAIL     = 'mh******7@gmail.com';


function doGet(e) {
  try {
    return corsResponse({
      status: 'ok',
      message: 'MH Hridoy Portfolio API',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    Logger.log('doGet error: ' + err.message);
    return corsResponse({ success: false, error: err.message });
  }
}

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents;
    if (!raw) throw new Error('No post data received');

    const payload   = JSON.parse(raw);
    const action    = payload.action;
    const data      = payload.data || {};
    const timestamp = new Date();

    const meta = {
      timestamp: timestamp.toISOString(),
      dateStr:   Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
      timeStr:   Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'HH:mm:ss'),
    };

    if (action === 'contact') {
      const result = handleContact(data, meta);
      return corsResponse({ success: true, result, timestamp: new Date().toISOString() });
    }

    throw new Error('Unknown action: ' + action);

  } catch (err) {
    Logger.log('doPost error: ' + err.message);
    return corsResponse({ success: false, error: err.message });
  }
}

function handleContact(data, meta) {
  const sheet = getOrCreateSheet(CONTACT_SHEET);

  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Date', 'Time',
      'First Name', 'Last Name', 'Email', 'Phone', 'Country',
      'Subject', 'Message', 'Status'
    ]);
    const header = sheet.getRange(1, 1, 1, 11);
    header.setFontWeight('bold');
    header.setBackground('#7c3aed');
    header.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    meta.timestamp, meta.dateStr, meta.timeStr,
    sanitize(data.first_name),
    sanitize(data.last_name),
    sanitize(data.email),
    sanitize(data.phone),
    sanitize(data.country),
    sanitize(data.subject),
    sanitize(data.message),
    'New'
  ]);

  sendContactEmail(data, meta);

  return { action: 'contact', saved: true, message: 'Contact form submitted successfully' };
}

function sendContactEmail(data, meta) {
  try {
    const subject = '📩 New Contact: ' + sanitize(data.subject || 'Portfolio Inquiry');
    const body    = buildContactEmailHTML(data, meta);

    GmailApp.sendEmail(OWNER_EMAIL, subject, '', {
      htmlBody: body,
      replyTo:  sanitize(data.email) || OWNER_EMAIL,
      name:     'MH Hridoy Portfolio'
    });

    Logger.log('Contact email sent to ' + OWNER_EMAIL);
  } catch (err) {
    Logger.log('sendContactEmail error: ' + err.message);
  }
}

function buildContactEmailHTML(data, meta) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body  { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1e293b; }
        .wrap { max-width: 600px; margin: 0 auto; }
        .hdr  { background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); color: #fff; padding: 2rem; border-radius: 10px 10px 0 0; }
        .hdr h2 { margin: 0; font-size: 1.25rem; }
        .hdr p  { margin: 0.4rem 0 0; opacity: 0.85; font-size: 0.9rem; }
        .body { background: #f8fafc; padding: 2rem; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none; }
        .field { margin-bottom: 1rem; }
        .label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7c3aed; margin-bottom: 0.2rem; }
        .value { font-size: 0.9rem; color: #1e293b; }
        .msg   { background: #fff; border-left: 3px solid #7c3aed; padding: 1.25rem; border-radius: 4px; margin-top: 1.5rem; white-space: pre-wrap; line-height: 1.7; font-size: 0.9rem; }
        .foot  { font-size: 0.75rem; color: #94a3b8; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; }
        a { color: #7c3aed; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="hdr">
          <h2>New Contact Form Submission</h2>
          <p>From: ${sanitize(data.first_name)} ${sanitize(data.last_name)}</p>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${sanitize(data.first_name)} ${sanitize(data.last_name)}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${sanitize(data.email)}">${sanitize(data.email)}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone</div>
            <div class="value">${sanitize(data.phone) || '—'}</div>
          </div>
          <div class="field">
            <div class="label">Country</div>
            <div class="value">${sanitize(data.country) || '—'}</div>
          </div>
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${sanitize(data.subject)}</div>
          </div>
          <div class="msg">${htmlEscape(data.message || '')}</div>
          <div class="foot">
            <p>📅 ${meta.dateStr} at ${meta.timeStr}</p>
            <p>🌐 Sent via mhhridoy.dev</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}


function getOrCreateSheet(name) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet   = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function sanitize(val) {
  if (val === null || val === undefined) return '';
  return String(val).replace(/[\r\n\t]/g, ' ').replace(/[<>]/g, '').trim().slice(0, 2000);
}

function htmlEscape(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

function corsResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


function testSetup() {
  Logger.log('=== MH HRIDOY PORTFOLIO — SETUP TEST ===');

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('✅ Spreadsheet: ' + ss.getName());
  } catch (e) {
    Logger.log('❌ Spreadsheet error: ' + e.message);
    return;
  }

  const sheet = getOrCreateSheet(CONTACT_SHEET);
  Logger.log('✅ Sheet "' + CONTACT_SHEET + '" ready — rows: ' + sheet.getLastRow());

  try {
    GmailApp.sendEmail(OWNER_EMAIL, 'Portfolio Backend Test ✅', 'Setup is working correctly.');
    Logger.log('✅ Test email sent to ' + OWNER_EMAIL);
  } catch (e) {
    Logger.log('❌ Email error: ' + e.message);
  }

  Logger.log('=== TEST COMPLETE ===');
}


function deployReminder() {
  Logger.log('Deploy → Manage Deployments → Edit → New version → Deploy');
}
