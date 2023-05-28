/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import AddIcon from '@mui/icons-material/Add';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import DisplayPendingTodos from "./DisplayPendingTodos/DisplayPendingTodos";

// import Todos from "./Utils/Data";

import "./TodoApp.css";

const TodoApp = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState(null);
    const [obj, setObj] = useState({ task: "", color: "#000" });
    const [data, setData] = useState([]);
    const [isValid, setIsValid] = useState(false);

     const setLocalTodos= (todos) => localStorage.setItem("TodoData", JSON.stringify(todos));
     const getLocalTodos= () => JSON.parse(localStorage.getItem("TodoData"));

    useEffect(() => {
        let todos = getLocalTodos();
        todos && setData(todos)
        // console.log(data);
    }, []);
    
    useEffect(() => {
        setLocalTodos(data);
        console.log(data)
    }, [data]);
    

    const handleChange = (e) => {
        e.preventDefault();
        if(obj.task === "" || obj.task === null || obj.task === undefined) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }

        const { value, name } = e.target;
        setObj({ ...obj, [name]: value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        // console.log(obj)

        if (obj.task === undefined || obj.task === "" ) {
            toast.error("Enter task & Select Color");
            return;
        }
        if (obj.color === "#000" || obj.color === "#000000") {
            toast.error("Select Color other than Black for better visibility");
            return;
        }
        
        if (isEdit) {
            // console.log(obj);
            data.filter((item) => {
                if (id === item.id) {
                    item.task = obj.task;
                    item.color = obj.color;
                    item.date = new Date().toLocaleString();
                    // console.log(item)
                    // console.log(data)
                }
                setData(data);
                setLocalTodos(data)
            });
            toast.success("Updated Successfully!");
            // console.log(newData);
            setIsEdit(false);
            setId(null);
        } else {
            // console.log(obj);
            let { task, color } = obj;
            color = color ? color : "#0ff";
            setData([
                ...data,
                {
                    task,
                    color,
                    id: Math.random(),
                    isCompleted: false,
                    date: new Date().toLocaleString(),
                },
            ]);
            
            toast.success("Added Successfully!");
        }
        setObj({ task: "", color: "#000" });
        setIsValid(false);
    };

    const handleDelete = (ind) => {
        // console.log(ind);
        setIsEdit(false);
        let newData = data.filter((item) => item.id !== ind);
        // console.log(newData);
        setData(newData);
        setObj({ task: "", color: "#000" });
        toast.success("Deleted Successfully!");
    };
    
    const handleComplete = (item, ind) => {setObj({ task: "", color: "#000" })
        setIsEdit(false);
        console.log(item);
        data.map((item) => {
            if (item.id === ind) {
                item.isCompleted = true;
                item.date = new Date().toLocaleString();
            }
        });
        // console.log(data)
        setObj({ task: "", color: "#000" });
        setLocalTodos(data);
        toast.success("Completed Successfully!");
    };

    const handleEdit = (item, ind) => {
        // console.log(item)
        setIsEdit(true);
        const { task, color } = item;
        setObj({ ...obj, task, color });
        setId(ind);
    };


    return (
        <div className="maincontainer">
            <div className="inputcontainer">
                <input
                    type="text"
                    name="task"
                    id="task"
                    value={obj.task}
                    placeholder="Enter task"
                    onChange={handleChange}
                />
                <input
                    type="color"
                    name="color"
                    id="color"
                    value={obj.color}
                    onChange={handleChange}
                />
                <button onClick={handleClick} style={{ "--i": "#d63384" }} disabled={!isValid}>
                    {isEdit ? <SyncAltIcon /> : <AddIcon />}
                </button>
            </div>

            <div className="outputcontainer">
                <DisplayPendingTodos
                    data={data}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleComplete={handleComplete}
                    title="Pending"
                />
                <DisplayPendingTodos
                    data={data}
                    handleDelete={handleDelete}
                    title="Completed"
                />
            </div>
            <ToastContainer
                theme="colored"
                position="bottom-right"
                style={{ fontSize: "14px" }}
                autoClose={2000}
            />
        </div>
    );
};

export default TodoApp;
