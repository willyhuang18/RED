import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {db, auth} from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import Header from "../components/Header";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const signUp = async (e) => {
    e.preventDefault();
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a new user document in the 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email
        
      });
      router.push({
        pathname: '/',
        query: { name: username },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
        <img className="w-80" 
        src='https://viceclicks.com/wp-content/uploads/2020/04/pasted-image-0-3.png' 
        alt=""/>
        <p className="font-xs italic text-lg mt-5">This is not a real App, not for commerce use. Thank you</p>
        <form onSubmit={signUp} className="mt-40 space-y-4">
          <h2 className="text-xl font-bold mb-4">Create your Account</h2>
          <div className="space-y-2">
            <label className="block w-64">
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </label>
            <label className="block w-64">
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </label>
            <label className="block w-64">
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </label>
          </div>
          <button type="submit" className="block w-64 p-2 mt-4 bg-blue-500 text-white rounded-md">
            Sign Up
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
}

export default SignUp;
