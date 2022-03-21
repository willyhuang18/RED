/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import{
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    MenuIcon,
    MapIcon,
} from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid"
import { signIn, signOut, useSession } from "next-auth/react";
import {useRouter} from 'next/router';

function Header(){
    const { data: session } = useSession();
    const router = useRouter();

    console.log(session);
    return(
        <div className="shadow-sm ">
        {/* left*/}
            <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto ">
                <div onClick={() => router.push('/')} className="relative hidden lg:inline-grid h-20 w-20 mt-2 cursor-pointer">
                    <Image src='https://viceclicks.com/wp-content/uploads/2020/04/pasted-image-0-3.png'
                        layout="fill" alt="" objectFit="contain"
                    />
                </div>
                <div onClick={() => router.push('/')} className="relative w-10 h-15 lg:hidden flex-shrink-lg cursor-pointer">
                    <Image src='https://gsrventuresglobal.com/wp-content/uploads/2020/04/xiaohongshu-C.png'
                        layout="fill" alt="" objectFit="contain"
                    />
                </div>
                {/* Middle */}
                <div className="max-w-xs flex items-center ">
                    <div className="relative mt-1 p-3 rounder-md">
                        <div className="absolute inset-y-0 pl-3 flex items-center
                        pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-500" />  
                        </div>
                        <input className=" bg-gray-50 block w-full pl-10 sm:text-sm
                        border-gray-300 focus:ring-black focus:border-black rounded-md" type="text" placeholder="Search" />
                    </div>
                </div>
                {/* right */}
                <div className="flex items-center justify-end space-x-4 mt-3">
                    <HomeIcon onClick={() => router.push('/')} className="navBtn" />
                    <MenuIcon className="h-6 md:hidden cursor-pointer" />
                    {session ? (
                    <>
                        <div className="relative navBtn">
                        <MapIcon className="navBtn" />
                        <div className="absolute -top-1 -right-3 text-xs w-5 
                        bg-red-500 rounded-full flex items-center justify-center
                        animate-pulse text-white">10</div>
                        </div>
                        <PlusCircleIcon className="navBtn" />
                        <UserGroupIcon className="navBtn" />
                        <HeartIcon className="navBtn" />

                        <img 
                        onClick={signOut}
                        src={session?.user?.image}
                        alt="" 
                        className="h-10 rounded-full cursor-pointer"
                        />
                    </>
                    ):(
                        <button onClick={signIn}>Sign In </button>
                    )}
                </div>
                
            </div> 
        </div>
    )
}

export default Header;