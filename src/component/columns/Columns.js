import './columns.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../board/Board';
import { boardsDragEnd } from './columnsSlice';


const Columns = () => {

    const columns = useSelector(state => state.boards.columns);
    const tasks = useSelector(state => state.boards.tasks);
    const columnOrder = useSelector(state => state.boards.columnOrder);

    const initialState = useSelector(state => state);
    console.log(initialState);
    
    const dispatch = useDispatch();
    
    const dragEnd = result => {

        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };
        
        dispatch(boardsDragEnd(newColumn));
    }

    return(
        <DragDropContext onDragEnd = {dragEnd}>
            <div className="columns">
                {columnOrder.map(columnId => {

                    const column = columns[columnId];
                    const task = column.taskIds.map(taskId => tasks[taskId]);

                    return <Board key={column.id} column={column} tasks={task} />;
                })}
            </div>
        </DragDropContext>
    )
}

export default Columns;