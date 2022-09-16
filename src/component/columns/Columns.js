import './columns.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../board/Board';
import { boardsDragEnd, boardColumnsDragEnd, boardsColumnPush } from './columnsSlice';


const Columns = () => {

    const columns = useSelector(state => state.boards.columns);
    const tasks = useSelector(state => state.boards.tasks);
    const columnOrder = useSelector(state => state.boards.columnOrder);
    

    const [value, setValue] = useState('');

    const initialState = useSelector(state => state);
    console.log(initialState);
    
    const dispatch = useDispatch();
    
    const dragEnd = result => {

        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
      
            dispatch(boardColumnsDragEnd(newColumnOrder));
            
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...columns,
                [newColumn.id]: newColumn
            };
          
            dispatch(boardsDragEnd(newState));
            return
        }
        
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };
        
        const newState = {
            ...columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        };

        dispatch(boardsDragEnd(newState));
    }

    const addColumn = () => {
        dispatch(boardsColumnPush(value));
        setValue('');
    }
    

    return(
        <DragDropContext onDragEnd = {dragEnd}>
            <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column">
                    {provided => ( 
                        <div className="columns"
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {columnOrder.map((columnId,i) => {
                                const column = columns[columnId];
                                const task = column.taskIds.map(taskId => tasks[taskId]);
                                return <Board 
                                        key={column.id} 
                                        column={column} 
                                        tasks={task} 
                                        index = {i} />;
                            })}
                            {provided.placeholder}
                            <div className="columns__inputWrapper">
                                <input 
                                type="text" 
                                className="columns__input columns__input_less"
                                placeholder='Введите название доски'
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                />
                                <button onClick={addColumn} className="columns__addTask columns__addTask_column">Добавить</button>
                            </div>   
                        </div>)}                
            </Droppable>
        </DragDropContext>
    )
}

export default Columns;