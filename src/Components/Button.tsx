import React from "react";
import s from "./Button.module.css";
import {filterType} from "../App";

type PropsType = {
    title: string,
    callBack: ()=>void
    class: string
}

export const Button = (props: PropsType) => {
    const callBackHandler =()=> {
        return props.callBack()
    }

    return (

        <button className={props.class}
            onClick={callBackHandler}>{props.title}
        </button>
    )
}