import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  useEffect(() => {
    Router.push('/projects');
  }, []);

  return (
    <div>
      <h1>Index page</h1>
    </div>
  );
};

export default Home;
