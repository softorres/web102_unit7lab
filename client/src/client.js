//file name: client.js
//supabase client to connect it to react to supabase
import { createClient } from '@supabase/supabase-js'

const URL = 'https://skbyosfnxcimvclcsizv.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYnlvc2ZueGNpbXZjbGNzaXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMDQ0MTUsImV4cCI6MjAyOTU4MDQxNX0.z5BEP6GEdj6nCokgtFPs--QzSqP71ncJMNasQYD-Mss';

// const supabase = createClient(URL, API_KEY);
// export default supabase ;

export const supabase = createClient(URL, API_KEY);
