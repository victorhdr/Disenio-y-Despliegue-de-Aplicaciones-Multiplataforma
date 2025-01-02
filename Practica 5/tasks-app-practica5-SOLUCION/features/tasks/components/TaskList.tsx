import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import supabase from '@/core/supabase/client';
import TaskForm from './TaskForm';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  reload: boolean; // Asegúrate de que `reload` esté definido
}

const TaskList: React.FC<TaskListProps> = ({ reload }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Estado para manejar la edición

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: false });
    if (!error && data) setTasks(data as Task[]);

    console.log(data)
  };

  const toggleTaskCompletion = async (taskId: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !currentStatus })
      .eq('id', taskId);

    if (!error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !currentStatus } : task
        )
      );
    } else {
      console.error('Error al cambiar el estado de completado:', error);
    }
  };

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

  const deleteTask = async (taskId: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (!error) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } else {
      console.error('Error al borrar la tarea:', error);
    }
  };

  // Actualizar la lista de tareas al cargar componente:
  useEffect(() => {
    fetchTasks();
  }, []);

  // Actualización de tareas condicional con flag reload:
  useEffect(() => {
    if (reload) {
      fetchTasks(); // Recarga las tareas cuando cambia `reload`
    }
  }, [reload]);

  return (
    <View>
      {editingTask ? (
        <TaskForm
          task={editingTask}
          onSave={(updatedTask) => {
            saveOrUpdateTask(updatedTask);
          }}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>
                {item.title} - {item.description}
              </Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    item.completed ? styles.completedButton : styles.uncompletedButton,
                  ]}
                  onPress={() => toggleTaskCompletion(item.id, item.completed)}
                >
                  <Text style={styles.buttonText}>
                    {item.completed ? '❌ Desmarcar Completado' : '✅ Marcar Completado'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditingTask(item)} // Selecciona la tarea para editar
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTask(item.id)}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#444',
    borderWidth: 1,
  },
  taskText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  completedButton: {
    backgroundColor: 'green',
  },
  uncompletedButton: {
    backgroundColor: 'gray',
  },
  editButton: {
    backgroundColor: '#f59e0b',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default TaskList;
