import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import HeaderShelter from '../../components/HeaderShelter';
import HeaderBasic from '../../components/HeaderBasic';
import Footer from '../../components/Footer';
import Message from '../../components/Message';
import MessageList from '../../components/MessageList';

const ChatPage = () => {
  const { chatNumber } = useParams();
  const [history, setHistory] = useState(null);
  const [messageText, setMessageText] = useState('');
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);

  const sendMessage = async () => {
    try {
      const authToken = localStorage.getItem('authtoken');
      const response = await fetch(`http://127.0.0.1:8000/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ sender: user.username, recipient: chatNumber, content: messageText }),
      });

      if (response.ok) {
        // Handle successful response (e.g., show a modal)
        console.log('Message sent successfully');
        window.location.reload();
      } else {
        // Handle error response (e.g., show an error message)
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error during message sending:', error.message);
    }
  };

  useEffect(() => {
    const fetchMessageHistory = async () => {
      try {
        const authToken = localStorage.getItem('authtoken');
        const response = await fetch(`http://127.0.0.1:8000/messages/${chatNumber}/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const historyData = await response.json();
          setHistory(historyData || []);
        } else {
          setHistory([]);
          console.error('Failed to fetch chat history:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    fetchMessageHistory();
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
                  <h1 class="text-center">Message History with {chatNumber}</h1>
                  <div class="col-md-10 mx-auto col-lg-8">
                  <MessageList messages={history.results} />
              {/* <Message sender="Peter" content="You alread know I'm obsessed with it. Back again with another mil-"/>
              <Message sender ="Peter" content="HELP HELLPP HELPP MEE HELLPPP"/> */}
            </div>
          </div>
        </div>
        <div class="container-xl px-4 py-5">
          <div class="row align-items-center g-lg-5 py-5">
            <div class="col-md-10 mx-auto col-lg-8">
              <form class="p-4 p-md-5 border rounded-3 custom-login">
                <h3>Send Message</h3>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingInput" placeholder="Enter Your Message" required onChange={(e) => setMessageText(e.target.value)}/>
                  <label for="floatingInput">Enter Your Message</label>
                </div>
                <a class="btn" onClick={sendMessage}>Send Message</a>
                {/* <a class="btn" data-bs-toggle="modal" data-bs-target="#StatusModal">Send Message</a> */}
                {/* <div class="modal fade" id="StatusModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Message Status</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <ul class="list-unstyled">
                          <li class="font-color-green">Status: Sent</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>                   */}
              </form>
            </div>
          </div>
        </div>
          <Footer />
      </div>
    );
  }

};

export default ChatPage;