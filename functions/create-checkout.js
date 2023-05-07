require('dotenv').config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
exports.handler = async function (event, context) {
  let { email, uid, cid, items, shippingCharges } = JSON.parse(event.body);
  try {
    const lineItems = [];
    items.forEach((item) => {
      let cartItem = {
        quantity: item.quantity,
        price_data: {
          currency: "CAD",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount_decimal: item.price,
        },
      };
      lineItems.push(cartItem);
    });
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      submit_type: "pay",
      customer_email: email,
      locale: "en",
      shipping_address_collection: {
        allowed_countries: ["CA"],
      },
      success_url: `${process.env.REACT_APP_BASE_URL}/order-detail?cid=${cid}&status=success`,
      cancel_url: `${process.env.REACT_APP_BASE_URL}/order-detail?cid=${cid}&status=cancel`,
      currency: "CAD",
      metadata: {
        uid,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Shipping Charges",
            fixed_amount: {
              currency: "CAD",
              amount: shippingCharges,
            },
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
      ],
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        url: checkoutSession.url,
        id: checkoutSession.id,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error while checkout", msg: error }),
    };
  }
};
