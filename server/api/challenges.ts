import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "../../types/database.types";
import type { ChallengeWithThumbnail } from "../../types/types";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const query = getQuery(event);

  const { data, error, count } = await client
    .from("challenges")
    .select("*", { count: "exact" })
    .eq("is_public", true)
    .order("date", { ascending: false })
    .limit(query.limit as number)
    .returns<ChallengeWithThumbnail[]>();

  data?.forEach((challenge) => {
    const imageRes = client.storage.from("challenge-png").getPublicUrl(challenge.image as string);
    challenge.image_url = imageRes.data.publicUrl;

    if (challenge.date) {
      challenge.updatedDate = new Date(challenge.date).setDate(
        new Date(challenge.date).getDate() + 1
      );
    }
  });

  return { data, error, count };
});