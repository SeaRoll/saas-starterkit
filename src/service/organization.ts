import { auth } from "@/lib/auth";
import { createCustomer } from "@/lib/stripe-customer";
import { headers } from "next/headers";
import { ulid } from "ulid";

export async function getOrCreateOrganization() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers
  });
  if (!session) {
    throw new Error("Unauthorized");
  }

  let org = await auth.api.getFullOrganization({
    headers: await headers(), // pass the headers
  });
  if (!org) {
    const customerId = await createCustomer(session.user.email);
    await auth.api.createOrganization({
      headers: await headers(),
      body: {
        name: "Organization",
        slug: ulid(),
        logo: "",
        metadata: {
          stripeCustomerId: customerId,
        },
      },
    });
    org = await auth.api.getFullOrganization({
      headers: await headers(), // pass the headers
    });
    if (!org) {
      throw new Error("Organization not created");
    }
  }
  return org;
}
