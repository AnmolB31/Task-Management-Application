export const reducer = (state, action) => {
    switch (action.type) {

        case "changeTitle":
            return {
                ...state, TodoTitle: action.payload, titleError: action.payload === "" ? "Please Enter Title" : ""
            }


        case "add":
            if (state.TodoTitle && state.TodoDesc) {
                if (JSON.parse(localStorage.getItem("TodoData")) && JSON.parse(localStorage.getItem("TodoData")).length > 0) {

                    localStorage.setItem("TodoData", JSON.stringify([...JSON.parse(localStorage.getItem("TodoData")), { title: state.TodoTitle, description: state.TodoDesc, status: state.status, startDate: state.startDate }]))
                }
                else {
                    localStorage.setItem("TodoData", JSON.stringify([{ title: state.TodoTitle, description: state.TodoDesc, status: state.status, startDate: state.startDate }]))

                }
            }
            return { ...state, TodoDesc: "", TodoTitle: "", titleError: state.TodoTitle === "" ? "Please Enter Title" : "", descError: state.TodoDesc === "" ? "Please Enter Description" : "" ,startDate:new Date(),status:"Todo"}

        case "changeDescp":
            return { ...state, TodoDesc: action.payload, descError: action.payload === "" ? "Please Enter Description" : "" }

        case "remove": return { ...state, TodoTitle: "", TodoDesc: "", titleError: '', descError: '', status: "Todo", startDate: new Date() }


        case "status":
            return { ...state, status: action.payload }
        case "date":
            return { ...state, startDate: action.payload }
        default: return state

    }

}

export const listreducer = (state, action) => {
    switch (action.type) {
        case "editTitle":
            state.listItems[action.index].title = action.payload
            return { ...state };
        case "editDescription":
            state.listItems[action.index].description = action.payload

            return { ...state };
        case "Confirmed":
            state.listItems = action.payload
            return { ...state }
        case "editDate":
            state.listItems[action.index].startDate = action.payload
            return { ...state }

        case "editStatus":
            state.listItems[action.index].status = action.payload

            return { ...state}

        case "searchDate":
            return { ...state, searchDate: action.payload }
        default: return state
    }
}