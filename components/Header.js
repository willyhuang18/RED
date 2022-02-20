import Image from "next/image";
import{
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from "@heroicons/react"

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
                <div>
                <input type="text" placeholder="" />
                </div>
            </div> 
        </div>
    )
}

export default Header;