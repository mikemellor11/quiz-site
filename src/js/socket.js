import io from 'socket.io-client';

export default io(`http://192.168.0.11:8080${window.location.pathname}`);