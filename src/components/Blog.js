import React, { useEffect, useState } from 'react';
import { fetchNotionData } from '../remotes/fetchNotionData';
import styled from 'styled-components';

const BlogContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const BlogPost = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.gray1};
  border-radius: 8px;
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.black};
`;

const BlogContent = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.gray6};
  line-height: 1.5;
`;

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchNotionData();
      setPosts(data);
    };

    getData();
  }, []);

  return (
    <BlogContainer>
      {posts.map((post) => (
        <BlogPost key={post.id}>
          <BlogTitle>{post.properties.Name.title[0].plain_text}</BlogTitle>
          <BlogContent>
            {post.properties.Content.rich_text[0].plain_text}
          </BlogContent>
        </BlogPost>
      ))}
    </BlogContainer>
  );
};

export default Blog;
