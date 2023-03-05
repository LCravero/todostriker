import { getTodosLists } from './services'

export const revalidate = 5

export default async function TodosLists () {
  const { todolist } = await getTodosLists()

  return (
    <div className="todos-lists__page-container">
      <span>Todos Lists</span>

      <button>Add todos list</button>

      <pre>{JSON.stringify(todolist, null, 2)}</pre>
    </div>
  )
}
