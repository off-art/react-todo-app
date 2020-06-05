import React from "react";
import axios from "axios";

import AddTasksForm from "../AddTasksForm";
import Task from '../Task'

import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";

export default function Tasks({ lists, onEditTitle, onAddTask, withOutEpmty, onRemoveTask, onEditTask }) {
  const { name, tasks, id, color } = lists;

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
    <div className="tasks">
      {tasks && (
        <h2 style={{ color: color.hex }} className="tasks__title">
          {name}
          <img onClick={editTitle} src={editSvg} alt="Edit title" />
        </h2>
      )}

      <div className="tasks__items">
        {!withOutEpmty && tasks && tasks.length === 0 && (
          <h2>Задачи отсутствуют</h2>
        )}
        {tasks &&
          tasks.map((task) => {
            
            return (
              <Task {...task} onEdit={onEditTask} lists={lists} key={task.id} onRemove={onRemoveTask} />
            );
          })}
        <AddTasksForm key={lists.id} onAddTask={onAddTask} list={lists} />
      </div>
    </div>
  );
}
