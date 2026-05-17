const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const sendAdminEmail = async ({ subject, html }) => {
  if (!ADMIN_EMAIL) {
    return;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.NODE_ENV === 'production'
          ? 'YMDB <noreply@yourmoviedatabase.com>'
          : 'YMDB <onboarding@resend.dev>',
        to: ADMIN_EMAIL,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[sendAdminEmail] failed:', res.status, err);
    }
  } catch (err) {
    console.error('[sendAdminEmail] error:', err);
  }
};

module.exports = { sendAdminEmail };
