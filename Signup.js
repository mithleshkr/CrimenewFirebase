import React,{useState} from 'react'
import { Grid , Paper, Avatar, Typography, TextField, Button} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { auth } from '../firebase';


function Signup()  {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const pushauth = () => {
        auth.createUserWithEmailAndPassword(email,password).then(result=>{console.log(result)},error=>(alert(error)));
    }
   

    const paperstyle={padding:20, width:300, margin:'0 auto'}
    const headerstyle={margin:0}
    const avatarstyle={backgroundColor:'blue'}
    return (
        
        <Grid>
            <Paper  style={paperstyle}>
                <Grid align="center">
                    <Avatar style={avatarstyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                
                <h2 style={headerstyle}>Sign Up</h2>
                <Typography variant='caption'>Please fill this form to create an account</Typography>
                </Grid>
                <form style={{display:"flex",justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
                    
                    <TextField
                     fullWidth
                      label="Email"
                       placeholder="Enter your email"
                        type="email"
                         required
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                         />
                    <TextField
                     fullWidth
                      label="Password"
                       placeholder="Enter your password"
                        type="password"
                         required
                         value={password}
                         onChange={(e)=>setPassword(e.target.value)}
                         />
                         <TextField fullWidth label="Name" placeholder="Enter your name" required />
                    
                    <br/>
                    <Button type="button" variant="contained" color="primary" 
                    onClick={pushauth} >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Grid>
        
    )
}

export default Signup
