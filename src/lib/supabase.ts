import { createClient } from '@supabase/supabase-js';

// HARDCODED pour fix - BLOG-LPR
const supabaseUrl = 'https://mjuzyqhxifyvebtnlrra.supabase.co';
const supabaseAnonKey = 'sb_publishable_qrzC7_zQwhskV7u04n7F5Q_CThWZ2qc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
