import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Image from 'mui-image'
import Typography from '@mui/material/Typography';

const OrderItem = ({orderItem}) => {

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
                        <Typography variant="body1" color="text.primary">
                            {orderItem.quantity} x ${orderItem.foodItem.price}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )

    return content
}
export default OrderItem