// route gets latest submissions, unless specified by an param query

import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "../../types/database.types";
import type {
  ChallengeWithUserInfo,
  ProfileResponse,
  SubscriptionResponse,
} from "../../types/types";

export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient<Database>(event);
    const query = getQuery(event);

    async function getSubmissions() {
      let supabaseQuery = client
        .from("challenge_entries")
        .select(
          "id, published_at, user_id, challenge_id, title, image, param, uuid, challenge_solution_id",
          { count: "exact" }
        );
      if (query.param) {
        supabaseQuery = supabaseQuery.eq("param", query.param as string);
      }
      const {
        data,
        error,
        count: completed,
      } = await supabaseQuery
        .eq("published", true)
        .order("published_at", { ascending: false })
        .returns<ChallengeWithUserInfo[]>();

      return { data, error, completed };
    }

    async function getSubmissionCount() {
      let supabaseQuery = client.from("challenge_entries").select("id", { count: "exact" });
      if (query.param) {
        supabaseQuery = supabaseQuery.eq("param", query.param as string);
      }
      const { count } = await supabaseQuery;
      return { count };
    }

    const [submissionsResult, submissionCountResult] = await Promise.all([
      getSubmissions(),
      getSubmissionCount(),
    ]);

    const { data, error } = submissionsResult;
    const { count } = submissionCountResult;

    const profileArray: any[] = [];
    const proArray: any[] = [];
    const likeArray: any[] = [];

    if (data) {
      data.forEach((solution) => {
        profileArray.push(
          client
            .from("profiles")
            .select("*")
            .eq("id", solution.user_id as string)
            .single()
        );

        proArray.push(
          client
            .from("subscriptions")
            .select("stripe_status")
            .eq("user_id", solution.user_id as string)
            .single()
        );

        likeArray.push(
          client.rpc("get_likes_count", {
            entity_id_param: solution.uuid as string,
          })
        );

        // Has generated thumbnail?
        if (solution?.challenge_solution_id) {
          const { data: thumbnail } = client.storage
            .from("challenge_solutions")
            .getPublicUrl(
              `${solution.user_id}/${solution?.challenge_id}/thumbnail-${solution.challenge_solution_id}.webp`
            );

          if (thumbnail) solution.user_thumbnail = thumbnail.publicUrl;
        }
      });

      const profileRes: ProfileResponse[] = await Promise.all(profileArray);
      const proRes: SubscriptionResponse[] = await Promise.all(proArray);
      const likeRes = await Promise.all(likeArray);

      profileRes.forEach((profile, index) => {
        data[index].first_name = profile.data.first_name;
        data[index].last_name = profile.data.last_name;
        data[index].avatar_url = profile.data.avatar_url;
        data[index].username = profile.data.username;
      });

      proRes.forEach((profile, index) => {
        if (profile.data) {
          data[index].proUser = profile.data.stripe_status === "active";
        }
      });

      likeRes.forEach((entity, index) => {
        data[index].like_count = entity.data;
      });
    }

    return { data, error, count };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
