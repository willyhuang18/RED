import Image from "next/image";
import{
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from "@heroicons/react/outline"

function Header(){
    return(
        <div>
        {/* header */}
            <div className="flex justify-between max-w-6xl">
                <div className="relative hidden lg:inline-grid h-24 w-24">
                    <Image src='https://upload.wikimedia.org/wikipedia/commons/c/c1/XiaohongshuLOGO.png'
                        layout="fill" alt="" objectFit="contain"
                    />
                </div>
                <div className="relative w-10 h-10 lg:hidden flex-shrink-lg cursor-pointer">
                    <Image src='https://upload.wikimedia.org/wikipedia/commons/c/c1/XiaohongshuLOGO.png'
                        layout="fill" alt="" objectFit="contain"
                    />
                </div>
                {/* Middle */}
                <div className="relative mt-1 p-3 rounder-md">
                    <div className="absolute inset-y-0 pl-3 flex mb-7 items-center
                    pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-500" />  
                    </div>
                    <input className=" bg-gray-50 block w-full pl-10" type="text" placeholder="Search" />
                </div>
            </div> 
        </div>
    )
}

export default Header;