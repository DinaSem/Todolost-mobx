import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import { Link } from 'react-router-dom'
import {useRootStore} from "../../../../app/stores/RootStateContext";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const {todoStore} = useRootStore()
    const {taskStore} = useRootStore()
    const {authStore} = useRootStore()
    // const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const removeTask = useCallback(function (id: string, todolistId: string) {
        taskStore.deleteTask(id,todolistId)
    }, [taskStore])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [todoStore, taskStore])


    const changeStatus = (id: string, status: TaskStatuses, todolistId: string)=> {
        taskStore.updateTask(id, {status},todolistId)
    }

    // const onTitleChangeHandler = useCallback((newValue: string) => {
    //     props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    // }, [props.task.id, props.todolistId]);


    const changeTaskTitle = useCallback( (id: string, title: string, todolistId: string)=> {
        taskStore.updateTask(id, {title},todolistId)
    }, [props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        {/*<Link to={'smw'}>*/}
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={()=>changeTaskTitle(props.task.id,props.task.title,props.todolistId)}/>
        <IconButton onClick={()=>removeTask(props.task.id, props.todolistId)}>
            <Delete/>
        </IconButton>
            {/*</Link>*/}
    </div>
})
