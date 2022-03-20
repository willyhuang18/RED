/* eslint-disable @next/next/no-img-element */
import faker from '@faker-js/faker';
import { useState, useEffect } from 'react'

function Suggestions() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(10)].map((_, i) => (
            {
                ...faker.helpers.contextualCard(),
                id: i
            }
        ));
        setSuggestions(suggestions);
    },[])
  return (
      <div className='mt-4 ml-10 max-w-[400px]'>
        <div className='flex justify-between  text-sm mb-5'>
            <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
            <button className='text-gray-500 font-semibold'>See All</button>
        </div>
        <div className='flex flex-rows p-6 gap-4 rounded shadow-lg 
        overflow-x-scroll max-w-[1000px] '>
        {suggestions.map((profile) =>(
            <card  
            key={profile.id}
            className='w-full rounded-lg border shadow-md flex flex-col p-5 bg-white items-center '>
            <img className="w-10 h-10 rounded-full border  "
            src={profile.avatar}
            alt='' />
                <h2 className='font-semibold text-sm mt-3'>
                {profile.username}</h2>
                <h3 className='text-xs text-gray-400 mt-3 '>
                Works at {profile.company.name}</h3>
            <button className='text-blue-400 text-xs font-bold mt-3'>Follow</button>
            </card>
        ))}
        </div>
    </div>
  )
}

export default Suggestions