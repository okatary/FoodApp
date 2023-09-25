import { useGetCurrentOrderQuery, useLazyCheckoutOrderQuery } from "./orderApiSlice";
import { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import OrderItem from './OrderItem'
import OrderStatusAnimation from './OrderStatusAnimation'
import Loader from '../../components/Loader'
import { setCredit } from '../auth/authSlice' 
import { setOrder } from './orderSlice' 

const Order = () => {
    const {
        data: order,
        refetch,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCurrentOrderQuery()

    const dispatch = useDispatch()
    const [ triggerCheckout, checkedoutOrder ] = useLazyCheckoutOrderQuery()
    const [isInsufficientCredit, setInsufficientCredit] = useState(false);
    const [fakeLoading, setFakeLoading] = useState(true);

    //refetch every time interval
    useEffect(() => {
        setFakeLoading(true)
        setTimeout(() => {setFakeLoading(false)}, 1000)
        const interval = setInterval(() => {
            refetch()
            dispatch(setOrder(order))
        }, 2000);
        return () => {
            clearInterval(interval);
           };
      }, []);

      useEffect(() => {
        let credit = order?.user?.credit == null || order?.user?.credit == undefined  ? 0 : order?.user?.credit
        dispatch(setCredit({credit}))
      }, [order]);

      const orderCheckoutHandler = () => {
        if(order.user.credit < order.totalCost){
            setInsufficientCredit(true);
        }
        else{
            setInsufficientCredit(false);
            triggerCheckout()
            refetch()
            dispatch(setCredit( {credit: order?.user?.credit - order.totalCost} ))
            setFakeLoading(true)
            setTimeout(() => {setFakeLoading(false)}, 1000)
        }
      }

        return (
            <>
            { (isLoading || fakeLoading) ?
                <Loader isLoading={ true } />:
                <Container sx={{
                    my:5,
                }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100vw'
                        }}>
                            <OrderStatusAnimation order = {order}/>
                        </Box>
                        {isInsufficientCredit?
                                <Alert 
                                    sx={{width:"100%", mx: 1, mb: 4, p:2}}
                                    severity="error">
                                        Woops, your credit seems to be insufficient!
                                </Alert>: null}
                        {order?.orderItems.map((item, i) => {
                            return (
                                <OrderItem orderItem={item} setFakeLoading={setFakeLoading} orderStatus={order?.status}/>    
                            )
                        })}

                        {order?.orderItems.length == 0 &&
                            <Alert severity="info" sx = {{ m:1, p:2, width:'100vw'}}><Typography variant='h6'>Cart is Empty!</Typography></Alert> 
                        }
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'end',
                            width: '100vw',
                            mt:2
                        }}>
                            
                            <Typography variant="h5" color="text.primary">
                                    Total: ${order?.totalCost}
                            </Typography>
                            {(order?.status == 1 && order?.orderItems?.length > 0) ? 
                            <Button 
                                size="large"
                                variant="contained"
                                sx={{mt:2}}
                                onClick={(e) => orderCheckoutHandler()}
                                >
                                Checkout Order
                            </Button>:null}
                        </Box>
                    </Grid>
                </Container>}
            </>
        )
}
export default Order