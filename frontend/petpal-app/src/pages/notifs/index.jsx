import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import HeaderShelter from '../../components/HeaderShelter';
import HeaderBasic from '../../components/HeaderBasic';
import Footer from '../../components/Footer';
import Message from '../../components/Message';
import MessageList from '../../components/MessageList';

const NotifPage = () => {
  const { chatNumber } = useParams();
  const [history, setHistory] = useState(null);
  const [messageText, setMessageText] = useState('');
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  console.log(user);

  useEffect(() => {
    const fetchNotifHistory = async () => {
      try {
        const authToken = localStorage.getItem('authtoken');
        const response = await fetch(`http://127.0.0.1:8000/messages/${user.id}/recent/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const historyData = await response.json();
          setHistory(historyData || []);
          console.log(historyData);
        } else {
          setHistory([]);
          console.error('Failed to fetch chat history:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    fetchNotifHistory();
  }, [chatNumber]); // Empty dependency array ensures the effect runs once on mount

  if (!history) {
    // You can render a loading state here if needed
    return <div>Loading...</div>;
  }
  else {
    console.log(history.results)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {user.is_shelter && (
                  <HeaderShelter />
              )}
      {!user.is_shelter && (
                  <Header />
              )}
      {!user && (
                  <HeaderBasic />
              )}
          <div class="container-xl px-4 py-5">
              <div class="row align-items-center g-lg-5 py-5">
                  <h1 class="text-center">Notifications</h1>
                  <div class="col-md-10 mx-auto col-lg-8">
                  {history.map((his) => (
                    <Message key={his.id} sender={his.sender} recipient={his.recipient} content={`NEW MESSAGE FROM ${his.sender}`} />
                ))}
            </div>
          </div>
        </div>
          <Footer />
      </div>
    );
  }

};

export default NotifPage;