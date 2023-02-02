const express = require('express')
const { Delivery, Item, FinalCategory, SubCategory, MainCategory, UserVoteReview, ItemSpec, CategoriesGraphicsAttributesItem, Review, sequelize} = require('../../db/models')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')

const router = express.Router()

// This is your test secret API key.
const stripe = require('stripe')('sk_test_51LmMTSGEtDbpNSeiV5SEzavQFyUOlLrIVtuSWh97G3dXJ6ZlIV96F6mev5RSRgFiWW3gBNZeyovXqW6GtIS0XuQk00ieRFhVEJ');

const YOUR_DOMAIN = 'http://localhost:3006';

router.post('/create-checkout-session', requireAuth, async (req, res) => {
    console.log(req.body)
    console.log(req.user.id)
    const pricesIds = req.body.pricesIds
    const stripeLineItems = pricesIds.map((priceId, i) => {
        return {
            price: priceId,
            quantity: 1
        }
    })

  const session = await stripe.checkout.sessions.create({
    // line_items: [
    //   {
    //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //     price: 'price_1MSUOjGEtDbpNSeirNIATxWX',
    //     quantity: 1,
    //   },
    // ],
    metadata: {
        ...req.body.address,
        userId: req.user.id
    },
    line_items: stripeLineItems,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({stripeUrl: session.url});
});


// const endpointSecret = 'whsec_5dd7d8546b290a40c2bb1d8944145aed3ac86d118633fcf780ed2c6601828336';

// function fulfillOrder(lineItems) {
//     console.log('Fulfilling order', lineItems)
// }

// router.post('/webhook', async (req, res) => {
//     const payload = req.body;
//     const sig = request.headers['stripe-signature'];


//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//     } catch (err) {
//         return response.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the checkout.session.completed event
//     if (event.type === 'checkout.session.completed') {
//         // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
//         const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
//             session.id,
//             {
//                 expand: ['line_items'],
//             }
//         );
//         const lineItems = session.line_items;

//         // Fulfill the purchase...
//         fulfillOrder(lineItems);
//     }

//     response.status(200).end();
// });


module.exports = router
