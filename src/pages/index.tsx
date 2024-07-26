import React from 'react';
import Link from 'next/link';

const Home = () => (
  <div>
    <h1>Welcome to the Trello-style Task Management App</h1>
    <Link href="/signup">Sign Up</Link> | <Link href="/login">Log In</Link>
  </div>
);

export default Home;
