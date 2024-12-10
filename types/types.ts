import type { Tables } from "./database.types";

export type ChallengeWithThumbnail = Tables<"challenges"> & {
  image_url?: string;
  updatedDate?: number;
  userSubmission?: Tables<"challenge_entries"> & {
    user_challenge_thumbnail?: string;
    user?: Tables<"profiles">;
  };
};

export type ProjectWithThumbnail = Tables<"projects"> & {
  image_url?: string;
  updatedDate?: number;
  userSubmission?: Tables<"project_submissions">;
};

export type ChallengeWithUserInfo = Tables<"challenge_entries"> & {
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
  username?: string | null;
  proUser?: boolean | null;
  user_thumbnail?: string;
  like_count: number | null;
};

export type Profile = Tables<"profiles">;

export type Subscription = Tables<"subscriptions">;

export type ProfileResponse = {
  data: Profile;
  error: any;
};

export type SubscriptionResponse = {
  data: Subscription;
  error: any;
};
