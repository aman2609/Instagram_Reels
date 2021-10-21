import { useContext } from "react";
import { Redirect } from "react-router";
import { authContext } from "../AuthProvider";
import {auth, firestore, storage} from "../firebase";
import "./Home.css"
import VideoCard from "./videoCard"
let Home=()=>{
    let user=useContext(authContext);
    console.log(user);
    return (
    <>
        
        {user?"":<Redirect to="./Login" />}
        <div className="Video-Container">
         <VideoCard/>
         <VideoCard/>
         <VideoCard/>
         <VideoCard/>
        </div>
        <input type="file" onClick={(e)=>{
            e.currentTarget.value=null;
        }} 
        onChange={(e)=>{
            // console.log(    e.currentTarget.files);
            let videoObj=e.currentTarget.files[0];
            if(videoObj){
                let {name,size,type}=videoObj;
                // console.log(name,size,type);
                size=size/1000000;
                if(size>12){
                    alert("Size Limit Exceeded");
                    return;
                }
                type=type.split("/")[0];
                if(type!=="video"){
                    alert("Please Upload Video File Only");
                    return;
                }
                let uploadTask=storage.ref(`/posts/${user.uid}/${Date.now()+"-"+name}`).put(videoObj);
                uploadTask.on("state_changed",null,null,()=>{
                    uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                        console.log(url);
                        firestore.collection("posts").add({name:user.displayName,url,comment:[],likes:[]})
                    })
                })
            }
        }}/>
            
        <button  onClick={()=>{auth.signOut();}} type="button" className="btn btn-secondary m-4 logout">Logout</button>
    </>
    );
}
export default Home;
// relative to parent 
// absolute to child