import faker from '@faker-js/faker';
import { useState, useEffect } from 'react'

function Suggestions() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => (
            {
                ...faker.helpers.contextualCard(),
                id: i
            }
        ));
        setSuggestions(suggestions);
    },[])
  return (
    <div>
        
    </div>
  )
}

export default Suggestions