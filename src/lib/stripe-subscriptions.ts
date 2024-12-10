import stripe from "./stripe";

// Creates a subscription for a customer with the given price ids
export async function createSubscription(
  customerId: string,
  priceIds: string[],
) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: priceIds.map((priceId) => ({ price: priceId })),
    payment_behavior: "error_if_incomplete",
  });
  return subscription;
}

// Updates a subscription with the given price ids
export async function updateSubscription(
  subscriptionId: string,
  priceIds: string[],
) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    items: priceIds.map((priceId) => ({ price: priceId })),
    payment_behavior: "error_if_incomplete",
    proration_behavior: "always_invoice",
  });
  return subscription;
}
