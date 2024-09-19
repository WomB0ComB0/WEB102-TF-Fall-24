import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  betCount: number;
}

interface CardProps {
  post: Post;
}

const Card: React.FC<CardProps> = ({ post }) => {
  const [count, setCount] = useState(post.betCount);

  const updateCount = async (event: React.MouseEvent) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .update({ betCount: count + 1 })
      .eq('id', post.id);

    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="Card">
      <h2>{post.title}</h2>
      <p>Author: {post.author}</p>
      <p>{post.description}</p>
      <p>Bet Count: {count}</p>
      <button onClick={updateCount}>Bet</button>
      <Link to={`/edit/${post.id}`}>Edit</Link>
    </div>
  );
};

export default Card;