import { useState, useEffect } from "react"
import { useGetFoodItemsQuery } from "./foodItemsApiSlice";
import { useGetCurrentOrderQuery } from "../orders/orderApiSlice";
import { useDispatch} from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import FoodItem from './FoodItem.js'
import Loader from '../../components/Loader'
import { setOrder } from '../orders/orderSlice' 
import { setCredit } from '../auth/authSlice' 

const FoodItemsList = () => {
    const {
        data: foodItems,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetFoodItemsQuery()

    const {
        data: order,
    } = useGetCurrentOrderQuery()

    const dispatch = useDispatch()

    const [fakeLoading, setFakeLoading] = useState(true);
    const [{foodItemName, quantity}, setAddedOrderItem] = useState({foodItemName:null , quantity:null});

    // fake loading
    useEffect(() => {
        setFakeLoading(true)
        setTimeout(() => {{setFakeLoading(false)}}, 1000)
        dispatch(setOrder(order))
      }, []);

      useEffect(() => {
        dispatch(setOrder(order))
        let credit = order?.user?.credit == null || order?.user?.credit == undefined  ? 0 : order?.user?.credit
        dispatch(setCredit({credit}))
      }, [order]);

    return <>
            {fakeLoading?
            <Loader isLoading={ true } /> :
            <>
                {foodItemName? 
                <Fade
                    in={ true }
                    timeout={ 1000 }>
                        <Alert severity="success" sx={{ mt:4, p:2 }}>Added {quantity} items of {foodItemName}!</Alert>
                </Fade>:null}
                {(order != null && order?.status != 1)  &&
                    <Alert severity="info" sx = {{ m:1, mt:2, p:2, width:'100%'}}><Typography variant='h6'>There's an order already in progress!</Typography></Alert> 
                }
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {foodItems?.map((item, i) => {
                        return (
                            <FoodItem foodItem = {item} setFakeLoading={setFakeLoading} setAddedOrderItem={setAddedOrderItem} />
                        )
                    })}
                </Grid>
            </>}
        </>

}
export default FoodItemsList