import { useDispatch } from "react-redux";
import {boardsTaskPush, boardTaskIdsPush, boardColumnDelete, boardTaskDelete} from '../columns/columnsSlice';
import { Droppable, Draggable  } from 'react-beautiful-dnd';
import React, { useEffect, useRef, useState } from 'react';
import './board.scss';
import MemoTask from "../task/Task";
import deleteImg from '../../resurses/delete.svg';
import { useCallback } from "react";

const Board = ({column, tasks, index}) => {
    
    const dispatch = useDispatch();
    
    const [nameTask, setNameTask] = useState('');
    const [color, setColor] = useState('');
    
    const inputRef = useRef(null);
    
    useEffect(() => {
        generateColor();
    },[])

    const addTask = useCallback(() => {
        dispatch(boardsTaskPush(nameTask));
        dispatch(boardTaskIdsPush(column.id));
        setNameTask('');
    },[nameTask])
 
    const deleteColumn = () => {
        dispatch(boardColumnDelete(column.id));
        for(let item of tasks) {
            dispatch(boardTaskDelete(item.id))
        }   
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
                {(provided) => (
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
                                                    color={color}/>
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
                                        <button 
                                            onClick={addTask} 
                                            ref={inputRef} 
                                            className="board__addTask"
                                            disabled = {nameTask.length > 0 ? false : true}
                                            >Добавить</button>
                                        <button onClick={deleteColumn} className="board__deleteBoard">
                                            <img src={deleteImg} alt="deleteimg" />
                                        </button>                                               
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