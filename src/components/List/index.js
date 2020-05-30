import React from "react";
import classNames from "classnames";
import axios from 'axios'

import Badge from "../Badge";

import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (obj) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete('http://localhost:3001/lists/' + obj.id)
      onRemove(obj);
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((obj) => {
        const { icon, name, active, className } = obj;
        return (
          <li
            key={new Date() * Math.random()}
            className={classNames(className, { active })}
          >
            <i>{icon ? icon : <Badge color={obj.color.name} />}</i>
            <span>{name}</span>
            {isRemovable && (
              <img
                className="list__remove-icon"
                src={removeSvg}
                alt="Remove icon"
                onClick={() => removeList(obj)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
