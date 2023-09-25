import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Image from 'mui-image'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAddFoodItemToCurrentOrderMutation, useSubtractFoodItemToCurrentOrderMutation } from './orderApiSlice';

const OrderItem = ({orderItem, orderStatus, setFakeLoading}) => {


    const [addOrder, orderAfterAdding] = useAddFoodItemToCurrentOrderMutation()
    const [subtractOrder, orderAfterSubracting] = useSubtractFoodItemToCurrentOrderMutation()

    const handleAdd = async (e, foodItemId) => {
        await addOrder({ foodItemId, quantity: 1 }).unwrap()
        setFakeLoading(true)
        setTimeout(() => {setFakeLoading(false)}, 1000)
    }
    
    const handleSubtract = async (e, foodItemId) => {
        await subtractOrder({ foodItemId, quantity: 1 }).unwrap()
        setFakeLoading(true)
        setTimeout(() => {setFakeLoading(false)}, 1000)
    }

    const content = (
        <Grid container  xs={12}>
            <Card sx = {{ m:1, p:2, width:'100vw'}}>
                <Grid container  xs={12}>
                    <Grid xs={2} display="flex"  justifyContent="center" alignItems="center">
                        <Image 
                            height={150}
                            fit="contain"
                            sx={{ pr:4 }}
                            src={`/foodImages/${orderItem.foodItem.imageUrl}`}/>
                    </Grid>
                    <Grid xs={8} sx={{p:2} }>
                        <Typography gutterBottom variant="h5" component="div">
                            {orderItem.foodItem.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {orderItem.foodItem.description.substring(0, 300)} {orderItem.foodItem.description.length >= 300 && '...'}
                        </Typography>
                    </Grid>
                    <Grid xs={2} display="flex"  justifyContent="center" alignItems="center">
                        <Box sx={{
                             display: 'row',
                             flexDirection: 'column',
                             alignItems: 'end',
                             width: '100vw',
                             mt:2
                        }}>
                            {(orderStatus && orderStatus == 1) && <>
                                <Button 
                                    size="small"
                                    onClick={(e) => handleSubtract(e, orderItem.foodItem.id)}>
                                        -
                                </Button>
                                    {orderItem?.quantity}
                                <Button 
                                    size="small"
                                    onClick={(e) => handleAdd(e, orderItem.foodItem.id)}>
                                        +
                                </Button>
                            </>}
                            <Typography variant="body1" color="text.primary">
                                {orderItem.quantity} x ${orderItem.foodItem.price}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )

    return content
}
export default OrderItem