import Lottie from "lottie-react";
import preparingAnimation from "../../animations/preparingAnimation.json";
import readyAnimation from "../../animations/readyAnimation.json";
import pickedUpAnimation from "../../animations/pickedUpAnimation.json";
import completedAnimation from "../../animations/completedAnimation.json";
import { TypeAnimation } from 'react-type-animation';
import { Typography } from "@mui/material";


const OrderStatusAnimation = ({order}) => {

    const statusList = [
        {
            id: 2,
            animation: preparingAnimation,
            text: "Preparing Food..."
        },
        {
            id: 3,
            animation: readyAnimation,
            text: "Ready For Pickup..."
        },
        {
            id: 4,
            animation: pickedUpAnimation,
            text: "Order Is On The Way..."
        },
        {
            id: 5,
            animation: completedAnimation,
            text: "Bon Appetit..."
        },

    ]
    const currentStatusObj = statusList.find( obj => {
        return obj.id === order?.status
      })

    return <>
            {currentStatusObj ?
            <><Lottie
                style = {{
                    height:"30vh"
                }}
                animationData={currentStatusObj.animation}
                loop={true} />
                <Typography variant="h6">{currentStatusObj.text}</Typography>
                </> : <></>}
            </>
}
export default OrderStatusAnimation