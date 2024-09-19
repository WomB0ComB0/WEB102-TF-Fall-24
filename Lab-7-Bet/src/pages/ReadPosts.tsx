import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  betCount: number;
}

const ReadPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      if (error.code === '42P01') {
        console.error('Table does not exist. Please create the "Posts" table in your Supabase database.');
      } else {
        console.error('Error fetching posts:', error);
      }
    } else {
      setPosts(data || []);
    }
  };

  return (
    <div className="ReadPosts">
      <h2>Challenges</h2>
      <div className="posts-container">
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ReadPosts;