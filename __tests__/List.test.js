/* eslint-disable no-undef */
import { List } from '../src/components'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const testSetup = ({ jsx }) => {
  return {
    ...render(jsx)
  }
}

test('List component render correctly two todos', () => {
  const items = [
    {
      id: '3a1eed36-9007-4dcf-8087-b8395503b512',
      title: 'Todo 1',
      description: '',
      priority: 'low',
      is_completed: false,
      editable: false
    },
    {
      id: '3a1eed36-9007-4dcf-8087-b8395503b215',
      title: 'Todo 2',
      description: 'desc 2',
      priority: 'low',
      is_completed: true,
      editable: false
    }
  ]

  testSetup({
    jsx: <List isDraggable items={items} />
  })

  const [firstTodoTitle] = screen.queryAllByPlaceholderText('Todo title')
  const secondTodoDescription = screen.queryByTestId('todo-description')

  expect(firstTodoTitle).toHaveDisplayValue('Todo 1')
  expect(secondTodoDescription).toBeInTheDocument()
  expect(screen.queryByText('desc 2')).toBeInTheDocument()
})
