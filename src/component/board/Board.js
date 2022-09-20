import { useDispatch } from "react-redux";
import {boardsTaskPush, boardTaskIdsPush} from '../columns/columnsSlice';
import { Droppable, Draggable  } from 'react-beautiful-dnd';
import React, { useEffect, useRef, useState } from 'react';
import './board.scss';
import MemoTask from "../task/Task";

const Board = ({column, tasks, index}) => {
    
    console.log('boards')
    
    const dispatch = useDispatch();

    const [nameTask, setNameTask] = useState('');
    const [color, setColor] = useState('');
    const inputRef = useRef(null);
    
    useEffect(() => {
        generateColor();
    },[])

    const addTask = () => {
        dispatch(boardsTaskPush(nameTask));
        dispatch(boardTaskIdsPush(column.id));
        setNameTask('');
    }

    useEffect(() => {
        const coordinate = inputRef.current.getBoundingClientRect();
        const clientHeight = document.documentElement.clientHeight;
        if(coordinate.bottom > clientHeight) {
            window.scrollBy(0,1000)
        }
    },[addTask])

    const generateColor = () => {
        let letters = "0123456789ABCDEF"
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 16))];
        }

        setColor(color);
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
                                        <div className='board__name'
                                             style={{
                                                color: color
                                             }}>
                                            {column.title}
                                        </div>
                                        {tasks.map((task,i) => {
                                            return (
                                                <MemoTask 
                                                    key={task.id} 
                                                    task={task} 
                                                    index={i}
                                                    color={color}
                                                    />
                                            )
                                        })}
                                        {provided.placeholder}
                                        <input 
                                        type="text"
                                        className="columns__input"
                                        placeholder='Введите название задачи'
                                        value={nameTask}
                                        onChange = {e => setNameTask(e.target.value)}
                                          />
                                        <button onClick={addTask} ref={inputRef} className="columns__addTask">Добавить</button>                                                
                                </div>)       
                            }
                        </Droppable>
                </div>
                )}    
            </Draggable>           
        </div>
    )
}

const MemoBoard = React.memo(Board);

export default MemoBoard;