const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError, Op } = require('sequelize');
const bodyParser = require('body-parser');
const { Item, Review, sequelize, User, Address, Order} = require('./db/models')


const { environment } = require('./config');
const isProduction = environment === 'production';


const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
  });
// app.use(express.json());
// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Stripe webhook
const fulfillOrder = async (session, lineItems) => {

    console.log('lineItems', lineItems)
    console.log('lineItems.data', lineItems.data)
    console.log('session', session)
    const metadata = session.metadata
    const itemsPriceIds = lineItems.data.map((lineItem) => lineItem.price.id)
    const items = await Item.findAll({
        where: {
            stripePriceId: {
                [Op.in]: itemsPriceIds
            }
        },
        raw: true
    })
    console.log('meta', metadata)
    console.log('items', items)
    const userAddress = await User.findByPk(metadata.userId, {
        include: {
            model: Address,
            where: {
                firstName: metadata.firstName,
                lastName: metadata.lastName,
                city: metadata.city,
                street: metadata.street,
                postCode: metadata.postCode,
                flatNumber: metadata.flatNumber,
                phoneNumber: metadata.phoneNumber,
                email: metadata.email
            }
        }
    })
    console.log('US', userAddress)
    const counts = lineItems.data.map((item) => item.quantity)
    const itemsIdsPrices = items.map((item, i) => [item.id, item.price, counts[i]])
    await Order.create({
        userId: metadata.userId,
        addressId: userAddress.id,
        items: itemsIdsPrices.join(':')
    })
}

const stripe = require('stripe')('sk_test_51LmMTSGEtDbpNSeiV5SEzavQFyUOlLrIVtuSWh97G3dXJ6ZlIV96F6mev5RSRgFiWW3gBNZeyovXqW6GtIS0XuQk00ieRFhVEJ');
const endpointSecret = 'whsec_5dd7d8546b290a40c2bb1d8944145aed3ac86d118633fcf780ed2c6601828336';
app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
    console.log('webhoooooooooooook')

    const payload = request.body;
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      console.log('==================')
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(err.message)
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log('EV', event)

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ['line_items'],
        }
      );

      // Fulfill the purchase...
      fulfillOrder(session, sessionWithLineItems.line_items);
    }

    response.status(200);
  });

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

// serving static files
app.use(express.static('static'))

const routes = require('./routes')
app.use(routes)

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found")
    err.title = "Resource not found"
    err.errors = ["The requested resource couldn't be found"]
    err.status = 404
    next(err)
})

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      err.errors = err.errors.map((e) => e.message);
      err.title = 'Validation error';
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    console.log('IS IN ERROR ROUTE')
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
});


module.exports = app;
