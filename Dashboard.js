import React,{useState,useEffect} from 'react'
import './Dashboard.css'
import './Sidebar.css'
import './Rightbar.css'
import './Post.css'

import {Search, Person, Chat, Notifications,ExitToApp} from '@material-ui/icons'
import {  Button, Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core'
import {  AddCircle } from "@material-ui/icons";
import {db} from '../firebase';
import { storage } from '../firebase'
import {useNavigate} from 'react-router-dom';
//import cover from '../cover.png'
//import Sidebar from './Sidebar'


function Dashboard() {
    const navigate = useNavigate();
    
    //const [pid, setPid] = useState("");
    const [about, setAbout] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);
    //const [imgurl, setImgurl] = useState("");

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

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);

        }
    };

    function pushPost () {
        // db.collection("post").add({
        //     about : about,
        //     time : time,
        //     date : date,
        //     location : location,
            
            
            
        // }).catch(alert("done"));
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot=>{},
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => { db.collection("post").add({imgurl:url,about : about,
                  time : time,
                  date : date,
                  location : location,
                
                })
                  
                });
            }
        )

    }
    console.log("image :", image)

    const [open, setOpen] = React.useState(false);
    

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    //TopBar
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
                        <span className="topbarLink" > Home</span>
                        <span className="topbarLink" onClick={()=> navigate('/timeline')}> Timeline</span>
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
        
        {/* Sidebar code */}
        <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              {/* <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span> */}
            </li>
            
            
            <li className="sidebarListItem">
              {/* <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span> */}
            </li>
            
            <li className="sidebarListItem">
              
              <span className="sidebarListItemText"><Button variant="contained"  onClick={handleClickOpen} style={{}}> <AddCircle
            
            fontSize="large"
             style={{cursor:"pointer"}}
              variant="outlined"
              
              />
              <p>Add Your Post</p>
              </Button></span>
            </li>
            
           
           
          </ul>
          {/* <button className="sidebarButton">Show More</button> */}
          {/* <hr className="sidebarHr" /> */}
          
        </div>
       {/*Middle Post Code */}
       {
            info.map((post) => (
            
    //     
    <div className="post">
        <ul style={{listStyleType:"none"}}>
          <li style={{textAlign:"center"}}>{post.data.about}</li>
          <li><img src={post.data.imgurl} height="400px" width="500px" alt="" /></li>
          <li style={{textAlign:"center"}}><span>{post.data.date}</span> &nbsp;&nbsp;&nbsp; <span>{post.data.time}</span> &nbsp;&nbsp;&nbsp;    <span>{post.data.location}</span></li>
        </ul>
    </div>
    
  
            ))
}
        <div style={{display:"flex",justifyContent:"flex-end",position:"sticky"}}>
          
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post Details</DialogTitle>
        <DialogContent>
            <form>
           <TextField
            label="About Post"
             variant="outlined"
              placeholder="Enter about Post"
              type="text"
              value={about}
              onChange={(e)=>setAbout(e.target.value)}
               fullWidth
                required
                />
                 <br/><br/>
                 <TextField
             variant="outlined"
              type="time"
              value={time}
              onChange={(e)=>setTime(e.target.value)}
               fullWidth
                required
                />
                <br/><br/>
                 <TextField
             variant="outlined"
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
               fullWidth
                required
                />
                <br/><br/>
                 <TextField
                 label="Location"
                 placeholder="Enter location"
                 variant="outlined"
                  type="text"
                  value={location}
                  onChange={(e)=>setLocation(e.target.value)}
                  fullWidth
                   required
                />
                <br/>
                 <TextField
             
              type="file"
            //   value={image}
              onChange={handleImage}
               fullWidth 
                />
                <br/><br/>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Button
                onClick={pushPost}
                 variant="contained"
                  color="primary"
                  type="button"
                  disabled={!about + !date + !time + !location }
                  >
                      Post
                      </Button>
                </div>
                
           </form>
        </DialogContent>
      </Dialog>
        </div>
      </div>
      
        </div>
        
    )
}

export default Dashboard
