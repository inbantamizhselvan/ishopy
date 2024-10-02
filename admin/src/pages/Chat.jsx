import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../App";

const AdminChat = ({ token }) => {
  const [allChats, setAllChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const res = await axios.get(backendURL + "/api/chats/all", {
          headers: { token },
        });
        if (res.data.success) {
          setAllChats(res.data.chats);
        }
      } catch (error) {
        setError("Error fetching all chats");
      }
    };

    fetchAllChats();
  }, [token]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    try {
      const res = await axios.post(
        backendURL + "/api/chats/admin",
        { userId, message },
        { headers: { token } }
      );
      if (res.data.success) {
        setSelectedChat(res.data.chat);
        setMessage("");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError("Error sending message");
    }
  };

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    setUserId(chat.userId); 
  };

  return (
    <div className="flex h-[90vh] p-4">
      {/* Sidebar listing all user chats */}
      <div className="w-1/4 bg-gray-200 p-4 rounded-l-md overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">All User Chats</h2>
        {allChats.length > 0 ? (
          allChats.map((chat, index) => (
            <div
              key={index}
              className={`cursor-pointer p-2 mb-2 rounded-md ${
                selectedChat && selectedChat.userId === chat.userId
                  ? "bg-blue-200"
                  : "bg-gray-100"
              }`}
              onClick={() => handleChatSelection(chat)} 
            >
              <p className="font-bold">{chat.name}</p>
              <p className="text-xs text-gray-500">User ID: {chat.userId}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No chats available</p>
        )}
      </div>

      {/* Chat box displaying selected user's messages */}
      <div className="w-3/4 flex flex-col bg-gray-100 p-4 rounded-r-md">
        {selectedChat ? (
          <>
            <div className="flex-grow overflow-y-auto mb-4">
              {selectedChat.chats.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 p-2 rounded-md max-w-[45%] ${
                    msg.sender === "admin"
                      ? "ml-auto bg-green-200" 
                      : "mr-auto bg-gray-200" 
                  }`}
                >
                  <p>{msg.message}</p>
                  <small className="block text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Select a chat to view messages</p>
        )}

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AdminChat;
