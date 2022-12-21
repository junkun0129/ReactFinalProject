import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseURL = "https://oeyuuyjjgdpmstwwahht.supabase.co"
const supabaseAPIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9leXV1eWpqZ2RwbXN0d3dhaGh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA0NDg4MTIsImV4cCI6MTk4NjAyNDgxMn0.DmJqaRXgbcPpweek7n20RI5vgtoopUt-Z03rRPV0poU"

export const supabase = createClient(supabaseURL, supabaseAPIKey);



