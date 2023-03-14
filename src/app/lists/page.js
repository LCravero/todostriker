import { getTodosLists } from '../../services/todoslist.services'
import ListsContainer from './ListContainer'

export const revalidate = 5

export default async function TodosLists () {
  const { data: todolist } = await getTodosLists({})

  return (
    <div className="todos-lists__page-container">
      <ListsContainer todosList={todolist} />
    </div>
  )
}
