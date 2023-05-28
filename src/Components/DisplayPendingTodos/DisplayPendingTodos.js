/* eslint-disable array-callback-return */
import React from "react";

import DisplayOneTodo from "../DisplayOneTodo/DisplayOneTodo";

import "./DisplayPendingTodos.css";

const DisplayPendingTodos = ({ data, handleDelete, handleEdit, handleComplete, title, }) => {
    return (
        <div className="todocontainer">
            <h4
                className="heading"
                style={{ "--i": `${title === "Completed" ? "#0f0" : "#f00"}` }}
            >
                {title} Tasks
            </h4>
            <div className="container">
                {data.reverse()?.map((item, index) => {
                    if (title === "Pending") {
                        if (!item.isCompleted) {
                            return (
                                <DisplayOneTodo
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    handleComplete={handleComplete}
                                    title={title}
                                />
                            );
                        }
                    }
                    if (title === "Completed") {
                        if (item.isCompleted) {
                            return (
                                <DisplayOneTodo
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    handleDelete={handleDelete}
                                    title={title}
                                />
                            );
                        }
                    }
                })}
            </div>
        </div>
    );
};

export default DisplayPendingTodos;
