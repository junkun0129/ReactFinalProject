import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseURL = process.env.VITE_SUPABASE_URL
const supabaseAPIKey = process.env.VITE_SUPABASE_APIKEY

export const supabase = createClient(supabaseURL, supabaseAPIKey);



