/* eslint-disable camelcase */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import produce from 'immer'

const todoStore = create(
  persist((set, get) => {
    return {
      todos: [],
      remainingTodos: 0,
      addTodo: ({
        id,
        title = '',
        description = '',
        priority = 'low',
        is_completed = false,
        list_id = null
      }) => {
        set(produce(
          (state) => {
            const incomingTodoAlreadyExists = Boolean(state.todos
              .find((todo) => todo.id === String(id)))

            if (incomingTodoAlreadyExists) {
              get().updateTodo({
                id, title, description, priority, is_completed, list_id
              })
            } else {
              state.todos.push({
                id, title, description, priority, is_completed, list_id
              })

              // Assigning more understandable name
              state.remainingTodos = state.remainingTodos + 1
            }
          }))
      },

      deleteTodo: ({ id }) => {
        set(produce(
          (state) => {
            state.todos = state.todos.filter((todo) => todo.id !== id)
            state.remainingTodos = state.remainingTodos === 0
              ? 0
              : state.remainingTodos - 1
          })
        )
      },

      updateTodo: ({
        id, title, description, priority, is_completed, list_id
      }) => {
        set(produce(
          (state) => {
            const todoPos = state.todos.findIndex(
              (todo) => todo.id === String(id)
            )

            if (description) state.todos[todoPos].description = description
            if (list_id) state.todos[todoPos].list_id = list_id
            if (priority) state.todos[todoPos].priority = priority
            if (title) state.todos[todoPos].title = title

            if (state.todos[todoPos].is_completed !== is_completed) {
              state.todos[todoPos].is_completed = is_completed

              if (is_completed)
                state.remainingTodos = state.remainingTodos === 0
                  ? 0
                  : state.remainingTodos - 1
              else state.remainingTodos += 1
            }
          })
        )
      }
    }
  },
  {
    name: 'todos_storage'
  })
)

export default todoStore
