import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type filterType = "All" | "Active" | "Completed"
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListType = {
    id: string
    title: string
    filter: filterType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "All"},
        {id: todoListID_2, title: "What to buy", filter: "Active"}
    ])
    const [tasks, setTasks1] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'beer', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'bread', isDone: false},
        ]

    })

    const addTask = (title: string, todoListID: string) => {
        if (title.trim() != '') {
            let newTask: TaskType = {id: v1(), title: title.trim(), isDone: true};
            setTasks1({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
        }


    }
    const removeTasks = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(ft => ft.id !== taskID)
        setTasks1({...tasks})
    }
    const changeFilter = (value: filterType, todoListID: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, filter: value} : t))
    }
    const changeStatus = (checked: boolean, id: string, todoListID: string) => {
        setTasks1({
            ...tasks,
            [todoListID]: tasks[todoListID].map(f => f.id === id ? {...f, isDone: checked} : f)
        })
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = () => {
        let newTlID = v1();
        setTodoLists([...todoLists, {id: newTlID, title: "What to learn", filter: "All"}])
        setTasks1({...tasks, [newTlID]:[]})
    }


    const todoListsComponents = todoLists.map(tl => {
        let durshlak = tasks[tl.id]
        if (tl.filter === "Active") {
            durshlak = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "Completed") {
            durshlak = tasks[tl.id].filter(t => t.isDone)
        }
        return (
            <Todolist
                key={tl.id}
                id={tl.id}
                title13={tl.filter}
                filter={tl.filter}
                tasks={durshlak}
                removeTask={removeTasks}
                changeFilter={changeFilter}
                addTasks={addTask}
                changeStatus={changeStatus}
                removeTodoList={removeTodoList}

            />)

    })
    return (
        <div className="App">
            {todoListsComponents}
            <button onClick={addTodoList}>Add TL</button>
        </div>
    );
}

export default App;
