/* eslint-disable camelcase */
import { v4 as uuidV4 } from 'uuid'
import { _delete, insert, select, update } from './services.utils'

/**
 * @typedef Todo
 * @property {string} id - Todo unique identifier key (uuid type)
 * @property {string} title - Todo title
 * @property {string} description - Todo description
 * @property {('low' | 'important' | 'urgent')} priority - Todo priority level
 * @property {string} is_complete - Flag to identify wether a todo has been completed or not
 * @property {?string} list_id - Unique identifier list' key to stablish a relationship
 *
 */

/**
 * This function retrieves all list' todos belonging to indicated list id from
 * @param {object} list_args
 * @property {string} listId - List' key indetifier to get todos from
 * @returns {Todo[]} List of related todos
 */
export async function getAllListTodos ({ listId }) {
  const { data, error } = await select({ from: 'todo' })
    .eq('list_id', listId)

  return { data, error }
}

/**
 * This function retrieves a list of todos that not belong to any list
 * @returns A todos' list
 */
export async function getAllTodosNotBelongToAnyList () {
  const { data, error } = await select({ from: 'todo' })
    .is('list_id', null)

  return { data, error }
}

/**
 * This function retrieves a list of todos
 * @param {object} search_args
 * @property {?bool} byList - Whether to looking todos in an indicated list
 * @property {?string} listId - List' key indetifier to get todos from
 * @returns A todos' list
 */
export async function getAllTodosFromDB ({ byList = false, listId = null }) {
  if (!byList || (byList && !listId)) {
    const { data, error } = await getAllTodosNotBelongToAnyList()

    return { data, error }
  }

  const { data, error } = await getAllListTodos({ listId })

  return { data, error }
}

export async function getAllCompletedTodosFromDB ({
  byList = false, listId = null
}) {
  if (!byList || (byList && !listId)) {
    const { data, error } = await select({ from: 'todo' })
      .is('is_completed', true)

    console.log('todos completos: ', data)

    return { data, error }
  }

  const { data, error } = await select({ from: 'todo' })
    .eq('list_id', listId)
    .eq('is_completed', true)

  return { data, error }
}

/**
 * This function creates new todo in the database
 * @param {Todo} todo_data - Data of the new todo to be created
 * @returns Data of the created todo
 */
export async function createTodoInDB ({
  id = uuidV4(),
  title = '',
  description = '',
  priority = '',
  is_completed = false,
  forList = null
}) {
  if (!forList) {
    const { error } = await insert({
      rows: {
        id, title, description, priority, is_completed
      },
      into: 'todo'
    })

    return { error }
  }

  // Insert new todo related to the given list
  const { error: insertRowError } = await insert({
    rows: { id, title, description, priority, is_completed, list_id: forList },
    into: 'todo'
  })

  return { error: insertRowError }
}

/**
 * This function looks for a todo in the database by its id
 * @param {object} todo_data
 * @property {string} id - Todo unique identifier key to be sought
 * @returns If the todo has been  or not
 */
export async function todoExists ({ id }) {
  const { data, error } = await select({ from: 'todo' })
    .eq('id', id)

  const todoExists = data.length && !error

  return todoExists
}

/**
 * This functions updates data of a todo in the database
 * @param {object} new_todo_data
 * @property {Todo} newData - New data of the todo to be updated
 * @returns The new data of the updated todo
 */
export async function updateTodoInDB ({ newData }) {
  const { id, title, description, priority, is_completed, list_id } = newData
  const targetTodoExists = await todoExists({ id })

  if (!targetTodoExists)
    return await createTodoInDB(newData)

  const { data, error } = await update({
    withData: {
      title,
      description,
      priority,
      is_completed,
      list_id
    },
    into: 'todo'
  })
    .eq('id', id)

  console.log('Se updateo la data: ', { data, error })

  return { error }
}

/**
 * This function deletes the indicated todo
 * @param {Object} todo_to_delete
 * @property {string} [todoId=null] - ID of the todo to be deleted
 * @property {string} [listId=null] - ID of the list where todo to be deleted belongs
 * @returns Data related to the deleted todo
 */
export async function deleteTodoFromDB ({ todoId, listId }) {
  let deleteTodo = _delete({ from: 'todo' })

  if (todoId)
    deleteTodo = deleteTodo.eq('id', todoId)

  // If no todoId is specified, delete all todos in the list indicated by listId
  if (listId)
    deleteTodo = deleteTodo.eq('list_id', listId)

  const { error } = await deleteTodo

  return { error }
}

/**
 *
 * @param {Object} toggle_completion_info
 * @property {string} todoId - ID of the todo to be updated
 * @property {bool} completion - Value that indicates wether todo is completed or not
 * @returns Data related to the updated todo related to this new completion state
 */
export async function toggleTodoCompletionInDB ({ todoId, completion }) {
  const { error } = await update({
    withData: { is_completed: completion },
    into: 'todo'
  })
    .eq('id', todoId)

  return { error }
}
