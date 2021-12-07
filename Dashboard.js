import React,{useState} from 'react'
import './Dashboard.css'
import './Sidebar.css'
import './Rightbar.css'
import {Search, Person, Chat, Notifications} from '@material-ui/icons'
import {  Button, Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core'
import { RssFeed, AddCircle, Group, HelpOutline } from "@material-ui/icons";
import {db} from '../firebase';
import { storage } from '../firebase'
  
//import Sidebar from './Sidebar'


function Dashboard() {

    const [about, setAbout] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);

        }
    };

    function pushPost () {
        db.collection("post").add({
            about : about,
            time : time,
            date : date,
            location : location,
            
            
        }).catch(alert("done"));
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
                .then(url => { console.log("uploaded")

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
                        <span className="topbarLink"> Home</span>
                        <span className="topbarLink"> Timeline</span>
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
                        
                    </div>
                    
                    

                </div>  
            
        </div> 
        {/* Sidebar code */}
        <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
            
            
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span>
            </li>
            
            <li className="sidebarListItem">
              <HelpOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Questions</span>
            </li>
            
           
           
          </ul>
          {/* <button className="sidebarButton">Show More</button> */}
          {/* <hr className="sidebarHr" /> */}
          
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:-150,marginRight:30}}>
           <Button variant="contained"  onClick={handleClickOpen}> <AddCircle
            
              fontSize="large"
               style={{cursor:"pointer"}}
                variant="outlined"
                
                />
                Add Your Post
                </Button>
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
