import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseURL = "https://oeyuuyjjgdpmstwwahht.supabase.co"
const supabaseAPIKey = import.meta.env.VITE_SUPABASE_APIKEY

export const supabase = createClient(supabaseURL, supabaseAPIKey);



