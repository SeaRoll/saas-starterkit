import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createCustomer, getCustomerPortal } from "@/lib/stripe-customer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ulid } from "ulid";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // check if customer ID exists
  // if not, create a new customer
  let customerId = "";

  const stripeCustomer = await prisma.stripeCustomer.findFirst({
    where: { userId: session.user.id },
  });
  if (!stripeCustomer) {
    // Create a new stripe customer
    customerId = await createCustomer(session.user.email);
    await prisma.stripeCustomer.create({
      data: {
        id: ulid(),
        userId: session.user.id,
        customerId,
        subscriptionId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } else {
    customerId = stripeCustomer.customerId;
  }

  const url = await getCustomerPortal(
    customerId,
    process.env.BETTER_AUTH_URL as string,
  );

  redirect(url);
}
