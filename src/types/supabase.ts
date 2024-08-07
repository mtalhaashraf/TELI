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
      assistants: {
        Row: {
          assistant_id: string | null
          asst_name: string | null
          created_at: string
          first_message: string | null
          id: number
          system_prompt: string | null
        }
        Insert: {
          assistant_id?: string | null
          asst_name?: string | null
          created_at?: string
          first_message?: string | null
          id?: number
          system_prompt?: string | null
        }
        Update: {
          assistant_id?: string | null
          asst_name?: string | null
          created_at?: string
          first_message?: string | null
          id?: number
          system_prompt?: string | null
        }
        Relationships: []
      }
      call_logs: {
        Row: {
          call_date: string | null
          call_ID: number | null
          created_at: string
          duration: number | null
          end_reason: string | null
          id: number
          log_dump: string | null
          metadata: string | null
          phone: string | null
          summary: string | null
          total_cost: number | null
          transcript: string | null
        }
        Insert: {
          call_date?: string | null
          call_ID?: number | null
          created_at?: string
          duration?: number | null
          end_reason?: string | null
          id?: number
          log_dump?: string | null
          metadata?: string | null
          phone?: string | null
          summary?: string | null
          total_cost?: number | null
          transcript?: string | null
        }
        Update: {
          call_date?: string | null
          call_ID?: number | null
          created_at?: string
          duration?: number | null
          end_reason?: string | null
          id?: number
          log_dump?: string | null
          metadata?: string | null
          phone?: string | null
          summary?: string | null
          total_cost?: number | null
          transcript?: string | null
        }
        Relationships: []
      }
      call_status: {
        Row: {
          accuracy: string | null
          appt_date: string | null
          birthdate: string | null
          call_log_id: number | null
          campaignID: number | null
          credit_score: number | null
          date_reached: string | null
          id: number
          last_call_date: string | null
          mortgage_bal: number | null
          next_call_date: string | null
          phoneno: string | null
          SS: string | null
          status: string | null
          total_calls: number | null
        }
        Insert: {
          accuracy?: string | null
          appt_date?: string | null
          birthdate?: string | null
          call_log_id?: number | null
          campaignID?: number | null
          credit_score?: number | null
          date_reached?: string | null
          id?: number
          last_call_date?: string | null
          mortgage_bal?: number | null
          next_call_date?: string | null
          phoneno?: string | null
          SS?: string | null
          status?: string | null
          total_calls?: number | null
        }
        Update: {
          accuracy?: string | null
          appt_date?: string | null
          birthdate?: string | null
          call_log_id?: number | null
          campaignID?: number | null
          credit_score?: number | null
          date_reached?: string | null
          id?: number
          last_call_date?: string | null
          mortgage_bal?: number | null
          next_call_date?: string | null
          phoneno?: string | null
          SS?: string | null
          status?: string | null
          total_calls?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "call_logs_status_call_logs_id_fkey"
            columns: ["call_log_id"]
            isOneToOne: false
            referencedRelation: "call_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_details: {
        Row: {
          active: boolean | null
          assistant_id: number | null
          backchanneling: boolean | null
          campaignid: number
          clarity: number | null
          description: string | null
          id: number
          name: string | null
          phoneline_id: number | null
          provider: string | null
          stability: number | null
        }
        Insert: {
          active?: boolean | null
          assistant_id?: number | null
          backchanneling?: boolean | null
          campaignid: number
          clarity?: number | null
          description?: string | null
          id?: number
          name?: string | null
          phoneline_id?: number | null
          provider?: string | null
          stability?: number | null
        }
        Update: {
          active?: boolean | null
          assistant_id?: number | null
          backchanneling?: boolean | null
          campaignid?: number
          clarity?: number | null
          description?: string | null
          id?: number
          name?: string | null
          phoneline_id?: number | null
          provider?: string | null
          stability?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assistants_phoneline_id_fkey"
            columns: ["phoneline_id"]
            isOneToOne: false
            referencedRelation: "phonelines"
            referencedColumns: ["phonelineid"]
          },
          {
            foreignKeyName: "campaignlines_campaignid_fkey"
            columns: ["campaignid"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["campaignid"]
          },
          {
            foreignKeyName: "compaign_details_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_status: {
        Row: {
          campaign_id: number | null
          created_at: string
          id: number
          row_number: number | null
          status: string | null
          total_records: number | null
        }
        Insert: {
          campaign_id?: number | null
          created_at?: string
          id?: number
          row_number?: number | null
          status?: string | null
          total_records?: number | null
        }
        Update: {
          campaign_id?: number | null
          created_at?: string
          id?: number
          row_number?: number | null
          status?: string | null
          total_records?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stop_compaigns_compaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["campaignid"]
          },
        ]
      }
      campaigns: {
        Row: {
          assistant: string | null
          assistID: string | null
          campaignid: number
          campaignname: string
          client_id: number | null
          createdate: string | null
          description: string | null
          desiredoutcome: string | null
          enddate: string | null
          last_start_date: string | null
          max_calls: number | null
          prompt: string | null
          script: string | null
          startdate: string
          status: number | null
          status_date: string | null
        }
        Insert: {
          assistant?: string | null
          assistID?: string | null
          campaignid?: number
          campaignname: string
          client_id?: number | null
          createdate?: string | null
          description?: string | null
          desiredoutcome?: string | null
          enddate?: string | null
          last_start_date?: string | null
          max_calls?: number | null
          prompt?: string | null
          script?: string | null
          startdate?: string
          status?: number | null
          status_date?: string | null
        }
        Update: {
          assistant?: string | null
          assistID?: string | null
          campaignid?: number
          campaignname?: string
          client_id?: number | null
          createdate?: string | null
          description?: string | null
          desiredoutcome?: string | null
          enddate?: string | null
          last_start_date?: string | null
          max_calls?: number | null
          prompt?: string | null
          script?: string | null
          startdate?: string
          status?: number | null
          status_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_lines: {
        Row: {
          assistantid: number | null
          clientid: string | null
          id: number
          phonelineid: number | null
        }
        Insert: {
          assistantid?: number | null
          clientid?: string | null
          id?: number
          phonelineid?: number | null
        }
        Update: {
          assistantid?: number | null
          clientid?: string | null
          id?: number
          phonelineid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "client_lines_assistantid_fkey"
            columns: ["assistantid"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_phone_lines_phonelineid_fkey"
            columns: ["phonelineid"]
            isOneToOne: false
            referencedRelation: "phonelines"
            referencedColumns: ["phonelineid"]
          },
        ]
      }
      clients: {
        Row: {
          apptsperslot: number | null
          avatar_url: string | null
          cell: string | null
          company_name: string | null
          email: string | null
          endtime: string | null
          full_name: string | null
          id: number
          ignore_days: string | null
          interval: number | null
          lineIDs: string | null
          max_calls_prospect: number | null
          phone: string | null
          starttime: string | null
          status: string | null
          stripeID: string | null
          updated_at: string | null
          VAPIorgID: string | null
          website: string | null
        }
        Insert: {
          apptsperslot?: number | null
          avatar_url?: string | null
          cell?: string | null
          company_name?: string | null
          email?: string | null
          endtime?: string | null
          full_name?: string | null
          id?: number
          ignore_days?: string | null
          interval?: number | null
          lineIDs?: string | null
          max_calls_prospect?: number | null
          phone?: string | null
          starttime?: string | null
          status?: string | null
          stripeID?: string | null
          updated_at?: string | null
          VAPIorgID?: string | null
          website?: string | null
        }
        Update: {
          apptsperslot?: number | null
          avatar_url?: string | null
          cell?: string | null
          company_name?: string | null
          email?: string | null
          endtime?: string | null
          full_name?: string | null
          id?: number
          ignore_days?: string | null
          interval?: number | null
          lineIDs?: string | null
          max_calls_prospect?: number | null
          phone?: string | null
          starttime?: string | null
          status?: string | null
          stripeID?: string | null
          updated_at?: string | null
          VAPIorgID?: string | null
          website?: string | null
        }
        Relationships: []
      }
      contact_requests: {
        Row: {
          cell: string | null
          company_name: string | null
          email: string | null
          email2: string | null
          first_name: string | null
          id: string
          last_name: string | null
          message_body: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          cell?: string | null
          company_name?: string | null
          email?: string | null
          email2?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          message_body?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          cell?: string | null
          company_name?: string | null
          email?: string | null
          email2?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          message_body?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      DNC_dates: {
        Row: {
          dateid: string
        }
        Insert: {
          dateid: string
        }
        Update: {
          dateid?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      phonelines: {
        Row: {
          clientid: number | null
          linenumber: string
          phonelineid: number
          phoneNumberID: string | null
          provider: string | null
        }
        Insert: {
          clientid?: number | null
          linenumber: string
          phonelineid?: number
          phoneNumberID?: string | null
          provider?: string | null
        }
        Update: {
          clientid?: number | null
          linenumber?: string
          phonelineid?: number
          phoneNumberID?: string | null
          provider?: string | null
        }
        Relationships: []
      }
      stop_campaign: {
        Row: {
          campaign_id: number
        }
        Insert: {
          campaign_id?: number
        }
        Update: {
          campaign_id?: number
        }
        Relationships: []
      }
      stripe_customers: {
        Row: {
          stripe_customer_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      timezones: {
        Row: {
          state: string
          zone: string
        }
        Insert: {
          state: string
          zone: string
        }
        Update: {
          state?: string
          zone?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          cell: string | null
          client_id: number | null
          company_email: string | null
          email2: string | null
          full_name: string | null
          id: string
          phone: string | null
          rights: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          cell?: string | null
          client_id?: number | null
          company_email?: string | null
          email2?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          rights?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          cell?: string | null
          client_id?: number | null
          company_email?: string | null
          email2?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          rights?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_duplicate_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_duplicate_id_fkey1"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
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
