import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskFormProps {
  task?: Task; // Ahora es opcional
  onSave: (task: Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task?.title || ''); // Valor inicial desde la tarea existente
  const [description, setDescription] = useState(task?.description || ''); // Valor inicial desde la tarea existente

  const handleSubmit = () => {
    // Construye el objeto updatedTask combinando la tarea existente con los valores actuales
    const updatedTask = { ...task, title, description };
    console.log('form:', updatedTask);
    onSave(updatedTask); // Llama a onSave pasando el objeto actualizado
  };

  return (
    <View style={styles.container}>
      {/* Cambia el título dinámicamente según si es creación o edición */}
      <Text style={styles.title}>{task ? 'Editar Tarea' : 'Crear Tarea'}</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle} // Actualiza el estado local
        placeholder="Título"
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        value={description}
        onChangeText={setDescription} // Actualiza el estado local
        placeholder="Descripción"
        placeholderTextColor="#ccc"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      {onCancel && (
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212', // Fondo oscuro para distinguir el modo de edición
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    color: 'white',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#d9534f', // Color rojo para el botón de cancelar
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskForm;
