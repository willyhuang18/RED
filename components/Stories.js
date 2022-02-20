import faker from 'faker';
import { useEffect } from "react"

function Stories(){
    useEffect(()=>{
        const suggestion = [...Array(20)].map((_, i) =>({
            ...faker.helpers.contextualCard(),
            id: i,
        }));
        console.log(suggestion);
    },[]);

    return(
        <div>

        </div>
    )
}

export default Stories;