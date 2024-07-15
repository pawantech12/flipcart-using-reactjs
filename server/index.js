require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "https://flipcart-using-reactjs.vercel.app",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

app.use(express.json());

app.post("/payment", async (req, res) => {
  console.log("Received payment request:", req.body); // Log the received request body
  const amount = req.body.amount;
  const currency = req.body.currency;

  const options = {
    amount: amount,
    currency: currency,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log("Razorpay response:", response); // Log the Razorpay response
    res.json(response);
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    res.status(500).send("Failed to create Razorpay order");
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
