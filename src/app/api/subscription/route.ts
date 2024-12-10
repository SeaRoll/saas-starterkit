import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import {
  createSubscription,
  updateSubscription,
} from "@/lib/stripe-subscriptions";
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

  const stripeCustomer = await prisma.stripeCustomer.findFirst({
    where: { userId: session.user.id },
  });
  if (!stripeCustomer) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (isUpdate) {
    if (!stripeCustomer.subscriptionId) {
      return new Response("Bad Request", { status: 400 });
    }
    await updateSubscription(stripeCustomer.subscriptionId, [priceId]);
  } else {
    const sub = await createSubscription(stripeCustomer.customerId, [priceId]);
    if (!sub) {
      return new Response("Internal Server Error", { status: 500 });
    }
    await prisma.stripeCustomer.update({
      where: { id: stripeCustomer.id },
      data: {
        subscriptionId: sub.id,
      },
    });
  }

  redirect("/");
}
