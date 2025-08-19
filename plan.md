# Backend Development Plan

## 1. Authentication (with Supabase)

*   **Supabase Project Setup:**
    *   Create a new project on Supabase.
    *   Enable and configure Supabase Auth.
*   **User Registration:**
    *   Use the Supabase client library (`supabase.auth.signUp()`) for new user sign-up. Supabase handles password hashing and secure user storage automatically.
*   **User Login:**
    *   Use the Supabase client library (`supabase.auth.signInWithPassword()`) for user sign-in.
    *   Supabase manages JWTs and sessions automatically.
*   **Protected Routes:**
    *   Implement middleware on your backend to verify the JWT sent from the client. The token can be retrieved from the user's session.
*   **User Logout:**
    *   Use the Supabase client library (`supabase.auth.signOut()`) to handle user logout.

## 2. Storage (with Supabase)

*   **Database Setup:**
    *   Utilize Supabase's integrated PostgreSQL database.
    *   Design the database schema using the Supabase table editor. We'll need tables to store metadata about the files.
*   **File Storage Service:**
    *   Use Supabase Storage.
    *   Set up storage buckets (e.g., for user avatars, documents).
    *   Define Row Level Security (RLS) policies to control access to buckets and files.
*   **File Upload & Access:**
    *   Use the Supabase client library to handle file uploads, downloads, and to generate signed URLs for private files.
