import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: {},
    columns: {
    'column-1':
    {
        id: 'column-1',
        title: 'To do',
        taskIds: [],
    },
    'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: [],
    },
    'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
    },
},  
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

const columnsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        boardsTaskPush: (state, action) => {
            const newTask = {
                [`task-${action.payload}`]: {
                    id: `task-${action.payload}`, 
                    content: action.payload
                },
            }
            state.tasks = {...state.tasks, ...newTask}
            for(let item in newTask) {
                state.columns["column-1"].taskIds.push(item)
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
            state.columns = {...state.columns, ... newColumn}
            for(let item in newColumn) {
                state.columnOrder.push(item)
            }
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
export const {boardsTaskPush, boardsDragEnd, boardColumnsDragEnd, boardsColumnPush} = actions;