import { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider";
import { firestore } from "../firebase";
import "./VideoCard.css"
// posts collection in props
let VideoCard=(props)=>{
    let user=useContext(authContext);
    console.log(props.data);
    let currUserLiked;
    if(user){
        currUserLiked=props.data.likes.includes(user.uid);
    }
    let [playing,setPlaying]=useState(false);
    let [commentBox,setCommentBox]=useState(false);
    // console.log(user);
    
    let [currUserComment, setCurrUserComment]=useState("");
    let [comment,setComment]=useState([]);
    useEffect(()=>{
        let f=async ()=>{
            let commentArr=props.data.comment;
            // console.log("received from props");
            // console.log(commentArr);
            let arr=[];
            for(let i=0;i<commentArr.length;i++){
                let commentDoc=await firestore.collection("comments").doc(commentArr[i]).get();
                arr.push(commentDoc.data());
            }
            setComment(arr);
        }
        f();

    },[props])

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
        <span onClick={()=>{
            let likesArr=props.data.likes;
            if(currUserLiked){
                likesArr=likesArr.filter((el)=>el!=user.uid);
                // likes array se htao agar liked hai aur phir bhi click kia
            }else{
                likesArr.push(user.uid);
                // likesarray mein push kro agar liked nhi hai aur phir bhi click kia
            }
            firestore.collection("posts").doc(props.data.id).update({likes:likesArr})
        }} className="material-icons-round Video-Card-Like">{currUserLiked?"favorite":"favorite_border"}</span>
        {commentBox?
        (<div className="Video-Card-Comment-Box">
            <div className="Actual-Comments">
                {/* {console.log(comment)} */}
                {comment.map((el)=>{
                    // console.log(1);
                    return(
                        <div className="Posted-Comments">
                            <img src={el.photo} />
                            <div>
                                <p className="Commented-User"> {el.name}</p>
                                <p className="Comment">{el.comment}</p>

                            </div>
                        </div>
                    )
                })}


                
            </div>
            <div className="Comment-Form ">
                <input type="text" onChange={(e)=>{
                    setCurrUserComment(e.currentTarget.value);
                }} value={currUserComment} />
                <button 
                onClick={async ()=>{
                    let docRef=await firestore.collection("comments").add({
                    name:user.displayName,
                    comment:currUserComment,
                    photo:user.photoURL,
                    })
                    setCurrUserComment("");
                    let doc=await docRef.get();
                    let commentId=doc.id;
                    // commentId id of comment in collection comments
                    let postDoc=await firestore.collection("posts").doc(props.data.id).get();
                    // console.log(postDoc.data());
                    let postCommentArr=postDoc.data().comment;
                    postCommentArr.push(commentId);
                    // console.log(postCommentArr);
                    await firestore.collection("posts").doc(props.data.id).update({comment:postCommentArr})
                }}
                >Comment</button>
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
        }} loop src={props.data.url }  className="Video-Card-Video"></video>
    </div>);
}
export default VideoCard;