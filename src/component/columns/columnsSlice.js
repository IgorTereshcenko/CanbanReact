import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid'

/* const initialState = {
    boards: [{
        id: nanoid(),
        name: 'Задачи',
        task: [],
    },
    {
        id: nanoid(),
        name: 'В процессе',
        task: [],
    },
    {
        id: nanoid(),
        name: 'Выполнено',
        task: [],
    }],
    tasksId: []
} */
const initialState = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
    'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            },
        },

    columnOrder: ['column-1'],
};

const columnsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        boardsTaskPush: (state, action) => {state.boards[0].task.push({
            id: nanoid(),
            name: action.payload,
        })},
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