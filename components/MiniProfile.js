/* eslint-disable @next/next/no-img-element */
function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
        <img className="rounded-full border p-[2px] w-16 h-16" 
        src="https://upload.wikimedia.org/wikipedia/commons/4/45/Jackson_Wang_at_a_mini_fanmeeting_outside_%22Show%21_Music_Core%22_studios%2C_1_June_2019_02.jpg" 
        alt=""/>
        <div className="flex-1 mx-4">
            <h2 className="font-bold">Jackson Wang</h2>
            <h3 className="text-sm text-gray-400">Welcome to RED</h3>  
        </div>
        <button className="text-blue-400 text-sm font-semibold"> Sign out</button>
    </div>
  )
}

export default MiniProfile