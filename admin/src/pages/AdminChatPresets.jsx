import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';  // Make sure backendURL is defined in your project

const AdminChatPresets = ({ token }) => {
    const [presets, setPresets] = useState([]);
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [keywords, setKeywords] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPresets = async () => {
            try {
                const res = await axios.get(`${backendURL}/api/chats/presets`, {
                    headers: { token },
                });
                setPresets(res.data.presets);
            } catch (err) {
                console.error(err);
                setError('Error fetching presets');
            } finally {
                setLoading(false);
            }
        };

        fetchPresets();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim() || !response.trim() || !keywords.trim()) {
            setError('Question, response, and keywords cannot be empty.');
            return;
        }

        const keywordsArray = keywords.split(',').map(keyword => keyword.trim());
        try {
            if (editingIndex !== null) {
                const apiResponse = await axios.put(
                    `${backendURL}/api/chats/presets/${presets[editingIndex]._id}`,
                    { question, responses: [response], keywords: keywordsArray },
                    { headers: { token } }
                );
                const updatedPresets = [...presets];
                updatedPresets[editingIndex] = apiResponse.data.preset;
                setPresets(updatedPresets);
            } else {
                const apiResponse = await axios.post(
                    `${backendURL}/api/chats/presets`,
                    { question, responses: [response], keywords: keywordsArray },
                    { headers: { token } }
                );
                setPresets((prev) => [...prev, apiResponse.data.preset]);
            }

            // Reset the form
            setQuestion('');
            setResponse('');
            setKeywords('');
            setEditingIndex(null);
        } catch (err) {
            console.error(err);
            setError('Error saving preset');
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setQuestion(presets[index].question);
        setResponse(presets[index].responses[0]);
        setKeywords(presets[index].keywords.join(', '));
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendURL}/api/chats/presets/${id}`, {
                headers: { token },
            });
            setPresets(presets.filter((preset) => preset._id !== id));
        } catch (err) {
            console.error(err);
            setError('Error deleting preset');
        }
    };

    return (
        <div className="p-4 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Chat Presets Management</h2>

            {loading ? (
                <p>Loading presets...</p>
            ) : (
                <>
                    {error && <p className="text-red-500">{error}</p>}

                    <form onSubmit={handleSubmit} className="mb-4">
                        <input
                            type="text"
                            placeholder="Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mr-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Response"
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mr-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Keywords (comma separated)"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mr-2"
                            required
                        />
                        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
                            {editingIndex !== null ? 'Update Preset' : 'Add Preset'}
                        </button>
                    </form>

                    <h3 className="font-bold mb-2">Existing Presets:</h3>
                    <ul>
                        {presets.map((preset, index) => (
                            <li key={preset._id} className="flex justify-between items-center bg-white rounded-md p-2 mb-2 shadow">
                                <div>
                                    <strong>Q:</strong> {preset.question}<br />
                                    <strong>A:</strong> {preset.responses[0]}<br />
                                    <strong>Keywords:</strong> {preset.keywords.join(', ')}
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(preset._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default AdminChatPresets;
