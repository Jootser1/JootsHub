import io from 'socket.io-client';
import { useStore } from '@/app/store/store';
import { useEffect } from 'react';

const useSocket = () => {
  const user = useStore((state) => state.user);
  
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