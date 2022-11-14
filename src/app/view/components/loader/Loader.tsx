import './Loader.scss';
import React from 'react';
import loader from "./assets/loader.svg"

function Loader(props:any) 
{
    return (
        <img src={loader} style={ {width: props.width, height: props.height} } />
    )
}

export default Loader;
