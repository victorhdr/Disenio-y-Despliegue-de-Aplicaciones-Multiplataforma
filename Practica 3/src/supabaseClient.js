// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Accede a las variables de entorno desde process.env
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// Crea el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Exporta supabase de manera predeterminada
export default supabase;