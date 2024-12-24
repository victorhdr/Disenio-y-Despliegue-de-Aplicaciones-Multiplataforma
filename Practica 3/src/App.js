import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase utilizando variables de entorno
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL, // URL de Supabase desde .env
  process.env.REACT_APP_SUPABASE_KEY  // Key de Supabase desde .env
);

function App() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);  // Para saber qué post estamos editando
  const [editingPostTitle, setEditingPostTitle] = useState('');
  const [editingPostBody, setEditingPostBody] = useState('');

  // Función para obtener los posts desde la base de datos
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, body');

    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      setPosts(data);
    }
  };

  // Función para agregar un nuevo post a la base de datos
  const handleAddPost = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { title: newPostTitle, body: newPostBody }
      ]);

    if (error) {
      console.error('Error adding post:', error.message);
    } else {
      fetchPosts();
      setNewPostTitle('');
      setNewPostBody('');
    }
  };

  // Función para editar un post
  const handleEditPost = async (e) => {
    e.preventDefault();

    console.log("Editing Post:", editingPostId, editingPostTitle, editingPostBody);  // Verificar valores

    const { data, error } = await supabase
      .from('posts')
      .update({ title: editingPostTitle, body: editingPostBody })
      .eq('id', editingPostId);

    if (error) {
      console.error('Error editing post:', error.message);
    } else {
      fetchPosts();
      setEditingPostId(null);
      setEditingPostTitle('');
      setEditingPostBody('');
    }
  };

  // Función para eliminar un post
  const handleDeletePost = async (id) => {
    console.log("Deleting Post ID:", id);  // Verificar ID del post

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      fetchPosts();  // Recargar la lista de posts
    }
  };

  // Cargar los posts cuando el componente se monta
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>My Blog</h1>

      <form onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>

      {editingPostId && (
        <div>
          <h2>Edit Post</h2>
          <form onSubmit={handleEditPost}>
            <input
              type="text"
              placeholder="Edit Title"
              value={editingPostTitle}
              onChange={(e) => setEditingPostTitle(e.target.value)}
            />
            <textarea
              placeholder="Edit Body"
              value={editingPostBody}
              onChange={(e) => setEditingPostBody(e.target.value)}
            />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}

      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => { 
              setEditingPostId(post.id); 
              setEditingPostTitle(post.title); 
              setEditingPostBody(post.body); 
            }}>Edit</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
