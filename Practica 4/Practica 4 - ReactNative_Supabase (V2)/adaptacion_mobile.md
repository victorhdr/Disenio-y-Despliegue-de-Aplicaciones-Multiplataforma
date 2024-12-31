# Adaptación a Componentes Mobile de React Native

Este documento resume los cambios implementados para habilitar el build de móvil 
en el proyecto de React Native con el objetivo de hacer el proyecto multi-platform:

- Web
- Android
- iOS


---

## 1. Migración de componentes a React Native

- Se reemplazaron componentes específicos de `react-dom` o web (`<div>`, `<input>`, `<textarea>`) por sus equivalentes en React Native (`<View>`, `<TextInput>`, `<TouchableOpacity>`, etc.).

- Ejemplo de migración:

  ```tsx
  // Antes
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <input type="text" placeholder="Título" />
  </div>

  // Después
  <View style={{ flexDirection: 'column' }}>
    <TextInput placeholder="Título" />
  </View>
  ```

## 2. Ajuste de estilos

- Se eliminaron los estilos basados en CSS y se utilizaron objetos de estilo compatibles con React Native mediante `StyleSheet`.
- Ejemplo:

  ```tsx
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 5,
    },
  });

  // Ejemplo de uso:

  ```tsx
  <View style=styles.container>
  {/* contenido */}
  </View>
  ```

Tienes una lista de los componentes más usados en [Tabla de Componentes Mobile](./tabla_componentes_mobile.md).

## 3. Uso de componentes nativos

- **`<SectionList>`**:
  Se utilizó para reemplazar elementos de diseño como `ParallaxScrollView` y listas planas (`<ul>`, `<li>`), aprovechando la funcionalidad de secciones.

- **`<FlatList>`**:
  Se implementó para renderizar listas de tareas con soporte nativo para scroll y rendimiento mejorado.

## 4. Ajustes en los estilos dinámicos

- Se añadió lógica para cambiar estilos según el estado de los datos. Por ejemplo:

  - Cambiar el color del fondo si una tarea está completada:
    ```tsx
    backgroundColor: task.completed ? '#4caf50' : '#333';
    ```

## 5. Modificaciones en las funciones de interacción

- **Eliminación de tareas**:
  Se integraron botones (`<TouchableOpacity>`) para manejar eventos de eliminar, reemplazando `<button>`.

- **Marcado como completado**:
  Se añadió un botón para marcar tareas como completadas y actualizar su estado dinámicamente.

  ```tsx
  <TouchableOpacity
    style={[styles.button, task.completed ? styles.completedButton : styles.markButton]}
    onPress={() => markAsCompleted(task.id)}
    disabled={task.completed}
  >
    <Text style={styles.buttonText}>
      {task.completed ? 'Completado' : 'Completar'}
    </Text>
  </TouchableOpacity>
  ```

## 6. Configuración de `supabaseClient`

- Cambio en la exportación del cliente de Supabase para usar un export default, facilitando la importación:

  ```tsx
  // Antes
  export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // Después
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  export default supabase;
  ```

## 7. Ajustes en `tsconfig.json`

- **Temporalmente desactivada** la opción `strict` para solucionar problemas con los tipos en `Text` y otros componentes hasta finalizar la adaptación a mobile colocando todos los campos de texto en `<Text>`.
  
  ```json
  "strict": false
  ```

## 8. Correcciones de funciones asíncronas

- Se ajustaron las funciones asíncronas (`markAsCompleted`, `deleteTask`, `fetchTasks`) para manejar datos con el flujo de React Native y actualizar dinámicamente el estado con `useState`.

## 9. Migración de formularios

- Reemplazo de formularios basados en HTML (`<form>`, `<input>`) por componentes de React Native (`<TextInput>`, `<TouchableOpacity>`).

- Ejemplo:

  ```tsx
  <TextInput
    style={styles.input}
    placeholder="Título"
    placeholderTextColor="#ccc"
    value={title}
    onChangeText={setTitle}
  />
  ```

## 10. Diseño responsive

- Ajuste de contenedores para un diseño adaptable a pantallas móviles:
  - Uso de propiedades `flex`, `padding`, y `margin` para distribuir contenido correctamente.

## 11. Actualización de bibliotecas
- Revisar que las dependencias del proyecto (como `supabase-js` y React Native) estuvieran actualizadas para evitar problemas de compatibilidad.

## 12. Manejadores de eventos

- Se eliminaron eventos específicos de web (`onMouseOver`, `onMouseOut`) y se reemplazaron por lógica de React Native con `TouchableOpacity`.

## 13. Verificación de variables de entorno

- Ajuste de las claves de Supabase para soportar builds móviles, utilizando claves públicas en un entorno seguro.

Estos cambios habilitan el soporte para móvil manteniendo el proyecto compatible con React Native. Ahora es posible hacer el build de mobile con:

```bash
npm run android
npm run ios
```

O `npm run start` > `a` | `i`.