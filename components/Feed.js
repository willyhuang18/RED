import MiniProfile from "./MiniProfile"
import Post from "./Post"
import Posts from "./Posts"
import Stories from "./Stories"
import Suggestions from "./Suggestions"
import { useSession } from 'next-auth/react'

function Feed(){
    const { data: session } = useSession();

    return (
        <main className= {`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl
        xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/* section */}
            <section className="col-span-2">
            {/* stories */}
            <Stories />
                <Suggestions />
            {/* posts */}
            <Posts />
            </section>
            
            {session && (
            <section className="hidden xl:inline-grid md:col-span-1 ">
                <div className="fixed top-20" >
                {/* mini profile */}
                <MiniProfile />
                {/* suggestions */}
                </div>
            </section>
            )}
        </main>
    )
}

export default Feed