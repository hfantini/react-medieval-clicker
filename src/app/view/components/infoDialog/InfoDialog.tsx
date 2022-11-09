import "./InfoDialog.scss";
import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const InfoDialog = React.forwardRef( (props:any, ref:any) => 
{
    const onCloseClick = () =>
    {
        if(props.onCloseClick && typeof props.onCloseClick == "function")
        {
            props.onCloseClick();
        }
    }

    return (
        <div ref={ref} className="DIALOG">
            <div className="CONTENT">
                {props.children}
            </div>
            <div className="BOTTOM">
                <IconButton 
                    className="CLOSE-BUTTON"
                    onClick={(e) => onCloseClick()}>
                    <CloseIcon></CloseIcon>
                </IconButton>
            </div>
        </div>
    )
})

export default InfoDialog;