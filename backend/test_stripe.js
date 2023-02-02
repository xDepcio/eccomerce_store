const stripe = require('stripe')('sk_test_51LmMTSGEtDbpNSeiV5SEzavQFyUOlLrIVtuSWh97G3dXJ6ZlIV96F6mev5RSRgFiWW3gBNZeyovXqW6GtIS0XuQk00ieRFhVEJ');

// stripe.products.create({
//   name: 'Starter Subscription',
// }).then(product => {
//   stripe.prices.create({
//     unit_amount: 1200,
//     currency: 'pln',
//     product: product.id,
//   }).then(price => {
//     console.log('Success! Here is your starter subscription product id: ' + product.id);
//     console.log('Success! Here is your premium subscription price id: ' + price.id);
//   });
// });


// async function myFunc() {
//     const myPromise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve('foo'), 3000)
//     })

//     const val = await myPromise.then((data) => data)
//     console.log(val)
//     console.log('aftewr')
// }

// myFunc()

async function myFunc() {
    // const priceId = await stripe.products.create({
    //     name: 'itemas',
    // })
    //     .then(product => {
    //         stripe.prices.create({
    //             unit_amount: 1000 * 100,
    //             currency: 'pln',
    //             product: product.id,
    //         })
    //             .then(price => {
    //                 console.log('Success! Here is your starter subscription product id: ' + product.id);
    //                 console.log('Success! Here is your premium subscription price id: ' + price.id);
    //                 return price.id
    //             })
    //     })
    //     .then(price => {
    //         console.log('price', price)
    //         return price
    //     })
    // console.log(priceId)

    const priceId = await stripe.products.create({
        name: 'itemas',
    })
        .then(product => {
            return stripe.prices.create({
                unit_amount: 1000 * 100,
                currency: 'pln',
                product: product.id,
            })
                .then(price => {
                    console.log('Success! Here is your starter subscription product id: ' + product.id);
                    console.log('Success! Here is your premium subscription price id: ' + price.id);
                    return price.id
                })
        })
        .then(priceId => {
            console.log('priceId', priceId)
            return priceId
        })

    console.log(priceId)

}

myFunc()
