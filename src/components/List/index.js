import React from "react";
import classNames from "classnames";
import axios from "axios";

import Badge from "../Badge";

import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {

  const removeList = (obj) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + obj.id);
      onRemove(obj);
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((obj) => {
        const { icon, name, className, tasks } = obj;

        return (
          <li
            key={new Date() * Math.random()}
            className={classNames(className, {
              active:  obj.active ? obj.active : activeItem && activeItem.id === obj.id,
            })}
            onClick={onClickItem ? () => onClickItem(obj) : null}
          >
            <i>{icon ? icon : <Badge color={obj.color.name} />}</i>
            <span>
              {name}
              {tasks && ` (${tasks.length})`}
            </span>
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
