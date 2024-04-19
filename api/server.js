// const express = require('express');
// const server = express();
// const cors = require('cors');
// const helmet = require('helmet');
// const stripe = require('stripe')('sk_test_51NC8lQGsmD2eSVUWNMwsgPhP3DT4WhcFXFE2wRkczN9Yj5sNX6ADRIMV9mUWyLKSpua3YZjCmeAi1md8n9BQUi1000949tHSD9');

// const YOUR_DOMAIN = 'http://localhost:3000';

// server.use(helmet());
// server.use(cors());
// server.use(express.json());
// server.use(express.static('public'));


// server.use((err, req, res, next) => {
//   res.status(500).json({
//     message: err.message,
//     stack: err.stack
//   });
// });

// server.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     ui_mode: 'embedded',
//     line_items: [
//       {
//         price: 'price_1P7BscGsmD2eSVUWvsRl98S0', // Monthly Subscription
//         quantity: 1,
//       },
//       {
//         price: 'price_1P7BtbGsmD2eSVUWSDjJV9oe', // Annual Subscription
//         quantity: 1,
//       },
//     ],
//     mode: 'subscription',
//     return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
//   });

//   res.send({clientSecret: session.client_secret});
// });

// server.get('/session-status', async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//   res.send({
//     status: session.status,
//     customer_email: session.customer_details.email
//   });
// });

// server.listen(4242, () => console.log('Running on port 4242'));

// module.exports = server;

// This is your test secret API key.

const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(`${STRIPE_API_KEY}`);
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1P7BscGsmD2eSVUWvsRl98S0',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
  } catch(error) {
    console.error(error);
    res.status(500).send('An error occurred, unable to create checkout session.');
  }
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(4242, () => console.log('Running on port 4242'));

module.exports = app;