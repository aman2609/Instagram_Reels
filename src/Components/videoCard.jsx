import { useState } from "react";
import "./VideoCard.css"

let VideoCard=(props)=>{
    let [playing,setPlaying]=useState(false);
    let [commentBox,setCommentBox]=useState(false);
    return (
    <div className="video-card">
        <p className="Video-Card-Username">{props.data.name}</p>
        <span className="Video-Card-Music">
            <span className="material-icons-round">music_note</span>
            <marquee>Some Song</marquee>
        </span>
        <span onClick={()=>{
            if(commentBox){
                setCommentBox(false);
            }else{
                setCommentBox(true);
            }

        }} className="material-icons-round Video-Card-Comment">comment</span>
        <span className="material-icons-round Video-Card-Like">favorite_border</span>
        {commentBox?
        (<div className="Video-Card-Comment-Box">
            <div className="Actual-Comments">
                <div className="Posted-Comments">
                    <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
                    <div>
                        <p className="Commented-User"> Fake User</p>
                        <p className="Comment">Nice Pic</p>

                    </div>
                    
                </div>
            </div>
            <div className="Comment-Form ">
                <input type="text" />
                <button>Comment</button>
            </div>
        </div>):""}
        <video onClick={(e)=>{
            if(playing){
                e.currentTarget.pause();
                setPlaying(false);
            }else{
                e.currentTarget.play();
                setPlaying(true);
            }
        }} loop src={props.data.url}  className="Video-Card-Video"></video>
    </div>);
}
export default VideoCard;