"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function() {
  const supabase = createClientComponentClient();
  return supabase
}