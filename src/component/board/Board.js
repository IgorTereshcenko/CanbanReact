import { useDispatch } from "react-redux";
import {boardsTaskPush} from '../columns/columnsSlice';
import { Droppable, Draggable  } from 'react-beautiful-dnd';
import { useState } from 'react';
import Task from '../task/Task';
import './board.scss';

const Board = ({column, tasks, index}) => {

    const dispatch = useDispatch();

    const [value, setValue] = useState('');

    const addTask = () => {
        dispatch(boardsTaskPush(value));
        setValue('');
    }

    return (
        <div className="board">
            <Draggable draggableId = {column.id} index={index}>
                {provided => (
                    <div className="board__over"
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                        <Droppable droppableId={column.id} type = 'task'>
                            {(provided,snapshot) => (
                                <div 
                                    className={snapshot.isDraggingOver ? 'board__wrapper board__wrapper_color' : 'board__wrapper'}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>  
                                        <div className={column.id === 'column-1' ? 'board__name' : column.id === 'column-2' ?
                                        'board__name board__name_yellow' : 'board__name board__name_red'}>
                                            {column.title}
                                        </div>
                                        {tasks.map((task,i) => {
                                            return (
                                                <Task 
                                                    key={task.id} 
                                                    task={task} 
                                                    index={i}
                                                    column = {column}/>
                                            )
                                        })}
                                        {provided.placeholder}
                                        {column.id === 'column-1' ? 
                                            <>
                                                <input 
                                                type="text" 
                                                className="columns__input"
                                                placeholder='Введите название задачи'
                                                value={value}
                                                onChange = {e => setValue(e.target.value)} />
                                                <button onClick={addTask} className="columns__addTask">Добавить</button>
                                            </> : null}                                       
                                </div>)       
                            }
                        </Droppable>
                </div>
                )}    
            </Draggable>           
        </div>
    )
}

export default Board;