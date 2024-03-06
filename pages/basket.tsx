import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRecoilState } from "recoil";
import { basketState } from "@/atoms/basketAtom";
import Header from "@/components/Header";

function Basket() {
  const [basket, setBasket] = useRecoilState(basketState);

  const createCheckoutSession = async () => {
    const stripePromise = await loadStripe(
      `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
      //process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    // call the backend to create a checkout session...
    const checkoutSession = await axios.post("/api/checkout_sessions", {
      items: basket,
    });

    // Redirect user/customer to Stripe Checkout
    const result = await stripePromise!.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div>
      <Header />
      <button onClick={() => createCheckoutSession()} type="submit" role="link">
        Create Checkout Session
      </button>
    </div>
  );
}

export default Basket;
