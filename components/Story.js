/* eslint-disable @next/next/no-img-element */
function Story({ img, username }){
    return (
        <div>
        <img src={img} alt="" />
        <p>{username}</p>
        </div>
    )
};

export default Story;