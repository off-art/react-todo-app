import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import closeSvg from "../../assets/img/close.svg";

import "./AddList.scss";

const AddList = ({ colors, click }) => {
  const [visiblePooup, setVisiblePooup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setInputValue("");
    setSelectedColor(colors[0].id);
    setVisiblePooup(false);
  };
  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } };
        click(listObj);
        onClose();
      })
      .catch(() => alert("Ошибка при добавлении списка"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePooup(true)}
        items={[
          {
            className: "list__add--button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
          },
        ]}
      />
      {visiblePooup && (
        <div className={`add-list__popup ${visiblePooup}`}>
          <img
            onClick={onClose}
            src={closeSvg}
            alt="Close Button"
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors &&
              colors.map((color) => {
                const { id, name } = color;
                return (
                  <Badge
                    onClick={() => setSelectedColor(id)}
                    key={id}
                    color={name}
                    className={selectedColor === id && "active"}
                  />
                );
              })}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? "Добавление..." : " Добавить"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
