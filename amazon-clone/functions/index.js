/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51QwaDw2cXmh6jegriYpLz2VJOuI1gQP39C0Takrys6V0C" +
    "jNVrkZaLBw4mYqezJR4pY1VW4vYi4KvKUvwYG9Zldlk00oXo96igx",
);

// API

// App Config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  try {
    const {total} = request.body;

    console.log("📝 Received total:", total);

    if (!total || isNaN(total)) {
      console.error("❌ Error: Invalid total received:", total);
      return response.status(400).json({error: "Invalid total amount"});
    }

    console.log("✅ Payment Request Received! Amount:", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total, 10), // Convert to cents
      currency: "usd",
    });

    response.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("❌ Payment Intent Error:", error);
    response.status(500).json({error: error.message});
  }
});

// Listen Command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://127.0.0.1:5001/clone-6b855/us-central1/api
