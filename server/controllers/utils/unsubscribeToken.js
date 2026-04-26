const crypto = require('crypto');
const keys = require('../../config/keys');

// token format: base64url(username:category).hmac
// stateless — no DB record needed.

exports.createUnsubscribeToken = (username, category) => {
  const payload = Buffer.from(`${username}:${category}`).toString('base64url');
  const sig = crypto
    .createHmac('sha256', keys.secret)
    .update(payload)
    .digest('hex');
  return `${payload}.${sig}`;
};

exports.verifyUnsubscribeToken = token => {
  const parts = token.split('.');
  if (parts.length !== 2) {
    return null;
  }
  const [payload, sig] = parts;

  const expectedSig = crypto
    .createHmac('sha256', keys.secret)
    .update(payload)
    .digest('hex');

  // compare raw hex strings as UTF-8 buffers (constant-time, avoids hex-decode truncation)
  if (sig.length !== expectedSig.length) {
    return null;
  }
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
    return null;
  }

  try {
    const decoded = Buffer.from(payload, 'base64url').toString('utf8');
    const [username, category] = decoded.split(':');
    if (!username || !category) {
      return null;
    }
    return { username, category };
  } catch {
    return null;
  }
};
