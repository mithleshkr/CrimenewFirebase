import React from 'react'
import {useNavigate} from 'react-router-dom';
import {Search, Person, Chat, Notifications,ExitToApp} from '@material-ui/icons'
//import LogoutIcon from '@material-ui/icons/Logout';

function Timeline() {
    const navigate = useNavigate();

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
            
        </div>
    )
}

export default Timeline
