require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
exports.handler = async function (event, context) {
    const { sessionId } = JSON.parse(event.body);
    try {
        const result = await stripe.checkout.sessions.retrieve(sessionId);
        return {
            statusCode: 200,
            body: JSON.stringify({ result }),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error while checkout", msg: error }),
        };
    }
};
