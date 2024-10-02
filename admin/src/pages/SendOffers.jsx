import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendURL } from '../App';

const SendOffers = ({token}) => {
  const [offerMessage, setOfferMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOfferEmail = async () => {
    if (!offerMessage || !subject) {
      toast.error('Please provide both subject and message content for the offer.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post( backendURL + '/api/user/sendoffers', { offerMessage, subject },{ headers: {token} } );
      if (response.data.success) {
        toast.success('Offer emails sent successfully!');
        setOfferMessage('');
        setSubject('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error sending offers:', error);
      toast.error('Error sending offers.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Send Offer Emails</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter the subject of the offer"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Offer Message</label>
          <textarea
            value={offerMessage}
            onChange={(e) => setOfferMessage(e.target.value)}
            placeholder="Enter the text content of the offer"
            className="w-full h-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={sendOfferEmail}
          className={`w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Sending Offers...' : 'Send Offer Emails'}
        </button>
      </div>
    </div>
  );
};

export default SendOffers;
