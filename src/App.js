import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { getToken, onMessage } from "firebase/messaging";
import { toast, ToastContainer } from "react-toastify";
import { messaging } from './firebase/firebaseConfig';
import Message from "./components/Message";


const messageListener = () => {
  return new Promise(resolve => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
}

function App() {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [token, setToken] = useState(null);
  const key = "BLjE6iECAGTKtGDckiUVy8Mh5arKm90_Lpo20AmAYgzPXosVLwT4FtT5wYDFXpVyMK2e1G8rR1ju5_Hq2AXE0FU";
  
  useEffect(() => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        setIsPermissionGranted(true);
        console.log('Permission granted');
        getToken(messaging, { vapidKey: key }).then(currentToken => {
          if (currentToken) {
            // send the token to the server
            console.log('Token: ' + currentToken);
            setToken(currentToken);
            
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }).catch(err => {
      console.error("Permission is not granted ", err);
    });

// eslint-disable-next-line
  }, []);




  const url = 'http://localhost:8080/sendNotification';
  const sendNotification = () => {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('Received notification',response);
        }).catch(err => {
          console.log('Received error', err);
        });
    
  };

 
  useEffect(() => {

    const unsubscribe = () => {
      messageListener().then(payload => {
        console.log(payload)
        toast(<Message notification={payload.notification} />);
        unsubscribe(); // Re-subscribe for the next message
      }).catch(err => {
        console.log('Received error', err);
        unsubscribe(); // Re-subscribe even in case of an error
      });
    };

    unsubscribe(); // Initial call to start listening

    // Clean up function to stop listening when the component unmounts
    return () => {
      unsubscribe(); // Stop listening when component unmounts
    };
  }, []);
  
  return (
    <div className="App">
       <ToastContainer />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isPermissionGranted ? (
          <h1>You have granted notification permission.</h1>
        ) : (
          <h1>You have not granted notification permission.</h1>
        )}
        <button style={{ backgroundColor: 'blueviolet' }} onClick={sendNotification} type="button">Send Notification</button>
      </header>

     
    </div>
  );
}

export default App;
