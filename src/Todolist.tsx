import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterType, TaskType} from "./App";
import {Input} from "./Components/Input";
import s from "./Todolist.module.css"
import './App.css'

type propsType = {
    id: string
    title13: string,
    tasks: Array<TaskType>
    filter: filterType
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: filterType, todoListID: string) => void
    addTasks: (title: string, todoListID: string) => void
    changeStatus: (checked: boolean, id: string,  todoListID: string) => void
    removeTodoList: (todoListID:string)=>void
}


export const Todolist = (props: propsType) => {
    const removeTaskHandler = (tId: string, todoListID: string) => {
        props.removeTask(tId, todoListID)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, tId: string, todoListID: string) => {
        props.changeStatus(e.currentTarget.checked, tId, todoListID)
    }
    const taskList = props.tasks.map(t => {

        return (
            <li
                className={t.isDone?"isDone":""}
                key={t.id}>
                <button onClick={()=>removeTaskHandler(t.id, props.id)}>X</button>
                <input onChange={(e) => onChangeHandler(e, t.id, props.id)} type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
            </li>
        )
    })

    let [title, setTitle] = useState('')

    const changeFilterHandlerAll = () => {
        return (props.changeFilter('All', props.id))
    }
    const changeFilterHandlerActive = () => {
        props.changeFilter('Active', props.id)
    }
    const changeFilterHandlerCompleted = () => {
        props.changeFilter('Completed', props.id)
    }

    const addTaskHandler = () => {
        props.addTasks(title, props.id)
        setTitle('')
    }
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const allBtnClass = props.filter ==="All"?"activeFilter":""
    const activeBtnClass = props.filter ==="Active"?"activeFilter":""
    const completedBtnClass = props.filter ==="Completed"?"activeFilter":""
    return (
        <div>
            <div>
                <button onClick={removeTodoListHandler}>X</button>
                <h3>{props.title13}</h3>
            </div>

            <Input callBack={addTaskHandler} title={title} setTitle={setTitle}/>
            <button onClick={addTaskHandler}>+</button>
            <ul>
                {taskList}
            </ul>
            <div>
                <button className={allBtnClass} onClick={changeFilterHandlerAll}>All</button>
                <button className={activeBtnClass} onClick={changeFilterHandlerActive}>Active</button>
                <button className={completedBtnClass} onClick={changeFilterHandlerCompleted}>Completed</button>




            </div>
        </div>
    )
}