import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {Search, Person, Chat, Notifications,ExitToApp,Delete} from '@material-ui/icons'
import './Profile.css'
import { db } from '../firebase';
import profile from '../profile.png'
import cover from '../cover.png'

//import firebase from 'firebase';

//import {deleteDoc} from "firebase/firestore"

//import { uid } from 'uid';
//import { Dialog, DialogTitle, TextField,Button } from '@material-ui/core';
//import LogoutIcon from '@material-ui/icons/Logout';

const Timeline =()=> {
    const navigate = useNavigate();
     
    
   // const [image, setImage] = useState(null);

    
    
    
    const [info, setInfo] = useState([]);
    useEffect(()=>{
        Fetchdata();
    },[]);
    // window.addEventListener('load', () => {
    //     Fetchdata();
    //   });
      function Fetchdata() {
          db.collection("post")
          .get()
          .then((snapshot)=>{
              if(snapshot.docs.length){
                  snapshot.docs.forEach((doc)=>{
                      setInfo((prev)=>{
                          return[...prev,{data:doc.data(),id:doc.id}];
                      });
                  });
              }
          });
          console.log(info);
      }
    //   const Fetchdata = ()=>{
    //     db.collection("post").get().then((querySnapshot) => {
            
             
            
    //         querySnapshot.forEach(element => {
    //             var data = element.data();
    //             setInfo(arr => [...arr ,data]);
                  
    //         });
    //     })
    // }
    //  const deletePost =  (id) =>  {
    //     const projectRef = firebase.database().ref(`/post/${id}`)
    //     projectRef.remove()
    //  }
    const deletePost = (id) => {
        db.collection('post').doc(id).delete()

    }
     

    // const  deletePost = async (id) => {
    //     const docRef = doc(db, "post",id);
    //     await deleteDoc(docRef);
    // };

    // const handleDelete = () => {
    //     console.log(info.id);

    // }

    return (
        <div>
            <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">CrimeAlert</span>
            </div>
                <div className="topbarCenter">
                    <div className="searchbar">
                        <Search className="searchIcon" />
                        <input placeholder="Search for post" className="searchInput" />
                    </div>
                </div>
                <div className="topbarRight">
                    <div className="topbarLinks">
                        <span className="topbarLink" onClick={()=> navigate('/home')} > Home</span>
                        <span className="topbarLink" > Timeline</span>
                    </div>
                    <div className="topbarIcons">
                        <div className="topbarIconItems">
                            <Person />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItems">
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </div>
                        <div className="topbarIconItems">
                            <Notifications />
                            <span className="topbarIconBadge">3</span>
                        </div>
                        <div className="topbarIconItems" style={{color:"black"}}>
                            <ExitToApp onClick={()=>navigate("/")} />
                            <span style={{fontSize:"16px",color:"white"}}>Logout</span>
                            
                            
                        </div>
                    </div>
                    
                    

                </div>  
            </div>
            {/* Profile code */}
            <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={cover}
                alt=""
              />
              <img
                className="profileUserImg"
                src={profile}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Mithlesh Kumar</h4>
                
            </div>
          </div>
          <div className="profileRightBottom">
            {/* <Feed />
            <Rightbar profile/> */}
          </div>
        </div>
        {
            info.map((post) => (
            
      
         <div className='post'style={{overflow:"auto"}} >
            <ul style={{listStyleType:"none"}}>
          <li style={{textAlign:"center"}}>{post.data.about}<span style={{display:"flex",justifyContent:"flex-end",color:"red"}}><button onClick={()=>deletePost(post.id)}><Delete   /></button></span></li>
          <li><img src={post.data.imgurl} height="400px" width="500px"  alt="" /></li>
          <li style={{textAlign:"center",justifyContent:"space-evenly"}}><span>{post.data.date}</span> &nbsp;&nbsp;&nbsp; <span>{post.data.time}</span> &nbsp;&nbsp;&nbsp;    <span>{post.data.location}</span> &nbsp;    </li>
          
          </ul>
         </div>
    
            ))
}
        </div>
    )
}

export default Timeline
