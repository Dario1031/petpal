import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import HeaderShelter from '../../components/HeaderShelter';
import HeaderBasic from '../../components/HeaderBasic';
import Footer from '../../components/Footer';
import Message from '../../components/Message';
import MessageTab from '../../components/MessageTab';

const ChatDirectoryPage = () => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const fetchMessageTabs = async () => {
      try {
        const authToken = localStorage.getItem('authtoken');
        const response = await fetch(`http://127.0.0.1:8000/accounts/listbasic/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const historyData = await response.json();
          setHistory(historyData || []);
          console.log(history);
        } else {
          setHistory([]);
          console.error('Failed to fetch chat history:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    fetchMessageTabs();
  }, []); // Empty dependency array ensures the effect runs once on mount

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
          <div>
          {history.map((user) => (
                <MessageTab key={user.id} partner={user.username} />
            ))}
          </div>
          <Footer />
      </div>
    );
  }

};

export default ChatDirectoryPage;