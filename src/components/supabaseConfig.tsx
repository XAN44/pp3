import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xukkjtubgncgvaklfufc.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1a2tqdHViZ25jZ3Zha2xmdWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1ODY1NTEsImV4cCI6MjAxOTE2MjU1MX0.tyCUyEnSFFHbm1EQ9h8x1M0m03NX6cCZIUQSjXTKAOY'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
