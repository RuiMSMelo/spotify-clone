import { useEffect, useState } from 'react';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setExpiresIn(data.expiresIn);

        window.history.pushState({}, null, '/');
      } catch (error) {
        console.error('Fetch error:', error);
        window.location = '/';
      }
    };

    fetchData();
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
  
    const timeoutDuration = (expiresIn - 60) * 1000;
  
    const interval = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:3001/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setExpiresIn(data.expiresIn);
  
        // window.history.pushState({}, null, '/');
      } catch (error) {
        console.error('Fetch error:', error);
        window.location = '/';
      }
    }, timeoutDuration);
  
    return () => clearInterval(interval);

  }, [refreshToken, expiresIn]);
  
  

  return accessToken;
}