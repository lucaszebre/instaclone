import PusherServer from "pusher"
import PusherClient from "pusher-js"

// Fall back to empty strings so that importing this module does not throw at
// build time (Next evaluates route modules while collecting page data) when the
// Pusher variables are not set. Real-time features need the real values.
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID ?? "",
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? "",
  secret: process.env.PUSHER_APP_SECRET ?? "",
  cluster: "eu",
  useTLS: true,
})

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? "",
  {
    cluster: "eu",
  }
)
