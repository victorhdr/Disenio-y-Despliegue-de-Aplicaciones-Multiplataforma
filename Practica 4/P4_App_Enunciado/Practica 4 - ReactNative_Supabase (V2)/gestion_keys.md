# Gestión de Keys

**Objetivo:** acceder a claves privadas (API keys, secrets, etc.) para el proyecto 
sin exponerlas a repositorios o a usuarios que no deban tener acceso.

Hay algunas alternativas para gestionar las variables de entorno en React Native:

- [react-native-config](https://www.npmjs.com/package/react-native-config)
- [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv)
- [process.env](https://docs.expo.dev/guides/environment-variables/#how-variables-are-loaded)

Crea un archivo `.env.local` en la raíz del proyecto con las variables que quieres
proteger:

```env
SUPABASE_URL=<valor_de url_aquí>
SUPABASE_KEY=<valor_de_key_aquí>
```

**Nota:** nota la ausencia de `'` o `"` y los valores no contienen `<` o `>`.

Ahora podrás acceder a estas variables usando `process.env.<NOMBRE_DE_VARIABLE>`

```javascript
const SUPABASE_URL = `${process.env.EXPO_PUBLIC_SUPABASE_URL}`;
const SUPABASE_KEY = `${process.env.EXPO_PUBLIC_SUPABASE_KEY}`;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Las variables de entorno SUPABASE_URL y SUPABASE_KEY deben estar definidas.');
}
```

Leemos las variables de entorno y colocamos un error en caso de que no se lean 
correctamente.

**Nota:** en el bundle creado en el build se incluyen las variables. En móvil no 
suele ser un problema ya que no es sencillo acceder a esos datos. En web, sin embargo, 
usando las herramientas de desarrollo (Inspeccionar o F12) se puede ver el código
del bundle y, por lo tanto, acceder a estas variables.

Por eso, en general es una mala práctica, en el caso de Supabase hay que usar la clave
pública anónima y tener RLS activado siempre para mayor seguridad:
![anon pub key](image-14.png)

Para ocultar variables de este estilo, se debe usar un servicio de backend.