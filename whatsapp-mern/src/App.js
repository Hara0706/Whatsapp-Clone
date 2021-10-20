// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() =>{
      axios.get('/messages/sync')
      .then(response =>{
        //console.log(response.data);
        setMessages(response.data);
      });
  }, []);

  useEffect(() =>{

      const pusher = new Pusher('fb3ec16e3a4ba86f6ff1', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) =>{
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages] );

  console.log(messages);

  return (
    <div className="app">
     
     <div className = "app__body">
        <Sidebar/>

        <Chat messages = {messages}/>
     </div>
    
    </div>
  );
}

export default App;
