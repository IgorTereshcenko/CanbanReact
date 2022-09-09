import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: {},
    columns: {
    'column-1': {
                id: 'column-1',
                title: 'To do',
                taskIds: [],
                },
        },
    columnOrder: ['column-1'],
};

const columnsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        boardsTaskPush: (state, action) => {
            let newTask = {
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
        boardsDragEnd: (state, action) => {
            return {
                ...state,
                columns: {
                    'column-1': action.payload
                }
            }
        },
    }
});

const {actions, reducer,} = columnsSlice;

export default reducer;
export const {boardsTaskPush, boardsDragEnd} = actions;