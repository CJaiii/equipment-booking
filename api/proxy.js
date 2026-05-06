const FLOWS = {
  GET:    'https://default53f856f259b24315ab95d7d4bca0be.31.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/0dcc702848164a71b2c5f6f9a49b26c2/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZqxTH8w45_akldCU0XlXvJMfEI__zXN3mr3Q-38gQcg',
  POST:   'https://default53f856f259b24315ab95d7d4bca0be.31.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/98674d50debf48cfabe4cfdd3c925801/triggers/manual/paths/invoke?api-version=1',
  DELETE: 'https://default53f856f259b24315ab95d7d4bca0be.31.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/37f775b41a9e4879983cc12b50b3800f/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TVEdN0GxzmSLREN3qignJSD1Rs-EHrpjAvS1Ao-IJHY',
  UPDATE: 'https://default53f856f259b24315ab95d7d4bca0be.31.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/9cf4aa5be2b04c05b9457fdd4bd9ea0b/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WG1mpB4nJwnEG4X81jkowv13iIpCzTCKXmufzRy9k_Y',
};

module.exports = async (req, res) => {
  // Allow all origins — CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const action = req.query.action;
  const flowUrl = FLOWS[action];

  if (!flowUrl) {
    return res.status(400).json({ error: 'Unknown action: ' + action });
  }

  try {
    const body = req.body || {};
    const response = await fetch(flowUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
