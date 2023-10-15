import React from 'react';
import { HomeComponent } from '@components/home';
import { useAuth } from '@hooks';
import { Loader } from '@/common/components/loader';

const Home = () => {
  const { isUserLoading, user } = useAuth();
  if (isUserLoading) return <Loader />;

  return user && <HomeComponent />;
};

export default Home;
