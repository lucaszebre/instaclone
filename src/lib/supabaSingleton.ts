"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SupabaseSingleton() {
  const supabase = createClientComponentClient();
  return supabase
}