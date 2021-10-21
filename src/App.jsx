import {BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import AuthProvider from "./AuthProvider";
// import { useEffect } from "react";
// import { firestore } from "./firebase";
function App() {
  // useEffect(()=>{
  //   // add
  //   // firestore.collection("users").add({body:"this is value 2"});

  //   // get
  //   // async function f(){
  //   //   let querySnapshot=await firestore.collection("users").get();
  //   //   // console.log(querySnapshot);
  //   //   for(let i=0;i<querySnapshot.docs.length;i++){
  //   //     console.log(querySnapshot.docs[i]);
  //   //   }
  //   // }
  //   // f();
  //   // get particular
  //   let f=async ()=>{
  //     // gives reference of te document
  //     let docref=firestore.collection("users").doc("pGzHoAohoilFl1RqF5VO");
  //     // gives us the actual document (get()) & await since get is promse based function
  //     let document=await docref.get();
  //     console.log(document.data());
  //   }
  //   f();
  // },[]);


  return (
    <>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/Login">
                <Login/>
              </Route>
              <Route exact path="/">
                <Home/>
              </Route>
            </Switch>
          </Router>
      </AuthProvider>
    </>
  );
}

export default App;
