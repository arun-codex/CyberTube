export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          avatar_url: string | null;
          avatar_path: string | null;
          bio: string | null;
          experience_level: 'beginner' | 'intermediate' | 'advanced' | 'professional' | null;
          preferred_language: string;
          country_code: string | null;
          primary_learning_goal: string | null;
          interests: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          avatar_path?: string | null;
          bio?: string | null;
          experience_level?: 'beginner' | 'intermediate' | 'advanced' | 'professional' | null;
          preferred_language?: string;
          country_code?: string | null;
          primary_learning_goal?: string | null;
          interests?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          avatar_path?: string | null;
          bio?: string | null;
          experience_level?: 'beginner' | 'intermediate' | 'advanced' | 'professional' | null;
          preferred_language?: string;
          country_code?: string | null;
          primary_learning_goal?: string | null;
          interests?: string[];
          updated_at?: string;
        };
      };
      domains: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          icon?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          resource_type: string;
          provider: string;
          creator: string | null;
          canonical_url: string;
          thumbnail_url: string | null;
          difficulty: string;
          language: string;
          pricing_model: string;
          estimated_duration_minutes: number | null;
          estimated_duration_label: string | null;
          prerequisites: string[];
          skills: string[];
          learning_outcomes: string[];
          featured: boolean;
          publication_status: 'draft' | 'published' | 'archived';
          last_verified_at: string;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id: string;
          slug: string;
          title: string;
          description: string;
          resource_type: string;
          provider: string;
          creator?: string | null;
          canonical_url: string;
          thumbnail_url?: string | null;
          difficulty: string;
          language?: string;
          pricing_model: string;
          estimated_duration_minutes?: number | null;
          estimated_duration_label?: string | null;
          prerequisites?: string[];
          skills?: string[];
          learning_outcomes?: string[];
          featured?: boolean;
          publication_status?: 'draft' | 'published' | 'archived';
          last_verified_at?: string;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          resource_type?: string;
          provider?: string;
          creator?: string | null;
          canonical_url?: string;
          thumbnail_url?: string | null;
          difficulty?: string;
          language?: string;
          pricing_model?: string;
          estimated_duration_minutes?: number | null;
          estimated_duration_label?: string | null;
          prerequisites?: string[];
          skills?: string[];
          learning_outcomes?: string[];
          featured?: boolean;
          publication_status?: 'draft' | 'published' | 'archived';
          last_verified_at?: string;
          updated_at?: string;
        };
      };
      resource_domains: {
        Row: {
          resource_id: string;
          domain_id: string;
        };
        Insert: {
          resource_id: string;
          domain_id: string;
        };
        Update: {
          resource_id?: string;
          domain_id?: string;
        };
      };
      resource_tags: {
        Row: {
          resource_id: string;
          tag_id: string;
        };
        Insert: {
          resource_id: string;
          tag_id: string;
        };
        Update: {
          resource_id?: string;
          tag_id?: string;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
        };
      };
      collections: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          updated_at?: string;
        };
      };
      collection_resources: {
        Row: {
          collection_id: string;
          resource_id: string;
          created_at: string;
        };
        Insert: {
          collection_id: string;
          resource_id: string;
          created_at?: string;
        };
        Update: {
          collection_id?: string;
          resource_id?: string;
        };
      };
      resource_submissions: {
        Row: {
          id: string;
          submitted_by: string | null;
          title: string;
          canonical_url: string;
          description: string;
          resource_type: string;
          suggested_domain: string | null;
          review_status: 'pending' | 'approved' | 'rejected';
          moderator_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          submitted_by?: string | null;
          title: string;
          canonical_url: string;
          description: string;
          resource_type: string;
          suggested_domain?: string | null;
          review_status?: 'pending' | 'approved' | 'rejected';
          moderator_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          submitted_by?: string | null;
          title?: string;
          canonical_url?: string;
          description?: string;
          resource_type?: string;
          suggested_domain?: string | null;
          review_status?: 'pending' | 'approved' | 'rejected';
          moderator_notes?: string | null;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string;
          description: string;
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          status: 'draft' | 'published' | 'archived';
          estimated_duration: string;
          total_duration_minutes: number;
          thumbnail_url: string | null;
          instructor_name: string;
          instructor_title: string | null;
          instructor_org: string | null;
          prerequisites: string[];
          learning_objectives: string[];
          domains: string[];
          tags: string[];
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description: string;
          description: string;
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          status?: 'draft' | 'published' | 'archived';
          estimated_duration: string;
          total_duration_minutes?: number;
          thumbnail_url?: string | null;
          instructor_name: string;
          instructor_title?: string | null;
          instructor_org?: string | null;
          prerequisites?: string[];
          learning_objectives?: string[];
          domains?: string[];
          tags?: string[];
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          short_description?: string;
          description?: string;
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          status?: 'draft' | 'published' | 'archived';
          estimated_duration?: string;
          total_duration_minutes?: number;
          thumbnail_url?: string | null;
          instructor_name?: string;
          instructor_title?: string | null;
          instructor_org?: string | null;
          prerequisites?: string[];
          learning_objectives?: string[];
          domains?: string[];
          tags?: string[];
          featured?: boolean;
          updated_at?: string;
        };
      };
      course_modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          description?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          description?: string | null;
          order_index?: number;
        };
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          course_id: string;
          slug: string;
          title: string;
          description: string;
          youtube_video_id: string;
          duration_minutes: number;
          order_index: number;
          objectives: string[];
          tags: string[];
          skills_taught: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          course_id: string;
          slug: string;
          title: string;
          description: string;
          youtube_video_id: string;
          duration_minutes?: number;
          order_index?: number;
          objectives?: string[];
          tags?: string[];
          skills_taught?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          course_id?: string;
          slug?: string;
          title?: string;
          description?: string;
          youtube_video_id?: string;
          duration_minutes?: number;
          order_index?: number;
          objectives?: string[];
          tags?: string[];
          skills_taught?: string[];
        };
      };
      user_lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          lesson_id: string;
          is_completed: boolean;
          completed_at: string | null;
          last_accessed_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          lesson_id: string;
          is_completed?: boolean;
          completed_at?: string | null;
          last_accessed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          lesson_id?: string;
          is_completed?: boolean;
          completed_at?: string | null;
          last_accessed_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

