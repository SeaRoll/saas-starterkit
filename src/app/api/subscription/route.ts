import { auth } from "@/lib/auth";
import { createSubscription, updateSubscription } from "@/lib/stripe-customer";
import { getOrCreateOrganization } from "@/service/organization";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const priceId = searchParams.get("priceId");
  if (!priceId) {
    return new Response("Bad Request", { status: 400 });
  }
  const isUpdate = searchParams.get("update") === "true";

  const org = await getOrCreateOrganization();

  if (isUpdate) {
    await updateSubscription(org.metadata.stripeCustomerId, priceId);
  } else {
    const sub = await createSubscription(
      org.metadata.stripeCustomerId,
      priceId
    );
    if (!sub) {
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  redirect("/");
}
