import { useState } from 'react';

import { StyleSheet, SectionList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import TaskList from '@/features/tasks/components/TaskList';
import TaskForm from '@/features/tasks/components/TaskForm';

import supabase from '@/core/supabase/client';

// Define el tipo de las tareas
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// interface TaskListProps {
//   reload: boolean; // Asegúrate de que `reload` esté definido
// }

export default function HomeScreen() {
  const [reload, setReload] = useState(false); // Estado que controla cuándo recargar
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Estado para manejar la edición

  const saveOrUpdateTask = async (task: Task) => {
    
    // Lee el UUID de prueba desde .env:
    const userId = `${process.env.EXPO_PUBLIC_ID_PRUEBAS}`;
  
    try {
      let data;
      let error;
  
      if (task.id) {
        console.log("update");
        // Si existe un ID, actualiza la tarea
        ({ data, error } = await supabase
          .from('tasks')
          .update({
            title: task.title,
            description: task.description,
            completed: task.completed,
            user_id: userId, // Incluye el user_id de prueba
          })
          .eq('id', task.id)
          .select());
      } else {
        console.log("insert");
        // Si no hay ID, crea una nueva tarea
        ({ data, error } = await supabase
          .from('tasks')
          .insert([
            {
              title: task.title,
              description: task.description,
              // completed: false, // Por defecto no está completada
              user_id: userId, // Incluye el user_id de prueba
            },
          ])
          .select());
      }
  
      if (error) {
        console.error('Error al guardar la tarea:', error);
        return;
      }
  
      if (data && data.length > 0) {
        console.log('Tarea guardada:', data[0]);
        // Actualiza el estado local
        setTasks((prevTasks) =>
          task.id
            ? prevTasks.map((t) => (t.id === task.id ? { ...t, ...data[0] } : t)) // Actualización
            : [...prevTasks, data[0]] // Inserción
        );
        setEditingTask(null); // Salir del modo de edición
      }
    } catch (err) {
      console.error('Error inesperado al guardar la tarea:', err);
    }
  };
  
  const handleSave = () => {
    setReload((prev) => !prev); // Cambia el estado para forzar la recarga
  };

  const sections = [
    {
      title: 'Bienvenid@ a Tasks-App!',
      data: [{}], // Encabezado y saludo
      renderItem: () => (
        <ThemedView style={styles.header}></ThemedView>
      ),
    },
    {
      title: 'Tareas',
      data: [{}], // Aquí puedes incluir la lista de tareas real si lo deseas
      renderItem: () => <TaskList reload={reload} />,
    },
    {
      title: 'Formulario',
      data: [{}],
      renderItem: () => <TaskForm
      onSave={(task) => {
        saveOrUpdateTask(task); // Llama a saveTask para interactuar con Supabase
        console.log('Tarea guardada:', task);
        setReload((prev) => !prev); // Recarga las tareas
      }}
      onCancel={() => console.log('Edición cancelada')}
    />,
    },
  ];

  return (
    <SectionList
      style={styles.mainContainer}
      sections={sections}
      keyExtractor={(item, index) => `section-${index}`}
      renderSectionHeader={({ section: { title } }) => (
        <ThemedText style={styles.sectionHeader}>{title}</ThemedText>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#505050',
    color: '#d0d0d0',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#505050',
    color: '#d0d0d0',
  },
  sectionHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 0,
    marginTop:75,
    color: '#d0d0d0',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 0,
    color: '#d0d0d0',
  },
  reactLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 20,
    color: '#d0d0d0',
  },
});
