import supabase from '../utils/supabase'

/**
 * Supabase select wrapper interface
 * @param {object} select_args
 * @property {?string | ?string[]} columns - Column or columns names to be retrieved
 * @property {string} from - Table name where looking for
 */
export const select = ({ columns = '*', from, options = {} }) => {
  let columnsArgs = columns || '*'

  if (Array.isArray(columns))
    columnsArgs = columns.join(',')

  return supabase
    .from(from)
    .select(columnsArgs, options)
}

/**
 * Supabase insert wrapper interface
 * @param {Object} insert_args
 * @property {object | object[]} rows - Rows to be inserted into the table
 * @property {string} into - Table name where we want to insert the rows
 */
export const insert = ({ rows, into }) => supabase
  .from(into)
  .insert(rows)

/**
 * Supabase delete wrapper interface
 * @param {string} from - Table name where we want to delete rows
 */
export const _delete = ({ from }) => supabase
  .from(from)
  .delete()

/**
 * Supabase update wrapper interface
 * @param {Object} update_args
 * @property {object} withData - Data to be updated
 * @property {string} into - Table name where we want to update the data
 */
export const update = ({ withData, into }) => supabase
  .from(into)
  .update(withData)
