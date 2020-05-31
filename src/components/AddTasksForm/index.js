import React, { useState } from "react";
import axios from "axios";

import addSvg from "../../assets/img/add.svg";

export default function AddTasksForm({ list, onAddTask }) {
  const [addTask, setAddTask] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const visibleForm = () => {
    setAddTask(!addTask);
    setInputValue("");
  };

  const addTasks = () => {
    if(inputValue) {

      const obj = {
        listId: list.id,
        text: inputValue,
        completed: false,
      };
      setIsLoading(true);
      axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        visibleForm();
      })
      .catch(() => alert("Ошибка при добавлении задачи"))
      .finally(() => setIsLoading(false));
    } else {
      alert('Заполните поле задачи')
    }
  };

  return (
    <div className="tasks__form">
      {!addTask ? (
        <div onClick={visibleForm} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field field--add"
            type="text"
            placeholder="Текст задачи"
          />
          <button disabled={isLoading} onClick={addTasks} className="button">
            {!isLoading ? "Добавить задачу" : "Добавление задачи"}
          </button>

          <button onClick={visibleForm} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}
