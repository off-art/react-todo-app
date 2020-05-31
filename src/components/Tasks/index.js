import React from "react";
import axios from "axios";

import AddTasksForm from "../AddTasksForm";

import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";

export default function Tasks({ lists, onEditTitle, onAddTask }) {
  const { name, tasks, id } = lists;
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", name);
    if (newTitle) {
      onEditTitle(id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось изменить название списка");
        });
    }
  };

  return (
    <div>
      {!Array.isArray(lists) && (
        <div className="tasks">
          <h2 className="tasks__title">
            {name}
            <img onClick={editTitle} src={editSvg} alt="Edit title" />
          </h2>

          <div className="tasks__items">
            {tasks && tasks.length === 0 && <h2>Задачи отсутствуют</h2>}
            {tasks &&
              tasks.map((task) => {
                const { text, id } = task;
                return (
                  <div key={id} className="tasks__items-row">
                    <div className="checkbox">
                      <input id={`task-${id}`} type="checkbox" />
                      <label htmlFor={`task-${id}`}>
                        <svg
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                            stroke="#000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </label>
                    </div>
                    <input
                      value={text}
                      readOnly
                      // onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                );
              })}
            <AddTasksForm onAddTask={onAddTask} list={lists} />
          </div>
        </div>
      )}
    </div>
  );
}
