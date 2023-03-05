import React from "react";
import { useReducer } from "react";
import { reducer } from "../Reducers/TodoReducer";
// import { IoMdAdd } from "react-icons/io";
// import { MdClear } from "react-icons/md";
import "./Todo.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Todo = () => {
  const [TodoData, dispatch] = useReducer(reducer, {
    TodoTitle: "",
    TodoDesc: "",
    titleError: "",
    descError: "",
    startDate: new Date(),
    status: "Todo",
  });

  return (
    <div className="todoBox">
      <h5>Task Manager</h5>
      <div className="mb-2">
        <label for="todo">Title</label>

        <input
          className="form-control "
          type="text"
          name="todo"
          value={TodoData.TodoTitle}
          onChange={(e) => {
            dispatch({ type: "changeTitle", payload: e.target.value });
          }}
        />
      </div>
      <div>
        <span className="vt-error">{TodoData.titleError}</span>
      </div>
      <div className="mb-2">
        <label for="desc">Description</label>

        <textarea
          name="desc"
          className="form-control "
          rows={3}
          cols={30}
          value={TodoData?.TodoDesc}
          onChange={(e) => {
            dispatch({ type: "changeDescp", payload: e.target.value });
          }}
        />
      </div>
      <div>
        <span className="vt-error">{TodoData.descError}</span>
      </div>
      <div className="mb-3">
        <span>Date :</span>
        <div className="form-group calender">
          <DatePicker
            selected={TodoData?.startDate}
            onChange={(date) => {
              dispatch({ type: "date", payload: date });
            }}
            name="dueDate"
            dateFormat="MM/dd/yyyy"
          />
        </div>
      </div>
      <div className="mb-3 status">
        <span>Status : </span>
        <select
          onChange={(e) =>
            dispatch({ type: "status", payload: e.target.value })
          }
          defaultValue={TodoData.status}
          value={TodoData.status}
        >
          <option name="todo">Todo</option>
          <option name="development">Development in progress</option>
          <option name="hold">Hold</option>
          <option name="completed">Completed</option>
        </select>
      </div>
      <div className="adddelButton">
        <button
          className="btn btn-success "
          disabled={TodoData.TodoTitle && TodoData.TodoDesc ? false : true}
          onClick={() => {
            dispatch({ type: "add" });
          }}
        >
          {/* <IoMdAdd /> */}
        Add Task
        </button>
        <button
          className="btn btn-danger"
          disabled={TodoData.TodoTitle && TodoData.TodoDesc ? false : true}
          onClick={() => {
            dispatch({ type: "remove" });
          }}
        >
          {/* <MdClear /> */}
          Clear
        </button>
      </div>
    </div>
  );
};
