//file name: App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Link } from 'react-router-dom';
import { supabase } from './client';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const user = supabase.auth.user();
  //   setUser(user);
  // }, []);
  useEffect(() => {
    const user = supabase.auth.user;
    setUser(user);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const descr =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

  const posts = [
    { id: '1', title: 'Cartwheel in Chelsea 🤸🏽‍♀️', author: 'Harvey Milian', description: descr },
    { id: '2', title: 'Love Lock in Paris 🔒', author: 'Beauford Delaney', description: descr },
    { id: '3', title: 'Wear Pink on Fridays 🎀', author: 'Onika Tonya', description: descr },
    { id: '4', title: 'Adopt a Dog 🐶', author: 'Denise Michelle', description: descr },
  ];

  let element = useRoutes([
    { path: '/', element: <ReadPosts data={posts} /> },
    { path: '/edit/:id', element: <EditPost data={posts} /> },
    { path: '/new', element: user ? <CreatePost /> : <Login /> }, // Render CreatePost if user is authenticated
    { path: '/login', element: !user && <Login setUser={setUser} /> }, // Render Login if user is not authenticated
    { path: '/signup', element: !user && <SignUp /> }, // Render SignUp if user is not authenticated
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>👍 Bet 1.0</h1>
        <Link to="/">
          <button className="headerBtn"> Explore Challenges 🔍 </button>
        </Link>
        {user ? (
          <>
            <Link to="/new">
              <button className="headerBtn"> Submit Challenge 🏆 </button>
            </Link>
            <button className="headerBtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="headerBtn"> Login </button>
            </Link>
            <Link to="/signup">
              <button className="headerBtn"> Sign Up </button>
            </Link>
          </>
        )}
      </div>
      {element}
    </div>
  );
};

export default App;
