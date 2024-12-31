/**
 * ------------------------------ Patrón Singleton -----------------------------
 * 
 * El patrón singleton permite crear una única instancia de un objeto durante
 * la ejecución de la aplicación en un dispositivo. Es adecuado para evitar usar
 * más memoria de la necesaria y/o más de una conexión con un servicio de backend, 
 * en este caso Supabase. Typescript permite implementar este patrón de diseño
 * de forma sencilla, ver class SupabaseSingleton para los detalles.
 * 
 * -----------------------------------------------------------------------------
 * 
 * Explicación de la Clase SupabaseSingleton:
 * 
 * La clase contiene una propiedad estática privada (instance) que almacenará la
 * única instancia de SupabaseClient.
 * 
 * Método getInstance:
 * 
 * - Verifica si la instancia de Supabase ya existe.
 * - Si no existe, crea una nueva instancia con createClient.
 * - Si ya existe, simplemente la retorna, garantizando que siempre se usa 
 *   la misma instancia.
 * 
 * Exportación del cliente:
 * 
 * Se exporta la instancia única mediante SupabaseSingleton.getInstance() para 
 * usarla en toda la aplicación.
 * 
 * Nota: el uso del cliente de Supabase en otros archivos no se verán alterados
 * ya que se exporta el objeto supabase igual que antes y la comprobación de 
 * singleton se realiza en este archivo.
 * 
 * PD: este patrón también se puede implementar en Javascript ya que es indepen-
 * diente del lenguaje de programación si es compatible con POO. Ejemplos:
 * 
 * - https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-a-singleton-in-javascript
 * 
 * -----------------------------------------------------------------------------
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = `${process.env.EXPO_PUBLIC_SUPABASE_URL}`;
const SUPABASE_KEY = `${process.env.EXPO_PUBLIC_SUPABASE_KEY}`;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Las variables de entorno SUPABASE_URL y SUPABASE_KEY deben estar definidas.');
}

class SupabaseSingleton {
  private static instance: SupabaseClient;

  // Método para obtener la instancia de Supabase
  public static getInstance(): SupabaseClient {
    if (!SupabaseSingleton.instance) {
      SupabaseSingleton.instance = createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    return SupabaseSingleton.instance;
  }
}

// Exporta la instancia única
export const supabase = SupabaseSingleton.getInstance();

// Prueba de conexión
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('tasks').select('*').limit(5);
    if (error) {
      console.error('Error al conectar con Supabase:', error);
    } else {
      console.log('Conexión exitosa. Datos:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }
};

export default supabase;
