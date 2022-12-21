import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseAPIKey = import.meta.env.VITE_SUPABASE_APIKEY

export const supabase = createClient(supabaseURL, supabaseAPIKey);



