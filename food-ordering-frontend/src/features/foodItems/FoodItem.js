import { useState } from "react"
import { useDispatch } from 'react-redux'
import { useAddFoodItemToCurrentOrderMutation } from '../orders/orderApiSlice';
import { setOrder } from '../orders/orderSlice'
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const FoodItem = ({foodItem, setFakeLoading, setAddedOrderItem}) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch()
    const [addOrder, result] = useAddFoodItemToCurrentOrderMutation()

 
    const handleSubmit = async (e, foodItemId, quantity) => {
        e.preventDefault()
        console.log("foodItem: ", foodItem )
        try {
            setFakeLoading(true)
            setAddedOrderItem({
                foodItemName: foodItem.name,
                quantity
            })
            setTimeout(() => {setFakeLoading(false)}, 500)
            const order = await addOrder({ foodItemId, quantity }).unwrap()
            dispatch(setOrder(order))
        } catch (err) {

        }
    }
    return <>
        <Grid xs={4} sm={4} md={4} key={foodItem.id}>
            <Card sx = {{ mt:4,
                minHeight:'220',
                maxHeight:'220',
                ':hover': {
                    boxShadow: 5, // theme.shadows[20]
                  },
                }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={`/foodImages/${foodItem.imageUrl}`}
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {foodItem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {foodItem.description.substring(0, 120)} {foodItem.description.length >= 120 && '...'}
                    </Typography>
                </CardContent>
                <CardActions>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end',
                        width: '100vw',
                        mt:2,
                        pr:2,
                        pb:2
                    }}>
                        <Box>
                            <Button 
                                size="small"
                                onClick={(e) => quantity > 1? setQuantity(quantity - 1): ()=>{} }>
                                    -
                            </Button>
                                {quantity}
                            <Button 
                                size="small"
                                onClick={(e) => setQuantity(quantity + 1)}>
                                    +
                            </Button>
                        </Box>
                        <Button 
                            size="medium"
                            variant="contained"
                            onClick={(e) => handleSubmit(e, foodItem.id, quantity)}>
                                Add To Order
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    </>
}
export default FoodItem