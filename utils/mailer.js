const nodemailer = require('nodemailer');

async function sendLowStockEmail(products) {
  // Create a test account from ethereal.email
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const productList = products.map(p =>
    `• ${p.name} (Qty: ${p.quantity}, Min: ${p.min_quantity})`
  ).join('\n');

  const info = await transporter.sendMail({
    from: '"Retail Store" <noreply@example.com>',
    to: 'admin@example.com',
    subject: '⚠️ Low Stock Alert',
    text: `The following products are low in stock:\n\n${productList}`
  });

  console.log('✅ Low stock email sent!');
  console.log('📬 Preview URL:', nodemailer.getTestMessageUrl(info));
}

module.exports = sendLowStockEmail;
