import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../app/store/store';

const useSocket = () => {
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    
    if (!user?.accessToken) return;

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: { token: user.accessToken }
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.accessToken]);
};

export default useSocket;