import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    author: '',
    description: '',
  });

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) console.log('Error fetching post:', error);
    else setPost(data);
  };

  const updatePost = async (event: React.FormEvent) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .update({ title: post.title, author: post.author, description: post.description })
      .eq('id', id);

    navigate('/');
  };

  const deletePost = async () => {
    await supabase.from('Posts').delete().eq('id', id);
    navigate('/');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Edit Challenge</h2>
      <form onSubmit={updatePost}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          value={post.author}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={post.description}
          onChange={handleChange}
        />
        <input type="submit" value="Update" />
        <button onClick={deletePost}>Delete</button>
      </form>
    </div>
  );
};

export default EditPost;