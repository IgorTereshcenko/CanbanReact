import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: {},
    newTask: {},
    columns: {
    ['column-1']:
    {
        id: 'column-1',
        title: 'To do',
        taskIds: [],
    }
},
    columnOrder: ['column-1'],
};

const columnsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        boardsTaskPush: (state, action) => {
            state.newTask = {
                [`task-${action.payload}`]: {
                    id: `task-${action.payload}`, 
                    content: action.payload
                },
            }
            state.tasks = {...state.tasks, ...state.newTask}               
        },
        boardTaskIdsPush: (state, action) => {
            for(let item in state.newTask) {
                state.columns[action.payload].taskIds.push(item)
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
            const newColumn = {
                [`column-${action.payload}`]: {
                    id: `column-${action.payload}`,
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
    boardColumnDelete} = actions;