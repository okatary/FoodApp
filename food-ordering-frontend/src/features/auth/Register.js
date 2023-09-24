import { useRef, useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useRegisterMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import Loader from '../../components/Loader'
import Image from 'mui-image'

const NAME_REGEX = /^[a-zA-Z0-9]{4,24}/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_-]).{8,24}$/;

const Register = () => {
    const dispatch = useDispatch()
    const nameRef = useRef();
    const emailRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess] = useState(false);
    const [fakeLoading, setFakeLoading] = useState(true);

    const [register, result] = useRegisterMutation()

     // fake loading
     useEffect(() => {
        setFakeLoading(true)
        setTimeout(() => {setFakeLoading(false)}, 1000)
      }, []);

    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])


    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        if (!EMAIL_REGEX.test(email) || !PWD_REGEX.test(password) || ! NAME_REGEX.test(name)) {
            return;
        }
        try {
            const userData = await register({ name, email, password }).unwrap()
            dispatch(setCredentials({ ...userData, email }))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setEmail('');
            setName('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
        }
    }

    return (
        <>
        {fakeLoading? 
            <Loader isLoading={true} />:
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width:'30vw',
                        p: '2rem',
                        m: 1,
                        mt: '4rem',
                        boxShadow: 3,
                        borderRadius: '16px' 
                    }}
                    component="form" 
                    onSubmit={handleSubmit}>
                    
                    <Box sx={{  width:"100%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'}}>
                        <Image 
                            height={150}
                            width={150}
                            fit="contain"
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, pr:4 }}
                            src={'tahalufLogo.png'}/>
                    </Box>

                    <p>{result.error?.data?.status} {result.error?.data?.title}</p>

                    <TextField
                        id="name"
                        label="Name"
                        margin="normal" 
                        error = {!validName && name}
                        variant="outlined"
                        fullWidth
                        ref={nameRef}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                    />
                    {
                        (nameFocus && name && !validName) && <Alert severity="error"  className={name && !validName ? "instructions" : "hide"}> 
                            4 to 24 letters.<br />
                        </Alert>
                    }

                    <TextField
                        id="email"
                        label="Email"
                        margin="normal" 
                        error = {!validEmail && email}
                        variant="outlined"
                        fullWidth
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    {
                        (emailFocus && email && !validEmail) && <Alert severity="error"  className={email && !validEmail ? "instructions" : "hide"}> 
                            Must be a valid email.
                        </Alert>
                    }

                    <TextField
                        type="password"
                        label="Password"
                        margin="normal" 
                        error = {!validPassword && password}
                        variant="outlined"
                        fullWidth
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="passwordnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    {
                    (password && passwordFocus && !validPassword) && <Alert severity="error">
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </Alert>
                    }
                    <TextField
                        type="password"
                        label="Confirm Password"
                        margin="normal" 
                        error = {!validMatch && matchPassword}
                        variant="outlined"
                        fullWidth
                        id="confirm_password"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        value={matchPassword}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    {
                    (matchPassword && matchFocus && !validMatch) && <Alert severity="error">

                        Must match the first password input field.
                    </Alert>
                    }


                    <Box
                    sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                    >
                        <Button 
                            variant="outlined"
                            onClick={(e) => handleSubmit(e)}
                            sx={{ 
                                my: '1rem',
                                width: '8rem'

                            }} 
                            disabled={!validEmail || !validPassword || !validMatch ? true : false}>Sign Up</Button>
                        <Typography>
                            Already registered?                   
                        </Typography>
                        <Link  to="/login">Sign In</Link>
                    </Box>
                </Box>
            </Box>}
        </>
    )
}

export default Register