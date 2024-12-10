import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const handleGoogleSignIn = async () => {
    "use server";
    const resp = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", //redirect to dashboard after sign in
    });
    if (resp?.data?.url !== undefined) {
      redirect(resp.data.url);
    }
  };

  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    return <div>Logged in as {session.user.email}</div>;
  }

  return <button onClick={handleGoogleSignIn}>Sign In via Google</button>;
}
