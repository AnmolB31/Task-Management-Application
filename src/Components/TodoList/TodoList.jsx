import { useReducer, useState } from "react";
import { listreducer } from "../Reducers/TodoReducer";
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { TiTick } from "react-icons/ti"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./TodoList.css"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const TodoList = (props) => {
    const [Data, dispatch] = useReducer(listreducer, { listItems: JSON.parse(localStorage.getItem("TodoData")), searchDate: new Date() })
    const [editIndex, setEditIndex] = useState();
    const [noResult, setNoResult] = useState(false);

    const confirmedHandler = (index) => {
        let updatedData = Data?.listItems?.filter((element, i) => {
            if (index === i) {
                if (element.title && element.description) {
                    return element
                }
            }
            else {
                return element
            }
        })
        localStorage.setItem("TodoData", JSON.stringify(updatedData))
        dispatch({ type: "Confirmed", payload: updatedData })
        setEditIndex("")
    }
    const deleteHandler = (index) => {
        let updatedData = Data?.listItems?.filter((element, i) => {
            if (index !== i) {
                return element
            }

        })
        localStorage.setItem("TodoData", JSON.stringify(updatedData))
        dispatch({ type: "Confirmed", payload: updatedData })
    }
    const searchByDescription = (data) => {
        let localData = JSON.parse(localStorage.getItem("TodoData"))

        let updatedData = [];
        if (data) {
            updatedData = localData?.filter((element) => {
                if (element?.description?.includes(data)) {
                    return element;
                }
            })
        }
        else {
            updatedData = JSON.parse(localStorage.getItem("TodoData"))
        }
        dispatch({ type: "Confirmed", payload: updatedData })

        if(updatedData.length>0)
        {
            setNoResult(true)

        }

    }
    const searchDateHandler = (date) => {
        dispatch({ type: "searchDate", payload: date })
        let localData = JSON.parse(localStorage.getItem("TodoData"))
        let updatedData = localData?.filter((element) => {
            if (new Date(element.startDate).getDate() == new Date(date).getDate() && new Date(element.startDate).getMonth() == new Date(date).getMonth() && new Date(element.startDate).getFullYear() == new Date(date).getFullYear()) {
                return element;
            }
        })
        if (updatedData.length > 0) {
            setNoResult(true)
            dispatch({ type: "Confirmed", payload: updatedData })
        }
        else {
            dispatch({ type: "Confirmed", payload: updatedData })

            setNoResult(true)
        }

    }
    const resetHandler = () => {
        dispatch({ type: "Confirmed", payload: JSON.parse(localStorage.getItem("TodoData")) })
        setNoResult(false)

    }
    return (
        <div className={`${props.isDarkMode?'listBox dark':'listBox bright'}`}>
            <div className="">
                <div className="title">
                    <h5>List of Tasks</h5>
                    <div className="SearchContainer">

                        <input type="text" className="mx-3 search" placeholder="Search by Description" onChange={(e) => { searchByDescription(e.target.value) }} />

                        <div className="task-calender">
                        <DatePicker
                            selected={Data?.searchDate}
                            onChange={(date) => { searchDateHandler(date) }}
                            name="dueDate"
                            dateFormat="MM/dd/yyyy"
                        />
                        </div>
                    </div>
                </div>
                {noResult ?
                    <div className="reset">
                        <button className="btn btn-light" onClick={() => {
                            resetHandler
                                ()
                        }}>Reset</button>
                    </div> : null}
                {Data?.listItems?.length > 0 ?
                    <div className="main">


                        <div>
                        {"(Scroll right on table to view Edit, Delete and Save option)"}
                            <table border>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                                {Data?.listItems?.map((element, index) => {
                                    return (
                                        <tr>
                                            <td className="tdTitle"><input value={element?.title} disabled={index === editIndex ? false : true} onChange={(e) => { dispatch({ type: "editTitle", payload: e.target.value, index: index }) }} /></td>
                                            <td><input value={element?.description} disabled={index === editIndex ? false : true} onChange={(e) => { dispatch({ type: "editDescription", payload: e.target.value, index: index }) }} /></td>
                                            <td><div className="form-group">
                                                <DatePicker
                                                    selected={new Date(element?.startDate)}
                                                    onChange={(date) => { dispatch({ type: "editDate", payload: date, index: index }) }}
                                                    name="dueDate"
                                                    dateFormat="MM/dd/yyyy"
                                                    disabled={index === editIndex ? false : true}
                                                />
                                            </div></td>
                                            <td>
                                                <select defaultValue={element?.status} value={element?.status} disabled={index === editIndex ? false : true} onChange={(e) => { dispatch({ type: "editStatus", payload: e.target.value ,index:index}) }}>
                                                    <option name="todo">Todo</option>
                                                    <option name="development">Development in progress</option>
                                                    <option name="hold">Hold</option>
                                                    <option name="completed">Completed</option>
                                                </select>
                                            </td>
                                            <td><button onClick={() => { setEditIndex(index) }}><AiFillEdit color={`${props.isDarkMode?'white':'blue'}`} /></button></td>
                                            {/* <td><button onClick={() => { Handler(index) }}><AiFillDelete color="red" /></button></td>
                             */}
                                            <td>
                                                <Popup trigger={<button><AiFillDelete color={`${props.isDarkMode?'white':'red'}`} /></button>} >
                                                    <div>
                                                        <span> Are you sure you want to delete</span>
                                                        <button onClick={() => { deleteHandler(index) }}>Yes</button><button onClick={() => { }}>No</button>
                                                    </div>
                                                </Popup></td>
                                            <td><button><TiTick color={`${props.isDarkMode?'white':'green'}`} onClick={() => { confirmedHandler(index) }} /></button></td>
                                        </tr>
                                    )
                                })
                                }

                            </table>

                        </div>
                    </div>
                    : noResult ? <div className="noData">{"No Results Found"}</div> : <div  className="noData">{"No Tasks"}</div>
                }
            </div>
        </div>
    );

}