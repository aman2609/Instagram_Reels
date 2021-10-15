import { useContext } from "react";
import { Redirect } from "react-router";
import { authContext } from "../AuthProvider";
import {auth} from "../firebase";
let Home=()=>{
    let user=useContext(authContext);
    return (
    <>
        {user?"":<Redirect to="./Login" />}
        <h2>Home</h2>
        <button onClick={()=>{auth.signOut();}} type="button" className="btn btn-secondary m-4">Logout</button>
    </>
    );
}
export default Home;