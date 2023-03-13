/* eslint-disable camelcase */
import { v4 as uuidV4 } from 'uuid'
import { _delete, insert, select, update } from './services.utils'
import { createTodoInDB, deleteTodoFromDB } from './todo.services'

/**
 * @typedef {Object} Todoslist
 * @property {string} id - Unique identifier key
 * @property {string} name - List name
 * @property {bool} [is_complete=false] - Flag to know if the todos list is complete
 */

export async function getTodosLists () {
  const { data, error } = await select({ from: 'todoslist' })

  return { data, error }
}

/**
 * This function creates a todos' list with an initial todo item
 * @param {Todoslist} listData - Data for the new list to be created
 * @returns {Todoslist} Data of the new todos list
 */
export async function createTodosListInDB (listData) {
  const { id = uuidV4(), name = '', is_complete = false } = listData
  const { data, error: createListError } = await insert({
    rows: { id, name, is_complete },
    into: 'todoslist'
  })

  if (createListError)
    return { error: createListError }

  const { error: createTodoForListError } = await createTodoInDB({
    forList: id
  })

  return { data, error: createTodoForListError }
}

export async function updateTodosListInDB (newListData) {
  const { id, name, is_complete } = newListData
  const { error } = await update({
    withData: { name, is_complete },
    into: 'todoslist'
  })
    .eq('id', id)

  return { error }
}

export async function deleteTodosListInDB (targetList) {
  const { id } = targetList

  // First of all we have to delete all related todo items
  const { error: deletionListTodoError } = await deleteTodoFromDB({
    listId: id
  })

  const { error: deletionListError } = await _delete({ from: 'todoslist' })
    .eq('id', id)

  if (deletionListError)
    return { error: deletionListError }

  return { error: deletionListTodoError }
}

export async function getCompletedTodosFromTodosList (targetList) {
  const { id } = targetList
  const completedTodosAmount = await select({
    columns: 'is_completed',
    from: 'todo',
    options: {
      head: true,
      count: 'estimated'
    }
  })
    .eq('list_id', id)
    .eq('is_completed', true)

  return completedTodosAmount
}
