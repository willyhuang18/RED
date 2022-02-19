import Image from "next/image";

function Header(){
    return(
        <div>
            <h1>I am a little red book</h1>
            <div className="">
                <Image src='https://upload.wikimedia.org/wikipedia/commons/c/c1/XiaohongshuLOGO.png'
                    layout="fill" alt=""
                />
            </div>
        </div>
    )
}

export default Header;