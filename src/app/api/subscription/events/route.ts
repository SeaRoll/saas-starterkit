import prisma from "@/lib/db";
import stripe from "@/lib/stripe";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Bad Request", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET as string,
    );
  } catch (err) {
    console.log(`Error verifying webhook: ${err}`);
    return new Response(`Bad Request ${err}`, { status: 400 });
  }

  switch (event.type) {
    case "subscription_schedule.canceled":
      const subSchedule: Stripe.SubscriptionSchedule = event.data.object;
      if (
        !subSchedule.subscription ||
        typeof subSchedule.subscription !== "string"
      ) {
        console.log("No subscription found in event");
        break;
      }
      const foundSub = await prisma.stripeCustomer.findFirst({
        where: { subscriptionId: subSchedule.subscription },
      });
      if (!foundSub) {
        console.log("No subscription found in database");
        break;
      }
      await prisma.stripeCustomer.update({
        where: { id: foundSub.id },
        data: { subscriptionId: null },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json({ received: true }, { status: 200 });
}
