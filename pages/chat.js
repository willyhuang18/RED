import { useState,useEffect,Fragment } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { getProviders } from "next-auth/react";
import {db, storage} from '../firebase'
import Moment from 'react-moment';
import { addDoc, collection, deleteDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import Header from '../components/Header';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('en');
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      },
    );

  }, [db]);

  console.log(users);

  useEffect(
    () => 
      onSnapshot(
        query(
          collection(db, 'messages'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setMessages(snapshot.docs)
      ),
    [db]
  );
  
  const sendMessage = async (e) => {
    e.preventDefault();
    // Translate the message
    const translatedMessage = await translateMessage(message, language);
    // Create a new message object
    const messageToSend = { userInput: message, text: translatedMessage, language };
    // Add the message to Firestore
    await addDoc(collection(db, 'messages'), {
      ...messageToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });

    setMessage('');
  };

  const translateMessage = async (text, targetLanguage) => {
    const apiKey = process.env.GOOGLE_API_KEY;

    try {
      // Send a request to the translation API
      const response = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        null,
        {
          params: {
            q: text,
            target: targetLanguage,
            key: apiKey,
          },
        }
      );
      console.log(response.data.data.translations[0].translatedText);
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation Error:', error);
      return text; 
    }
  };

  return (
  <>
    <Header />
    <div className="flex h-screen">
      {/* Friend contacts */}
      <div className="w-1/4 bg-white rounded-r-xl shadow-md p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Contacts</h2>
        {users.map((user) => (
          <div key={user.id} className="mb-4" onClick={() => setCurrentUser(user)}>
            <p className="font-medium">{user.username}</p>
          </div>
        ))}
      </div>

      {/* Div container with Translate box and Chat box */}
      <div className="w-3/4 bg-white rounded-l-xl shadow-md flex flex-col h-full ml-6">
        {/* Translate box */}
        <div className="p-6 rounded-tl-xl shadow-md">
          <h1 className="text-2xl font-bold">Message</h1>
          <div className="mt-2">
            <select onChange={(e) => setLanguage(e.target.value)} className="form-select block w-full mt-1">
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ar">Arabic</option>
              <option value="es">Spanish</option>
              <option value="zh-CN">Chinese (Simplified)</option>
              <option value="hi">Hindi</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="pt">Portuguese</option>
              <option value="de">German</option>
              <option value="ko">Korean</option>
              <option value="tr">Turkish</option>
              <option value="it">Italian</option>
              <option value="nl">Dutch</option>
              <option value="sv">Swedish</option>
              <option value="so">Somali</option>
              <option value="pl">Polish</option>
              <option value="id">Indonesian</option>
              <option value="th">Thai</option>
              <option value="vi">Vietnamese</option>
              <option value="fa">Persian (Farsi)</option>
            </select>
          </div>
        </div>

        {/* Chat box */}
        <div className="flex-grow p-6 overflow-auto">
          {messages.length > 0 && (
            <div className="ml-10 h-20">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-2 mb-3">
                  <img 
                    src={message.data().userImage} 
                    alt="" 
                    className="h-7 rounded-full"
                  />
                  <div className="flex flex-col bg-gray-200 rounded-xl p-2">
                    <p className="text-sm">
                      <span className="font-bold">{message.data().username}</span> {' '}
                      {message.data().userInput}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="font-bold">Translation:</span> {' '}
                      {message.data().text}
                    </p>
                  </div>
                  <Moment fromNow className="pr-5 text-xs self-end">
                    {message.data().timestamp?.toDate()}
                  </Moment>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message input */}
        <div className="p-6 border-t border-gray-300">
          <form onSubmit={sendMessage} className="w-full flex">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};

export default Chat;
