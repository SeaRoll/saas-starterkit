import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createCustomer, getCustomerPortal } from "@/lib/stripe-customer";
import { getOrCreateOrganization } from "@/service/organization";
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
  const org = await getOrCreateOrganization();
  const url = await getCustomerPortal(
    org.metadata.stripeCustomerId,
    process.env.BETTER_AUTH_URL as string
  );

  redirect(url);
}
