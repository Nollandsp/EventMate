import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = "https://wsxreghlyujpezrwnpvw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzeHJlZ2hseXVqcGV6cnducHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDkzNjUsImV4cCI6MjA2NTcyNTM2NX0.pBFrXJGfFCkdHx9jOmd5VPer2C7WAtRkaZj8ZRHezNY";
export const supabase = createClient(supabaseUrl, supabaseKey);
