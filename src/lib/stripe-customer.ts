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
