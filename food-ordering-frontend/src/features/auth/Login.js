import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Loader from '../../components/Loader'
import Image from 'mui-image'
import Alert from '@mui/material/Alert';

const Login = () => {
    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const emailRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, result] = useLoginMutation()
    const dispatch = useDispatch()
    const [fakeLoading, setFakeLoading] = useState(true);

    // fake loading
    useEffect(() => {
        setFakeLoading(true)
        setTimeout(() => {setFakeLoading(false)}, 1000)
      }, []);

    useEffect(() => {
        emailRef.current?.focus()
    }, [])
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(password.length >= 8);
    }, [password])
    
    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ email, password }).unwrap()
            console.log("userData", userData)
            dispatch(setCredentials({ ...userData, email }))
            setEmail('')
            setPassword('')
            navigate('/')
        } catch (err) {
            console.log("err", err)
            if (!err?.status) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response!');
            } else if (err.status === 400) {
                setErrMsg('Wrong Email or Password!');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized!');
            } else {
                setErrMsg('Login Failed!');
            }
            errRef.current?.focus();
        }
    }

    const handleEmailInput = (e) => setEmail(e.target.value)

    const handlePasswordInput = (e) => setPassword(e.target.value)

    return <>
    {result.isLoading || fakeLoading?
        <Loader isLoading={true} />:
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            {
                    (errMsg) && <Alert severity="error" sx={{ mt:'2rem', width:'32vw', mb:'-2rem'}}> 
                        {errMsg}
                    </Alert>
                }
            <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width:'30vw',
                        p: '2rem',
                        pb: '4rem',
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

            <TextField
                    id="email"
                    label="Email"
                    margin="normal" 
                    variant="outlined"
                    error = {!validEmail && email}
                    fullWidth
                    ref={emailRef}
                    onChange={handleEmailInput}
                    value={email}
                    required
                />
                {
                    (email && !validEmail) && <Alert severity="error"  className={email && !validEmail ? "instructions" : "hide"}> 
                        Must be a valid email.
                    </Alert>
                }

                <TextField
                    type="password"
                    label="Password"
                    error = {!validPassword && password}
                    margin="normal" 
                    variant="outlined"
                    fullWidth
                    id="password"
                    onChange={handlePasswordInput}
                    value={password}
                    required
                />
                 {
                    (password && !validPassword) && <Alert severity="error">
                       Has to be 8 characters or more.<br />
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
                            disabled={!(email && validEmail) || !(password && validPassword) ? true : false}>Login</Button>
                    <Typography>
                        Sign up new account?                   
                    </Typography>
                    <Link to="/register">Sign up</Link>
                </Box>
            </Box>
        </Box>}
    </>

}
export default Login