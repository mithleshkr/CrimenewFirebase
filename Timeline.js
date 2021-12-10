import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {Search, Person, Chat, Notifications,ExitToApp,Delete} from '@material-ui/icons'
import './Profile.css'
import { db } from '../firebase';
import profile from '../profile.png'
import cover from '../cover.png'

//import { uid } from 'uid';
//import { Dialog, DialogTitle, TextField,Button } from '@material-ui/core';
//import LogoutIcon from '@material-ui/icons/Logout';

function Timeline() {
    const navigate = useNavigate();
    // const id =uid();
    
   // const [image, setImage] = useState(null);

    
    
    
    const [info, setInfo] = useState([]);
    window.addEventListener('load', () => {
        Fetchdata();
      });
      const Fetchdata = ()=>{
        db.collection("post").get().then((querySnapshot) => {
            
             
            
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr ,data]);
                  
            });
        })
    }
    // const deletePost =  (pid) =>  {
    //     db.collection("post").doc(pid).delete().then(() => {
    //        alert(pid);
    //     }).catch((error) => {
    //         alert(error);
    //     });
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
            
      //   <div className="post">
            
      // <div className="postWrapper">
         
      //   <div className="postTop">
      //     <div className="postTopLeft">
      //     {/* <img
      //         className="postProfileImg"
      //         src=""
      //         alt=""
      //       />
      //       <span className="postUsername">
      //         username
      //       </span> */}
      //       <span className="postDate">{post.date}</span>
      //       <span className="postDate">{post.time}</span>
      //       <span className="postDate">{post.location}</span>
      //       </div>
      //       </div>
            
      //     <div className="postTopRight">
      //       {/* <MoreVert /> */}
            
      //     </div>
      //   </div>
      //   <div className="postCenter">
      //     <span className="postText">{post.about}</span>
      //     <img src={post.imgurl} alt="" />
          
          

      //     {/* <img className="postImg" src="post pic" alt="" /> */}
      //   </div>
      //   <div className="postBottom">
      //     <div className="postBottomLeft">
          
      //       {/* <span className="postLikeCounter">like</span> */}
      //     </div>
      //     <div className="postBottomRight">
      //       {/* <span className="postCommentText"> comments</span> */}
      //     </div>
        
      //     </div>
          // <div style={{display:"flex",marginLeft:200}}>
         <div className='post'style={{overflow:"auto"}}>
            <ul style={{listStyleType:"none"}}>
          <li style={{textAlign:"center"}}>{post.about}<span style={{display:"flex",justifyContent:"flex-end",color:"red"}}><Delete  onClick={db.collection("post").doc(post.pid).delete()} /></span></li>
          <li><img src={post.imgurl} height="400px" width="500px"  alt="" /></li>
          <li style={{textAlign:"center",justifyContent:"space-evenly"}}><span>{post.date}</span> &nbsp;&nbsp;&nbsp; <span>{post.time}</span> &nbsp;&nbsp;&nbsp;    <span>{post.location}</span> &nbsp;    </li>
          
          </ul>
         </div>
    //</div>
            ))
}
        </div>
    )
}

export default Timeline
