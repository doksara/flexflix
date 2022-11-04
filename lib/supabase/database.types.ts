export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_tvshow: {
        Row: {
          id: number
          has_liked: boolean | null
          has_started_watching: boolean | null
          watched_episodes: string[]
          user: string | null
          show_id: number | null
        }
        Insert: {
          id?: number
          has_liked?: boolean | null
          has_started_watching?: boolean | null
          watched_episodes: string[]
          user?: string | null
          show_id?: number | null
        }
        Update: {
          id?: number
          has_liked?: boolean | null
          has_started_watching?: boolean | null
          watched_episodes?: string[]
          user?: string | null
          show_id?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
