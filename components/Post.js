/* eslint-disable @next/next/no-img-element */
import { 
    StarIcon,
    HeartIcon,
    ShareIcon,
    DotsHorizontalIcon,
    ChatIcon,
    PencilAltIcon,
 } from "@heroicons/react/outline"
 import { BsBoxArrowUpRight } from "react-icons/bs";
 import { HeartIcon as HeartIconFilled, ChevronDownIcon } from '@heroicons/react/solid'
import { useSession } from "next-auth/react";
import { useState,useEffect,Fragment } from 'react';
import {db, storage} from '../firebase'
import Moment from 'react-moment';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { Collapse } from 'react-collapse';
import { Menu, Transition } from '@headlessui/react'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function Post({id, username, userImg, img, caption}){
    const { data: session } = useSession();
    const [comment, setComment]= useState("");
    const [comments, setComments]= useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

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

    useEffect(
        () =>
        setHasLiked(
            likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1
        ),
    [likes]
    );

    const likePost = async () => {
        if(hasLiked){
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
        }else{
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid),{
                username: session.user.username,
            })
        }
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

    console.log(hasLiked);
    return (
        // <Collapse>
        <div className="bg-white my-7 border rounded-lg max-h-[300px] max-w-[500px]" >
        {/* header */}
            <div className="flex items-center p-5">
                <img src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3" alt="" />
                <p className="flex-1 font-bold">{username}</p>
                <div className="flex space-x-4">
                <p className="bg-blue-500 hover:bg-blue-700 text-white 
                font-bold py-1 px-2 rounded-full">Follow</p>
                </div>
                <Menu as="div" className="relative inline-block text-left pl-2">
                <div>
                    <Menu.Button>
                    <DotsHorizontalIcon className="h-5 mt-2 cursor-pointer" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                            Edit
                            </a>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                            Duplicate
                            </a>
                        )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                            Archive
                            </a>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                            Move
                            </a>
                        )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                            Share
                            </a>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                            Add to favorites
                            </a>
                        )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )} 
                            // onClick={() => }
                            >
                            Delete
                            </a>
                        )}
                        </Menu.Item>
                    </div>
                    </Menu.Items>
                </Transition>
                </Menu>
            </div>
        {/* img */}
        <div className=" overflow-x-hidden max-h-[1000px] overflow-y-scroll scrollbar-thumb-black scrollbar-thin" >
            <img src={img} className="object-cover w-full" alt="" onClick={() => setIsOpened(!isOpened)} />
            <p className="p-5 truncate">
            
            <span className="font-bold mr-1">{username}</span>
            {caption}
            </p>
            <Collapse isOpened={isOpened}>
        {isOpened && (
            <>
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
            </>
        )}
        </Collapse>
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
            {
                hasLiked || likes.length > 0 ? (
                    <>
                    <HeartIconFilled onClick={likePost} className="btn text-red-500"/>
                    <span className="font-bold">{likes.length}</span>
                    </>
                ) : (
                <HeartIcon onClick={likePost} className="btn" />
                )
            }
                <StarIcon className="btn"/>
                <ChatIcon className="btn"/>
            </div>
        </div>
        )}
        </div>
    )
}

export default Post