import { useDispatch } from "react-redux";
import {boardsTaskPush} from '../columns/columnsSlice';
import { Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import Task from '../task/Task';
import './board.scss';

const Board = ({column, tasks}) => {

    const dispatch = useDispatch();

    const [value, setValue] = useState('');

    const addTask = () => {
        dispatch(boardsTaskPush(value));
        setValue('');
    }

    return (
            <div className="board">
                <Droppable droppableId={column.id}>
                    {(provided,snapshot) => (
                        <div 
                            className={snapshot.isDraggingOver ? 'board__wrapper board__wrapper_color' : 'board__wrapper'}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>  
                                <div className="board__name">{column.title}</div>
                                {tasks.map((task,i) => {
                                    return (
                                        <Task key={task.id} task={task} index={i}/>
                                    )
                                })}
                                {provided.placeholder}
                            
                                <>
                                    <input 
                                    type="text" 
                                    className="columns__input"
                                    placeholder='Введите название задачи'
                                    value={value}
                                    onChange = {e => setValue(e.target.value)} />
                                    <button onClick={addTask} className="columns__addTask">Добавить</button>
                                </> 
                        </div>)       
                    }
                </Droppable>         
            </div>
    )
}

export default Board;