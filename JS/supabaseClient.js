import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = "https://enxpcisjkyebbtotlcoo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueHBjaXNqa3llYmJ0b3RsY29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTg2MzEsImV4cCI6MjA2NTYzNDYzMX0.YJV__zfQGh32C8xI9IAirTTFH0B7X3QWHckWChEdM5Q";
export const supabase = createClient(supabaseUrl, supabaseKey);
// A FAIRE