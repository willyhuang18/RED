import { useState, useEffect } from "react";
import {db, storage} from '../firebase'
import {onSnapshot, collection, query, orderBy} from 'firebase/firestore';
import Post from "./Post"

const posts = [
    {
        id: "123",
        username:"JayChou",
        userImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/1203%E5%92%AA%E5%92%95%E9%9F%B3%E4%B9%90%E7%9B%9B%E5%85%B8_%EF%BC%888%EF%BC%89.jpg/1200px-1203%E5%92%AA%E5%92%95%E9%9F%B3%E4%B9%90%E7%9B%9B%E5%85%B8_%EF%BC%888%EF%BC%89.jpg",
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/1203%E5%92%AA%E5%92%95%E9%9F%B3%E4%B9%90%E7%9B%9B%E5%85%B8_%EF%BC%888%EF%BC%89.jpg/1200px-1203%E5%92%AA%E5%92%95%E9%9F%B3%E4%B9%90%E7%9B%9B%E5%85%B8_%EF%BC%888%EF%BC%89.jpg",
        caption:"This is on Fire"
    },
    {
        id: "123",
        username:"JayChou",
        userImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/1203%E5%92%AA%E5%92%95%E9%9F%B3%E4%B9%90%E7%9B%9B%E5%85%B8_%EF%BC%888%EF%BC%89.jpg/1200px-1203%E5%92%AA%E5%92%95%E9%9F%B3%E4%B9%90%E7%9B%9B%E5%85%B8_%EF%BC%888%EF%BC%89.jpg",
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/1203%E5%92%AA%E5%92%95%E9%9F%B3%E4%B9%90%E7%9B%9B%E5%85%B8_%EF%BC%888%EF%BC%89.jpg/1200px-1203%E5%92%AA%E5%92%95%E9%9F%B3%E4%B9%90%E7%9B%9B%E5%85%B8_%EF%BC%888%EF%BC%89.jpg",
        caption:"This is on Fire",
    },
];

function Posts(){
    const [posts, setPosts] = useState([])

    useEffect (() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy("timestamp", 'desc')), snapshot =>{
            setPosts(snapshot.docs);
        });
        return unsubscribe;
    }, [db])
    return (
        <div >
        {posts.map((post) =>(
        <Post 
        key={post.id} 
        id={post.id} 
        username={post.username}
        userImg= {post.userImg}
        img={post.img}
        caption={post.caption}   
        />
            
        ))}
        <Post />

        </div>
    );
}

export default Posts;