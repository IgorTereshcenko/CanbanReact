import './columns.scss';
import { auth } from '../../firebaseConfig';
import ReactTooltip from 'react-tooltip';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardsDragEnd, boardColumnsDragEnd, boardsColumnPush } from './columnsSlice';
import MemoBoard from '../board/Board';
import { GithubAuthProvider,linkWithPopup,EmailAuthProvider,linkWithCredential, GoogleAuthProvider } from "firebase/auth";

const Columns = () => {

    const columns = useSelector(state => state.boards.columns);
    const tasks = useSelector(state => state.boards.tasks);
    const columnOrder = useSelector(state => state.boards.columnOrder);
    const email = useSelector(state => state.boards.email);
    const password = useSelector(state => state.boards.password);

    const gitHubProvider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();
    const credential = EmailAuthProvider.credential(email, password);
    
    const [boardName, setBoardName] = useState('');
    
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

    const addColumn = useCallback(() => {
        dispatch(boardsColumnPush(boardName));
        setBoardName('');
    }, [boardName])

    useEffect(() => {
        window.scrollBy(1000,0);
    },[addColumn])

    const multipleAuthProviders = () => {
        let providerId = auth.currentUser.providerData.map(item => item.providerId)
        if(providerId.includes('password')) {
            linkWithPopup(auth.currentUser, gitHubProvider)
                .then((result) => {
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const user = result.user;
            })  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
            });
        } else if (providerId.includes('github.com')) {
            linkWithCredential(auth.currentUser, credential)
                .then((usercred) => {
                    const user = usercred.user;
                    console.log("Account linking success", user);
                }).catch((error) => {
                    console.log("Account linking error", error);
                });
        } else {
            linkWithPopup(auth.currentUser, googleProvider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const user = result.user;
            })  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
            });
        }        
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
                                return <MemoBoard 
                                        key={column.id} 
                                        column={column} 
                                        tasks={task} 
                                        index={i}
                                        />;
                            })}
                            {provided.placeholder}
                            <div className="columns__inputWrapper">
                                <input 
                                type="text" 
                                className="columns__input columns__input_less"
                                placeholder='Введите название доски'
                                value={boardName}
                                onChange={e => setBoardName(e.target.value)}
                                />
                                <button 
                                    onClick={addColumn} 
                                    className="columns__addColumn"
                                    disabled = {boardName.length > 0 ? false : true}>
                                    Добавить
                                </button>
                            </div>
                            <button onClick={() => auth.signOut()} className="columns__signOut">Выйти из аккаунта</button>
                            <ReactTooltip id='1' type='info' place='top'>
                                <span>Если почта, которую вы используете при регистрации и почта на ваших аккаунтах 
                                    в Google или GitHub совпадает, вы можете связать аккаунты, чтобы в дальнейшем 
                                    производить вход любым удобным для вас способом.
                                </span>
                            </ReactTooltip>
                                <button 
                                    onClick={multipleAuthProviders}
                                    data-tip data-for='1'
                                    className="columns__linkAccounts">Связать аккаунты</button> 
                              
                        </div>)}                
            </Droppable>
        </DragDropContext>
    )
}

export default Columns;