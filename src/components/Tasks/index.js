import React from "react";
import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";

export default function Tasks({ lists }) {
  const { name, tasks } = lists
  // const [inputValue, setInputValue] = useState()

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {name}
        <img src={editSvg} alt="Edit title" />
      </h2>

      <div className="tasks__items">
      {tasks && tasks.map(task => {
        const {text, id} = task
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
        )
      })}
        
      </div>
    </div>
  );
}
