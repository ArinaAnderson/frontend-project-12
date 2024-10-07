import React, { useState, useEffect } from 'react';
import { useGetChannelsQuery } from '../store/apis/channelsApi.js';
import axios from '../api/axios.js';

import Skeleton from '../components/Skeleton.js';

const Channels = () => {
  const { data, error, isLoading } = useGetChannelsQuery();
  console.log(data);

  if (isLoading) {
    return <Skeleton times={5} className='skeleton--w-50 skeleton--ml-25'/>;
  }
  return (
    <h1>Channels</h1>
  );
}

export default Channels;
