import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserAndPosts() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.all([axios.get('/api/user'), axios.get('/api/posts')])
    //   .then(axios.spread((userRes, postsRes) => {
    //     setUser(userRes.data);
    //     setPosts(postsRes.data);
    //   }));
    .then((res)=>{
        let temp = res[1].data
        temp[0].name = res[0].data.name
                setUser(res[0].data);
        setPosts(temp);
    })
  }, []);

  if (!user || !posts) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
export default UserAndPosts