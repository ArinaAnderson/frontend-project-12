import React, { useState, useEffect } from 'react';
import { useGetChannelsQuery } from '../store/apis/channelsApi.js';
import axios from '../api/axios.js';

import Skeleton from '../components/Skeleton.js';

const Channels = () => {
  // const { data, error, isLoading } = useGetChannelsQuery();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          method: 'get',
          url: '/channels',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
  
        console.log(response.data);
      } catch(e) {
        console.log(e, e.message)
      } finally {
        setIsLoading(false);
      }
    };
    sendRequest();
  }, []);

  if (isLoading) {
    return <Skeleton times={5} className='skeleton--w-50 skeleton--ml-25'/>;
  }
  return (
    <h1>Channels</h1>
  );
}

export default Channels;
