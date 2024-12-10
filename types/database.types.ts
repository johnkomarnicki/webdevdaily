export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenge_entries: {
        Row: {
          challenge_id: number | null
          challenge_solution_id: string | null
          created_at: string | null
          css: Json | null
          description: string | null
          extensions: Json | null
          head: Json | null
          html: Json | null
          id: number
          IDE: boolean | null
          image: string | null
          integrations: Json | null
          javascript: Json | null
          param: string | null
          published: boolean | null
          published_at: string | null
          repository_url: string | null
          site_url: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          uuid: string | null
        }
        Insert: {
          challenge_id?: number | null
          challenge_solution_id?: string | null
          created_at?: string | null
          css?: Json | null
          description?: string | null
          extensions?: Json | null
          head?: Json | null
          html?: Json | null
          id?: number
          IDE?: boolean | null
          image?: string | null
          integrations?: Json | null
          javascript?: Json | null
          param?: string | null
          published?: boolean | null
          published_at?: string | null
          repository_url?: string | null
          site_url?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          uuid?: string | null
        }
        Update: {
          challenge_id?: number | null
          challenge_solution_id?: string | null
          created_at?: string | null
          css?: Json | null
          description?: string | null
          extensions?: Json | null
          head?: Json | null
          html?: Json | null
          id?: number
          IDE?: boolean | null
          image?: string | null
          integrations?: Json | null
          javascript?: Json | null
          param?: string | null
          published?: boolean | null
          published_at?: string | null
          repository_url?: string | null
          site_url?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      challenges: {
        Row: {
          challenge_id: number | null
          created_at: string | null
          date: string | null
          design_link: string | null
          id: number
          image: string | null
          is_public: boolean | null
          objectives: Json | null
          param: string | null
          pro_challenge: boolean | null
          title: string | null
        }
        Insert: {
          challenge_id?: number | null
          created_at?: string | null
          date?: string | null
          design_link?: string | null
          id?: number
          image?: string | null
          is_public?: boolean | null
          objectives?: Json | null
          param?: string | null
          pro_challenge?: boolean | null
          title?: string | null
        }
        Update: {
          challenge_id?: number | null
          created_at?: string | null
          date?: string | null
          design_link?: string | null
          id?: number
          image?: string | null
          is_public?: boolean | null
          objectives?: Json | null
          param?: string | null
          pro_challenge?: boolean | null
          title?: string | null
        }
        Relationships: []
      }
      click_tracking: {
        Row: {
          click_type: string | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          click_type?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          click_type?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      design_downloads: {
        Row: {
          challenge_id: number | null
          challenge_title: string | null
          created_at: string
          id: number
          type: string | null
          user_id: string | null
        }
        Insert: {
          challenge_id?: number | null
          challenge_title?: string | null
          created_at?: string
          id?: number
          type?: string | null
          user_id?: string | null
        }
        Update: {
          challenge_id?: number | null
          challenge_title?: string | null
          created_at?: string
          id?: number
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          entity_id: string | null
          entity_user_id: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          entity_user_id?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          entity_user_id?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      playground: {
        Row: {
          created_at: string
          css: Json | null
          extensions: Json | null
          head: Json | null
          html: Json | null
          id: string
          javascript: Json | null
          playground_solution_id: string | null
          private: boolean | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          css?: Json | null
          extensions?: Json | null
          head?: Json | null
          html?: Json | null
          id?: string
          javascript?: Json | null
          playground_solution_id?: string | null
          private?: boolean | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          css?: Json | null
          extensions?: Json | null
          head?: Json | null
          html?: Json | null
          id?: string
          javascript?: Json | null
          playground_solution_id?: string | null
          private?: boolean | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_file_path: string | null
          avatar_url: string | null
          created_at: string | null
          editor_settings: Json | null
          first_name: string | null
          id: string
          last_name: string | null
          username: string | null
        }
        Insert: {
          avatar_file_path?: string | null
          avatar_url?: string | null
          created_at?: string | null
          editor_settings?: Json | null
          first_name?: string | null
          id: string
          last_name?: string | null
          username?: string | null
        }
        Update: {
          avatar_file_path?: string | null
          avatar_url?: string | null
          created_at?: string | null
          editor_settings?: Json | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          username?: string | null
        }
        Relationships: []
      }
      project_submissions: {
        Row: {
          code_link: string | null
          created_at: string
          description: string | null
          id: number
          online_ide: boolean | null
          project_id: number | null
          project_solution_image_id: string | null
          published: boolean | null
          published_at: string | null
          site_url: string | null
          title: string | null
          url_param: string | null
          user_id: string | null
        }
        Insert: {
          code_link?: string | null
          created_at?: string
          description?: string | null
          id?: number
          online_ide?: boolean | null
          project_id?: number | null
          project_solution_image_id?: string | null
          published?: boolean | null
          published_at?: string | null
          site_url?: string | null
          title?: string | null
          url_param?: string | null
          user_id?: string | null
        }
        Update: {
          code_link?: string | null
          created_at?: string
          description?: string | null
          id?: number
          online_ide?: boolean | null
          project_id?: number | null
          project_solution_image_id?: string | null
          published?: boolean | null
          published_at?: string | null
          site_url?: string | null
          title?: string | null
          url_param?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          difficulty: number | null
          id: number
          pro_challenge: boolean | null
          published: boolean | null
          skills: Json | null
          tasks: Json | null
          title: string | null
          url_param: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: number | null
          id?: number
          pro_challenge?: boolean | null
          published?: boolean | null
          skills?: Json | null
          tasks?: Json | null
          title?: string | null
          url_param?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: number | null
          id?: number
          pro_challenge?: boolean | null
          published?: boolean | null
          skills?: Json | null
          tasks?: Json | null
          title?: string | null
          url_param?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          price_id: string | null
          start_date: number | null
          stripe_customer_id: string | null
          stripe_id: string | null
          stripe_status: string | null
          trail_end_date: number | null
          trail_start_date: number | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: number
          price_id?: string | null
          start_date?: number | null
          stripe_customer_id?: string | null
          stripe_id?: string | null
          stripe_status?: string | null
          trail_end_date?: number | null
          trail_start_date?: number | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: number
          price_id?: string | null
          start_date?: number | null
          stripe_customer_id?: string | null
          stripe_id?: string | null
          stripe_status?: string | null
          trail_end_date?: number | null
          trail_start_date?: number | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_challenges_complete: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      fetch_feed: {
        Args: {
          limit_val: number
          offset_val: number
        }
        Returns: {
          type: string
          created_at: string
          published_at: string
          challenge: Json
          project: Json
          username: string
          first_name: string
          last_name: string
          avatar_url: string
          id: string
          is_active_subscriber: boolean
        }[]
      }
      fetch_feed_clone: {
        Args: {
          limit_val?: number
          offset_val?: number
        }
        Returns: {
          type: string
          created_at: string
          published_at: string
          data: Json
          username: string
          first_name: string
          last_name: string
          avatar: string
          id: string
          is_active_subscriber: boolean
        }[]
      }
      generate_random_string: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_all_challenges: {
        Args: {
          limit_param?: number
          range_param?: number
          order_param?: string
        }
        Returns: Json
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_featured_assets: {
        Args: {
          user_id_param: string
          limit_param?: number
          offset_param?: number
        }
        Returns: {
          type: string
          asset_id: string
          title: string
          is_public: boolean
          param: Json
          image_url: string
          created_at: string
        }[]
      }
      get_latest_entries: {
        Args: {
          limit_param: number
          range_param: number
        }
        Returns: {
          entry_id: number
          entry_type: string
          created_at: string
        }[]
      }
      get_likes_count: {
        Args: {
          entity_id_param: string
        }
        Returns: number
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_profile_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_user_challenge_entries: {
        Args: {
          user_uuid: string
        }
        Returns: number
      }
      insert_daily_challenge: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      latest_entries: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          created_at: string
          challenge_id: number
          html: Json
          css: Json
          js: Json
          user_id: string
          challenge_title: string
          challenge_image: string
          challenge_param: string
          is_published: boolean
          published_at: string
          head: Json
          integrations: Json
          updated_at: string
          extensions: Json
        }[]
      }
      leaderboard_streak_cal: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      likes_per_user: {
        Args: {
          limit_value: number
        }
        Returns: {
          user_id: string
          username: string
          first_name: string
          last_name: string
          avatar_url: string
          like_count: number
        }[]
      }
      log_cron_job: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      published_challenges_per_user: {
        Args: {
          limit_value: number
        }
        Returns: {
          user_id: string
          username: string
          first_name: string
          last_name: string
          avatar_url: string
          published_count: number
        }[]
      }
      query_entries: {
        Args: {
          limit_val?: number
          range_val?: number
        }
        Returns: Json[]
      }
      remove_html_from_json: {
        Args: {
          json_data: Json
          snippet_to_remove: string
        }
        Returns: Json
      }
      remove_html_value: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
      set_pro_challenge: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_daily_challenge: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_ispublic: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      view_cron_logs: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          job_name: string
          log_date: string
          log_message: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
