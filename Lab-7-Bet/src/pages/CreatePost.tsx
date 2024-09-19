import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    author: '',
    description: '',
  });

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .insert({ title: post.title, author: post.author, description: post.description })
      .select();

    navigate('/');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Create a New Challenge</h2>
      <form onSubmit={createPost}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={post.author}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={post.description}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreatePost;