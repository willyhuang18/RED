import faker from '@faker-js/faker';
import { useEffect, useState } from "react"
import Story from './Story';

function Stories(){
    const [suggestions, setSuggestions] = useState([])

    useEffect(()=>{
        const suggestion = [...Array(20)].map((_, i) =>({
            ...faker.helpers.contextualCard(),
            id: i,
        }));
        console.log(suggestion);
        setSuggestions(suggestion);
    },[]);

    return(
        <div>
        {suggestions.map(profile => (
            <Story 
            key={profile.id} 
            img={profile.avatar} 
            username={profile.username} />
        ))}
        </div>
    )
}

export default Stories;