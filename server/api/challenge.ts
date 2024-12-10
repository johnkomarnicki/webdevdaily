// route gets latest challenge, unless specified by an id query

import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "../../types/database.types";
import type { ChallengeWithThumbnail } from "../../types/types";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const query = getQuery(event);

  let supabaseQuery = client
    .from("challenges")
    .select("*", { count: "exact" })
    .eq("is_public", true);

  if (query.id) {
    supabaseQuery = supabaseQuery.eq("id", query.id).limit(1);
  } else {
    supabaseQuery = supabaseQuery.order("date", { ascending: false }).limit(1);
  }

  const { data, error, count } = await supabaseQuery
    .returns<ChallengeWithThumbnail[]>()
    .maybeSingle();

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  if (data) {
    const imageRes = client.storage.from("challenge-png").getPublicUrl(data.image as string);
    data.image_url = imageRes.data.publicUrl;
  }

  return { data, error, count };
});
