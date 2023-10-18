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
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14">
        <img className="w-80" 
        src='https://viceclicks.com/wp-content/uploads/2020/04/pasted-image-0-3.png' 
        alt=""/>
        <p className="font-xs italic text-lg mt-5">This is not a real App, not for commerce use. Thank you</p>
        <form onSubmit={signUp} className="mt-40">
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" className="p-3 bg-blue-500 rounded-lg text-white">
            Sign Up
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
}

export default SignUp;
