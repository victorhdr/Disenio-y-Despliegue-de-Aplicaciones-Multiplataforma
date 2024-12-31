# Equivalencias entre HTML/JSX para Web y React Native

Este documento tiene una tabla con las equivalencias de los principales elementos y componentes de HTML/JSX utilizados en la web y sus contrapartidas en React Native.

| **HTML/JSX para Web**          | **Componente React Native**                | **Notas**                                                                                       |
|--------------------------------|--------------------------------------------|-------------------------------------------------------------------------------------------------|
| `<div>`                        | `<View>`                                   | Contenedor básico en React Native, similar a `<div>`.                                           |
| `<span>`                       | `<Text>`                                   | Para mostrar texto en React Native, se usa `<Text>` en lugar de `<span>`.                      |
| `<p>`                          | `<Text>`                                   | No hay un componente específico para párrafos; se usa `<Text>` con estilos personalizados.     |
| `<h1>`, `<h2>`, ..., `<h6>`    | `<Text>`                                   | Se usa `<Text>` con estilos (`fontSize`) para emular los encabezados.                          |
| `<ul>` / `<ol>`                | `<FlatList>` o `<SectionList>`             | Listas optimizadas para scroll en React Native.                                                |
| `<li>`                         | Parte de los datos de `<FlatList>`         | Los elementos de lista se renderizan como componentes individuales dentro de una lista.        |
| `<img>`                        | `<Image>`                                  | Usado para renderizar imágenes en React Native.                                                |
| `<input type="text">`          | `<TextInput>`                              | Usado para capturar texto en React Native.                                                     |
| `<textarea>`                   | `<TextInput multiline={true}>`             | Agrega la propiedad `multiline` para habilitar entradas de varias líneas.                      |
| `<button>`                     | `<TouchableOpacity>` o `<Pressable>`       | Contenedor presionable para acciones. También puedes usar `<Button>`, aunque tiene menos flexibilidad. |
| `<form>`                       | `<View>`                                   | No existe un componente `form`. Se usan `<View>` y eventos para manejar formularios.           |
| `<label>`                      | `<Text>`                                   | No hay una relación directa como en HTML, pero se puede usar un `<Text>` al lado de un `<TextInput>`. |
| `<a>`                          | `<Text onPress={}>`                        | No hay un componente de enlace directo, pero puedes usar `<Text>` con eventos `onPress`.       |
| `<table>`                      | No equivalente directo                     | Usa componentes personalizados como `<FlatList>` o `<SectionList>` para emular tablas.         |
| `<thead>`, `<tbody>`, `<tr>`   | No equivalente directo                     | Diseña filas o cabeceras usando `<View>` y `<Text>`.                                           |
| `<td>`, `<th>`                 | `<Text>`                                   | Usa `<Text>` dentro de un `<View>` para simular celdas de tabla.                               |
| `<select>`                     | `<Picker>`                                 | Usado para crear menús desplegables (parte de React Native).                                   |
| `<option>`                     | Parte de `<Picker>`                        | Define elementos dentro de un menú desplegable.                                                |
| `<fieldset>`                   | `<View>`                                   | Contenedor básico sin un equivalente directo en React Native.                                  |
| `<iframe>`                     | No equivalente directo                     | Usa componentes de terceros como `react-native-webview` para emular `<iframe>`.                |
| `<video>`                      | No equivalente directo                     | Usa bibliotecas como `react-native-video` para manejar videos.                                 |
| `<audio>`                      | No equivalente directo                     | Usa bibliotecas como `react-native-sound` o `expo-av`.                                         |
| `<canvas>`                     | No equivalente directo                     | Usa bibliotecas como `react-native-svg` o `react-native-canvas`.                               |

---

## Notas importantes:

1. **Estilos**:
   - En React Native, los estilos se definen como objetos de JavaScript usando `StyleSheet`. No puedes usar clases de CSS directamente.

2. **Eventos**:
   - Los eventos como `onClick` en HTML son reemplazados por `onPress` en React Native.
   - Otros eventos como `onMouseOver`, `onMouseOut` no están disponibles; se usan alternativas específicas para móvil.

3. **Layouts**:
   - React Native no usa el modelo de diseño basado en `CSS` de la web. En su lugar, se usa **Flexbox** para el diseño y posicionamiento.

4. **Listas**:
   - Para listas largas y con scroll, React Native recomienda usar componentes optimizados como `<FlatList>` o `<SectionList>` en lugar de mapear manualmente elementos dentro de un `<View>`.

---

## Ejemplo de conversión:

### HTML (Web)

```html
<div class="container">
  <h1>Bienvenido</h1>
  <p>Esto es una prueba.</p>
  <button onclick="alert('Hola')">Haz clic aquí</button>
</div>
```

## React Native

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido</Text>
      <Text style={styles.paragraph}>Esto es una prueba.</Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('Hola')}>
        <Text style={styles.buttonText}>Haz clic aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
```