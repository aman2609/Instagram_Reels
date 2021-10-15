import { useContext } from "react";
import {signInWithGoogle} from "../firebase";
import {authContext} from "../AuthProvider" ;
import { Redirect } from "react-router-dom";
let Login=()=>{
    let user=useContext(authContext)
    return( 
    <>
        {user?<Redirect to="/" />:""}
        <button onClick={()=>{signInWithGoogle();}} type="button" className="btn btn-secondary m-4">Login</button>
        
    </>);

}
export default Login;