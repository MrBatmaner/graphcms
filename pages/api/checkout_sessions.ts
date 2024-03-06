import type { NextApiRequest, NextApiResponse } from "next";
//import {} from 'dotenv/config'
//import * as Stripe from "stripe";
//import { Stripe } from "stripe";

//import Stripe from "stripe";
//const stripe = new Stripe(`process.env.STRIPE_SECRET_KEY`, {
//apiVersion: "2023-10-16",
//});
//require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const items: Product[] = req.body.items;

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "aud",
      product_data: {
        images: [item.images[0].url],
        name: item.name,
        description: item.description,
      },
      unit_amount: item.price,
    },
    //description: item.description,
    quantity: 1,
  }));

  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        //payment_method_types: ["card"],
        //shipping_rates: ['shr_1NgD51BzzU9xfrDfIOqNytB0'],
        //shipping_address_collection: {
        //allowed_countries: ['GB', 'US', 'CA', 'AU']
        //},
        line_items: transformedItems,
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/checkout`,
        //success_url: `${req.headers.origin}`,
        //cancel_url: `${req.headers.origin}`,
        metadata: {
          images: JSON.stringify(items.map((item) => item.images[0].url)),
        },
      });

      res.status(200).json({ id: session.id });
      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
