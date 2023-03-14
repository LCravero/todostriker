/* eslint-disable camelcase */
'use client'
import reducer from './todo-reducer'
import Todo from './Todo'
import { updateTodoInDB } from '../../services/todo.services'
import { useToast } from '@chakra-ui/react'
import useTodos from '../../hooks/useTodos'
import useTodoStore from '../../store/slices/todo-store-slice'
import { useCallback, useReducer, useRef } from 'react'

const ENTER_KEY_CODE = 13

const getInitialTodoState = ({
  id,
  title = '',
  description = '',
  priority = 'low',
  isCompleted = false,
  listId = null,
  editable = true,
  toUpdate = false
}) => {
  return {
    id,
    title,
    description,
    priority,
    is_completed: isCompleted,
    list_id: listId,
    editable,
    toUpdate
  }
}

export default function TodoContainer (props) {
  const initialTodoState = getInitialTodoState(props)
  const { list_id } = initialTodoState
  const hookParams = {
    byList: Boolean(list_id),
    listId: list_id
  }
  const { deleteDBTodo, toggleDBTodoCompletion } = useTodos(hookParams)
  const toast = useToast()
  const [todoState, dispatch] = useReducer(reducer, initialTodoState)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const [addTodoToStorage, deleteTodoFromStorage, updateTodoFromStorage] = useTodoStore((state) => [
    state.addTodo,
    state.deleteTodo,
    state.updateTodo
  ])

  const onKeyUpHandler = useCallback((event) => {
    const { name, value } = event.target

    if (event.keyCode === ENTER_KEY_CODE)
      if (name === 'title') {
        dispatch({
          type: 'SET_TODO_TITLE',
          payload: { title: value }
        })

        descriptionRef.current.focus()
      }
  }, [])

  const onBlurHandler = useCallback(({ event, section }) => {
    event.stopPropagation()

    if (section === 'description')
      dispatch({
        type: 'SET_TODO_DESCRIPTION',
        payload: { description: descriptionRef.current.value }
      })

    if (section === 'title')
      dispatch({
        type: 'SET_TODO_TITLE',
        payload: { title: titleRef.current.value }
      })
  }, [])

  const onChangeTodoPriorityHandler = useCallback((event) => {
    const { value } = event.target

    dispatch({
      type: 'SET_TODO_PRIORITY',
      payload: { priority: value }
    })
  }, [])

  const onClickSaveTodoHandler = async (event) => {
    event.stopPropagation()
    const { editable, toUpdate, ...newData } = todoState

    if (toUpdate) {
      const { editable, toUpdate, ...newData } = todoState

      console.log('Updatear con: ', newData)

      dispatch({
        type: 'SAVE_TODO_CHANGES',
        payload: newData
      })

      updateTodoFromStorage(newData)
      const { error } = await updateTodoInDB({ newData })

      if (!error) {
        toast({
          title: 'Todo updated!',
          status: 'success',
          variant: 'subtle',
          duration: 4000
        })

        return
      }

      toast({
        title: 'Error updating todo',
        description: 'Please try to update your todo again',
        status: 'error',
        variant: 'subtle',
        duration: 4000
      })

      return
    }

    dispatch({
      type: 'SAVE_TODO',
      payload: newData
    })

    console.log('[onClickSaveTodoHandler] - data a agregar a storage:', newData)
    addTodoToStorage(newData)

    const { error } = await updateTodoInDB({ newData })

    if (!error) {
      toast({
        title: 'Todo saved!',
        status: 'success',
        variant: 'subtle',
        duration: 4000
      })

      return
    }

    toast({
      title: 'Error saving todo data',
      description: 'Ups... something went wrong.Try again!',
      status: 'error',
      variant: 'subtle',
      duration: 4000
    })
  }

  const onClickDismissTodoHandler = (event) => {
    onClickRemoveTodoHandler(event)
  }

  const onClickEditTodoHandler = (event) => {
    event.stopPropagation()
    console.log('Editing todo??', !todoState.editable)

    dispatch({
      type: 'SET_TODO_EDITABLE',
      payload: { editable: !todoState.editable, toUpdate: true }
    })
  }

  const onClickRemoveTodoHandler = async (event) => {
    event.stopPropagation()

    deleteTodoFromStorage({ id: todoState.id })
    const { error } = await deleteDBTodo({ id: todoState.id })
    // const { error } = await deleteTodoFromDB({ todoId: todoState.id })

    if (!error) {
      toast({
        title: 'Todo deleted!',
        status: 'success',
        variant: 'subtle',
        duration: 4000
      })

      return
    }

    toast({
      title: 'Error deleting todo',
      description: 'Ups... something went wrong.Try again!',
      status: 'error',
      variant: 'subtle',
      duration: 4000
    })
  }

  const onClickCompleteTodoHandler = (event) => {
    event.stopPropagation()

    dispatch({
      type: 'SET_TODO_COMPLETION',
      payload: { is_completed: !todoState.is_completed }
    })

    updateTodoFromStorage({
      id: todoState.id,
      is_completed: !todoState.is_completed
    })

    const { error } = toggleDBTodoCompletion({
      id: todoState.id,
      completion: !todoState.is_completed
    })

    if (error)
      toast({
        title: "There're problems to complete the todo",
        description: 'Ups... something went wrong.Try again!',
        status: 'error',
        variant: 'subtle',
        duration: 4000
      })
  }

  return (
    <Todo
      data={todoState}
      ref={{
        descriptionRef,
        titleRef
      }}
      onBlurSection={onBlurHandler}
      onChangePriority={onChangeTodoPriorityHandler}
      onComplete={onClickCompleteTodoHandler}
      onDismiss={onClickDismissTodoHandler}
      onEdit={onClickEditTodoHandler}
      onRemove={onClickRemoveTodoHandler}
      onSave={onClickSaveTodoHandler}
      onSetTitle={onKeyUpHandler}
    />
  )
}
