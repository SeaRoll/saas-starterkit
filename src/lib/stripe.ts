import Stripe from "stripe";

const stripeSingleton = () => {
  return new Stripe(process.env.STRIPE_KEY as string);
};

declare const globalThis: {
  stripeGlobal: ReturnType<typeof stripeSingleton>;
} & typeof global;

const stripe = globalThis.stripeGlobal ?? stripeSingleton();

export default stripe;

if (process.env.NODE_ENV !== "production") globalThis.stripeGlobal = stripe;
