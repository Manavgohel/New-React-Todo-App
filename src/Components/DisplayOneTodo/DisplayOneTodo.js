import React from "react";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import "./DisplayOneTodo.css";

const DisplayOneTodo = ({ item, handleDelete, handleEdit, handleComplete, title, }) => {
    return (
        <>
            <div className="box" style={{ "--i": `${item.color}` }}>
                <div className="toprow">
                    <div className="task">{item.task}</div>
                </div>
                <div className="bottomrow">
                    <div className="task">{item.date}</div>
                </div>
                <div className="button">
                    <button
                        onClick={() => handleDelete(item.id)}
                        style={{ "--i": "#F00" }}
                    >
                        <DeleteIcon />
                    </button>
                    {title === "Pending" && (
                        <>
                            <button
                                onClick={() => handleEdit(item, item.id)}
                                style={{ "--i": "#0dcaf0" }}
                            >
                                <EditIcon />
                            </button>
                            <button
                                onClick={() => handleComplete(item, item.id)}
                                style={{ "--i": "#20c997" }}
                            >
                                <DoneAllIcon />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DisplayOneTodo;
