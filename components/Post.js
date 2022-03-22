/* eslint-disable @next/next/no-img-element */
import { 
    StarIcon,
    HeartIcon,
    ShareIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    ChatIcon,
    PencilAltIcon,
 } from "@heroicons/react/outline"
import { useSession } from "next-auth/react";
import { useState,useEffect } from 'react';
import {db, storage} from '../firebase'
import Moment from 'react-moment';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";


function Post({id, username, userImg, img, caption}){
    const { data: session } = useSession();
    const [comment, setComment]= useState("");
    const [comments, setComments]= useState([]);
    const [likes, setLikes] = useState(0);

    useEffect(
        () => 
            onSnapshot(
                query(
                    collection(db, 'posts', id, "comments"),
                    orderBy('timestamp', 'desc')
                    ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db]
    );
    
    useEffect(
        () =>
            onSnapshot(
                collection(db, 'posts', id, 'likes'), 
                (snapshot) => setLikes(snapshot.docs)
            ),
        [db, id]
    );

    const likePost = async () => {
        await setDoc(doc(db, 'posts', id, 'likes', session.user.uid),{
            username: session.user.username,
        })
    }

    const sendComment = async (e) => {
        e.preventDefault();
        
        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, 'posts', id, 'comments'),{
            comment:commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }

    return (
        <div className="bg-white my-7 border rounded-sm ">
        {/* header */}
            <div className="flex items-center p-5">
                <img src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3" alt="" />
                <p className="flex-1 font-bold">{username}</p>
                <div className="flex space-x-4">
                <p className="bg-blue-500 hover:bg-blue-700 text-white 
                font-bold py-1 px-2 rounded-full">Follow</p>
                <DotsHorizontalIcon className="h-5 mt-2" />
                <ShareIcon className="h-5 mt-2"/>
                </div>
            </div>
        {/* img */}
        <div className=" overflow-x-hidden max-h-[1000px] overflow-y-scroll scrollbar-thumb-black scrollbar-thin ">
            <img src={img} className="object-cover w-full" alt="" />
            <p className="p-5 truncate">
            <span className="font-bold mr-1">{username}</span>
            {caption}
            </p>
            {comments.length > 0 && (
            <div className="ml-10 h-20 ">
               {comments.map((comment) => (
                   <div key={comment.id} 
                   className="flex items-center space-x-2 mb-3">
                   <img 
                   src={comment.data().userImage} 
                   alt="" 
                   className="h-7 rounded-full"
                   />
                   <p className="text-sm flex-1"><span className="font-bold">{comment.data().username}
                   </span> {' '}
                    {comment.data().comment}
                    </p>
                    <Moment fromNow className="pr-5 text-xs">
                        {comment.data().timestamp?.toDate()}
                    </Moment>
                   </div>
               ))} 
            </div>
        )}
        </div>
        {/* buttons  */}
        {session && (
        <div className="flex justify-between px-4 pt-4 mb-5">
            <form className="flex items-center">
            <PencilAltIcon className="h-7"/>
            <input className="italic  block w-full text-sm text-black-500
            mr-4 py-2 px-4 rounded-full border-0  font-semi-bold
            bg-violet-50  hover:bg-violet-100" 
            placeholder="Any Comment..." 
            type="text" 
            value={comment}
            onChange={ e =>  setComment(e.target.value)}
            />
            <button 
            className="font-semibold text-blue-400"
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            >Post</button>
            </form>
            <div className="flex space-x-4">
                <HeartIcon onClick={likePost} className="btn" />
                <StarIcon className="btn"/>
                <ChatIcon className="btn"/>
            </div>
        </div>

        )}
        
        {/* comments */}

        </div>
    )
}

export default Post