import Image from "next/image";
import{
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    MapIcon,
} from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid"

function Header(){
    return(
        <div>
        {/* left*/}
            <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto ">
                <div className="relative hidden lg:inline-grid h-20 w-20 mt-2">
                    <Image src='https://upload.wikimedia.org/wikipedia/commons/c/c1/XiaohongshuLOGO.png'
                        layout="fill" alt="" objectFit="contain"
                    />
                </div>
                <div className="relative w-10 h-15 lg:hidden flex-shrink-lg cursor-pointer">
                    <Image src='https://gsrventuresglobal.com/wp-content/uploads/2020/04/xiaohongshu-C.png'
                        layout="fill" alt="" objectFit="contain"
                    />
                </div>
                {/* Middle */}
                <div className="max-w-xs">
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
                <div className="flex item-center justify-end space-x-4 mt-3">
                    <HomeIcon className="navBtn" />
                    <MenuIcon className="h-6 md:hidden cursor-pointer" />
                    <MapIcon className="navBtn" />
                </div>
                
            </div> 
        </div>
    )
}

export default Header;