/* eslint-disable @next/next/no-img-element */
import { 
    StarIcon,
    ChatAltIcon,
    HeartIcon,
    ShareIcon,
    DotsHorizontalIcon,
 } from "@heroicons/react/outline"
function Post({id, username, userImg, img, caption}){
    return (
        <div className="bg-white my-7 border rounded-sm">
        {/* header */}
            <div className="flex items-center p-5">
                <img src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3" alt="" />
                <p className="flex-1 font-bold">{username}</p>
                <div className="flex space-x-4">
                <p className="bg-blue-500 hover:bg-blue-700 text-white 
                font-bold py-2 px-4 rounded-full">Follow</p>
                <DotsHorizontalIcon className="h-5" />
                <ShareIcon className="h-5"/>
                </div>
            </div>
        {/* img */}
        <img src={img} className="object-cover w-full" alt="" />
        {/* buttons  */}
        <div className="flex space-x-4">
            <HeartIcon className="btn" />
            <StarIcon className="btn"/>
            <ChatAltIcon className="btn"/>
        </div>
        {/* caption */}

        {/* comments */}

        {/* input box */}
        </div>
    )
}

export default Post