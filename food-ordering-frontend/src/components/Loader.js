import Backdrop from '@mui/material/Backdrop';

const Loader = ({isLoading}) => {
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
    >
        <img src={'tahalufLogo.png'} className="App-logo" alt="logo"/>
    </Backdrop>
}

export default Loader