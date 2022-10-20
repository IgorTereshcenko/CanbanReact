import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: {},
    newTask: null,
    taskNum: 0,
    colNum: 0,
    columns: {},
    columnOrder: [],
    email: '',
    password: ''
};

const columnsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        boardsTaskPush: (state, action) => {
            state.taskNum = state.taskNum + 1;
            state.newTask = {
                [`task-${state.taskNum}`]: {
                    id:`task-${state.taskNum}` , 
                    content: action.payload
                },
            }
            state.tasks = {...state.tasks, ...state.newTask}               
        },
        boardTaskIdsPush: (state, action) => {
            for (let key in state.newTask) {
                let value = state.newTask[key]
                let taskId = Object.values(value)
                state.columns[action.payload].taskIds.push(taskId[0])
            }
        },
        boardTaskDelete: (state, action) => {
            for(let item in state.tasks) {
                if(item === action.payload) {
                    Reflect.deleteProperty(state.tasks, item);
                }
            }
            for(let item in state.newTask) {
                if(item === action.payload) {
                    Reflect.deleteProperty(state.newTask, item);
                }
            }
            for(let col in state.columns) {
                state.columns[col].taskIds = state.columns[col].taskIds.filter(item => item !== action.payload);
            }      
        },
        boardsColumnPush: (state, action) => {
            state.colNum = state.colNum + 1;
            const newColumn = {
                [`column-${state.colNum}`]: {
                    id: `column-${state.colNum}`,
                    title: action.payload,
                    taskIds: []
                }
            }
            state.columns = {...state.columns, ...newColumn}
            for(let item in newColumn) {
                state.columnOrder.push(item)
            }
        },
        boardColumnDelete: (state, action) => {
            for(let item in state.columns) {
                if (item === action.payload) {
                    Reflect.deleteProperty(state.columns, item);
                }
            }
            state.columnOrder = state.columnOrder.filter(item => item !== action.payload);
        },
        boardsDragEnd: (state, action) => {
            return {
                ...state,
                columns: action.payload
            }
        },
        boardColumnsDragEnd: (state, action) => {
            return {
                ...state,
                columnOrder: action.payload
            }
        },
        boardCreateEmail: (state, action) => {
            return {
                ...state,
                email: action.payload
            }
        },
        boardCreatePassword: (state, action) => {
            return {
                ...state,
                password: action.payload
            }
        }
    }
});

const {actions, reducer,} = columnsSlice;

export default reducer;
export const {
    boardsTaskPush, 
    boardsDragEnd, 
    boardColumnsDragEnd, 
    boardsColumnPush, 
    boardTaskIdsPush,
    boardTaskDelete,
    boardColumnDelete,
    boardCreateEmail,
    boardCreatePassword} = actions;