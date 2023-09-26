import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kucwkedmqypaqcmuvxti.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1Y3drZWRtcXlwYXFjbXV2eHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwNTAyNTEsImV4cCI6MjAwODYyNjI1MX0.XYuc0De_VK3K6A8WkEljdkpxsyJ7v_JFKTYX0ZZFhok';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
