import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './input.module.css'

type InputPropsType = {
    callBack: (title: string) => void
    title: string
    setTitle: (title:string)=>void
}

export const Input = (props: InputPropsType) => {
    let [error, setError] = useState(false)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callBack(props.title)
            props.setTitle('')
            setError(true)
        }
    }

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        props.setTitle(e.currentTarget.value)
    }


    return (
        <div>
            <input
                className={error?s.error:s.errorMessage}
                value={props.title}
                onChange={onchangeHandler}
                onKeyPress={onKeyPressHandler}/>
            {error&&<div className={s.errorMessage}>Title is required</div>}
            {/*<button onClick={addTaskHandler}>+</button>*/}
        </div>)
}