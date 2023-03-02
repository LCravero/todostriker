// Client side Supabase client
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

// Single instance of Supabase browser client
const supabaseBrowserClient = createBrowserSupabaseClient()

export default supabaseBrowserClient
