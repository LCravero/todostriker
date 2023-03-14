'use client'
import useTodoStore from '../store/slices/todo-store-slice'
import { v4 as uuidV4 } from 'uuid'
import { createTodoInDB, deleteTodoFromDB, getAllCompletedTodosFromDB, getAllTodosFromDB, toggleTodoCompletionInDB } from '../services/todo.services'
import { useEffect, useState } from 'react'

const generateDefaultTodo = () => {
  return {
    id: uuidV4(),
    title: '',
    description: '',
    priority: 'low',
    is_completed: false
  }
}

export default function useTodos ({ byList = false, listId = null }) {
  const [todos, setTodos] = useState([])
  // const addTodo = useTodoStore((state) => state.addTodo)
  const storeTodos = useTodoStore((state) => state.todos)

  useEffect(() => {
    async function getTodosFromServer () {
      const { data: todosFromDB, error } = await getAllTodosFromDB({
        byList, listId
      })

      if (!todosFromDB.length || error) {
        const { error: errorAtCreation } = await createTodoInDB({})

        if (errorAtCreation) {
          const defaultTodo = generateDefaultTodo()

          // addTodo(defaultTodo)
          setTodos([defaultTodo])

          return
        }

        const { data: newTodosFromDB } = await getAllTodosFromDB({
          byList, listId
        })

        setTodos(newTodosFromDB)

        return
      }

      setTodos(todosFromDB)
    }

    getTodosFromServer()
  }, [storeTodos, byList, listId])

  async function createDBTodo (todoData) {
    const { error } = await createTodoInDB(todoData)

    if (error)
      return { error }

    const { data: newTodosFromDB } = await getAllTodosFromDB({})

    setTodos(newTodosFromDB)

    return { error: null }
  }

  async function deleteDBTodo ({ id }) {
    const { error } = await deleteTodoFromDB({ todoId: id })

    if (error)
      return { error }

    const { data: newTodosFromDB } = await getAllTodosFromDB({})

    // console.log('Nuevos todos en la DB después del borrado', newTodosFromDB)
    setTodos(newTodosFromDB)

    return { error: null }
  }

  async function toggleDBTodoCompletion ({ id, completion }) {
    const { error } = await toggleTodoCompletionInDB({
      todoId: id,
      completion
    })

    if (error)
      return { error }

    const { data: newTodosFromDB } = await getAllTodosFromDB({})

    setTodos(newTodosFromDB)

    return { error: null }
  }

  async function getAllDBCompletedTodos ({ byList = false, listId = null }) {
    const { data: completedTodos, error } = await getAllCompletedTodosFromDB({ byList, listId })

    console.log('Completed todos from custom hook', completedTodos)
    if (error)
      return { error }

    if (!completedTodos)
      setTodos([])
    else setTodos(completedTodos)

    return { error: null }
  }

  async function getAllTodos ({ byList = false, listId = null }) {
    const { data, error } = await getAllTodosFromDB({ byList, listId })

    if (error)
      return { error }

    setTodos(data)

    return { error: null }
  }

  return {
    createDBTodo,
    deleteDBTodo,
    getAllDBCompletedTodos,
    getAllTodos,
    todos,
    toggleDBTodoCompletion
  }
}
