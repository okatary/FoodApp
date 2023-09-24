import { useState, useEffect } from "react"
import { useGetFoodItemsQuery } from "./foodItemsApiSlice";
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import FoodItem from './FoodItem.js'
import Loader from '../../components/Loader'

const FoodItemsList = () => {
    const {
        data: foodItems,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetFoodItemsQuery()

    const [fakeLoading, setFakeLoading] = useState(true);
    const [{foodItemName, quantity}, setAddedOrderItem] = useState({foodItemName:null , quantity:null});

    // fake loading
    useEffect(() => {
        setFakeLoading(true)
        setTimeout(() => {{setFakeLoading(false)}}, 1000)
      }, []);

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