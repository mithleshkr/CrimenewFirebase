import React,{useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useNavigate} from 'react-router-dom';
import { auth } from '../firebase';


const Login=({handleChange})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const signinauth = () => {
        auth.signInWithEmailAndPassword(email,password).then(result=> navigate('/home'),error=>(alert(error)))
            
        

    }
    


    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'blue'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid >
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField
                 label='Username'
                  placeholder='Enter username'
                   fullWidth
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                <TextField
                 label='Password'
                  placeholder='Enter password'
                   type='password'
                    fullWidth
                     required
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     />
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button onClick={signinauth} disabled={!email + !password} type='button' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                    
                </Typography>
                <Typography > New User ?
                     <Link href="#" onClick={()=>handleChange("event",1)} >
                        Click here to signup
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
