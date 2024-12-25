import stripe from "./stripe";

// Creates a stripe customer with the given email
// Returns the created customer id
export async function createCustomer(email: string): Promise<string> {
  const customer = await stripe.customers.create({
    email,
  });

  return customer.id;
}

// Retrieves the customer object with the given id
// Returns the url to the customer portal
export async function getCustomerPortal(
  customerId: string,
  returnUrl: string,
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session.url;
}

// Creates a subscription for a customer with the given price ids
export async function createSubscription(customerId: string, priceId: string) {
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
    items: [{ price: priceId }],
    payment_behavior: "error_if_incomplete",
  });
  return subscription;
}

// Updates a subscription with the given price ids
export async function updateSubscription(customerId: string, priceId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
  });
  if (subscriptions.data.length === 0) {
    throw new Error("Customer has no active subscription");
  }
  if (subscriptions.data[0].items.data.length === 0) {
    throw new Error("Subscription has no items");
  }

  // update subscription item
  await stripe.subscriptionItems.update(
    subscriptions.data[0].items.data[0].id,
    {
      price: priceId,
      quantity: 1,
      proration_behavior: "always_invoice",
      payment_behavior: "error_if_incomplete",
    },
  );
}

type SubscriptionProductData = {
  subscriptionId: string;
  productName: string;
  data: Record<string, string>;
};

// Gets a subscription by id
export async function getSubProduct(
  customerId: string,
): Promise<SubscriptionProductData | null> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
  });

  if (
    subscriptions.data.length === 0 ||
    subscriptions.data[0].items.data.length === 0
  ) {
    return null;
  }
  const prod = await stripe.products.retrieve(
    subscriptions.data[0].items.data[0].plan.product as string,
  );
  return {
    subscriptionId: subscriptions.data[0].id,
    productName: prod.name,
    data: prod.metadata,
  };
}
