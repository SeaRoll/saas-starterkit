import stripe from "./stripe";

// Creates a subscription for a customer with the given price ids
export async function createSubscription(
  customerId: string,
  priceIds: string[],
) {
  // check that customer has no active subscription
  const subs = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
  });
  if (subs.data.length > 0) {
    throw new Error("Customer already has an active subscription");
  }

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
  // create new subscription with new price ids
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    items: priceIds.map((priceId) => ({ price: priceId })),
    payment_behavior: "error_if_incomplete",
    proration_behavior: "always_invoice",
  });

  // delete subscription items that are not in the new subscription
  for (const item of subscription.items.data) {
    if (!priceIds.includes(item.price.id)) {
      await stripe.subscriptionItems.del(item.id, {
        proration_behavior: "none",
      });
    }
  }

  return subscription;
}

// Gets a subscription by id
export async function getSubscriptionProductName(
  subscriptionId: string,
): Promise<string> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  if (subscription.items.data.length === 0) {
    return "";
  }
  const prod = await stripe.products.retrieve(
    subscription.items.data[0].plan.product as string,
  );
  return prod.name;
}
