import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Chats = () => {
  const { token, backendURL, setNewMessagesCount } = useContext(ShopContext);
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserChats = async () => {
      setLoading(true); 
      try {
        const response = await axios.post(
          `${backendURL}/api/chats/userchats`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setChats(response.data.chats);
          setNewMessagesCount(0); 
        } else {
          setError('No chat history found');
        }
      } catch (error) {
        console.error(error);
        setError('Error fetching chats');
      } finally {
        setLoading(false); 
      }
    };

    fetchUserChats();
  }, [token, backendURL, setNewMessagesCount]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setSending(true);
      const response = await axios.post(
        `${backendURL}/api/chats/user`,
        { message },
        { headers: { token } }
      );

      if (response.data.success) {
        setChats((prevChats) => [
          ...prevChats,
          { message, sender: 'user', timestamp: new Date().toISOString() },
        ]); 
        setMessage('');
      } else {
        setError('Error sending message');
      }
    } catch (error) {
      console.error(error);
      setError('Error sending message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Your Chats</h2>

      {loading ? (
        <p className="text-gray-500">Loading chats...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : chats.length > 0 ? (
        <div className="flex-grow space-y-4 mb-4 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className={`p-4 bg-white rounded-md shadow-md ${
                chat.sender === 'admin' ? 'bg-green-300' : ''
              }`}
            >
              <p className="text-sm mb-2">
                <strong>{chat.sender === 'admin' ? 'IShopy' : 'You'}:</strong>{' '}
                {chat.message}
              </p>
              <small className="text-gray-500">
                {new Date(chat.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-4">No chats available</p>
      )}

      {/* Combined input area with chat messages */}
      <div className="flex items-center mt-auto">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-md"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={sending}
        />
        <button
          className={`ml-2 px-4 py-2 rounded-md text-white ${
            sending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={sendMessage}
          disabled={sending || !message.trim()} 
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chats;
