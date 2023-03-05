import supabase from '@/utils/supabase'

export async function getTodosLists () {
  const { data: todolist } = await supabase
    .from('todolist')
    .select()

  console.log(todolist)

  return { todolist }
}
