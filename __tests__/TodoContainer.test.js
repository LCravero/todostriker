/* eslint-disable no-undef */
/* eslint-disable no-import-assign */
import TodoContainer from '../src/components/Todo/TodoContainer'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

const testSetup = ({ jsx }) => {
  const user = userEvent.setup()

  const setTodoTitle = async (title) => {
    const titleSection = screen.queryByPlaceholderText('Todo title')

    await user.click(titleSection)
    await user.keyboard(title)
    await user.keyboard('{Tab}')
  }

  const setTodoDescription = async (description) => {
    const descriptionSection = screen.queryByPlaceholderText('Todo description')

    await user.click(descriptionSection)
    await user.keyboard(description)
    await user.keyboard('{Tab}')
  }

  return {
    user,
    setTodoTitle,
    setTodoDescription,
    ...render(jsx)
  }
}

describe('TodoContainer component', () => {
  test('render properly with default props values', () => {
    testSetup({
      jsx: <TodoContainer />
    })

    expect(screen.queryByPlaceholderText('Todo title')).toBeInTheDocument()
    expect(screen.queryByPlaceholderText('Todo description')).toBeInTheDocument()
    expect(screen.queryByTestId('todo-priority__selector')).toBeInTheDocument()
    expect(screen.queryByTestId('dismiss-todo')).toBeInTheDocument()
    expect(screen.queryByTestId('save-update-todo')).toBeInTheDocument()
  })

  test('complete title and description and find changes after fill these fields', async () => {
    /**
     * In this test case we prove blur action pressing Tab key
     */
    const { setTodoDescription, setTodoTitle } = testSetup({
      jsx: <TodoContainer />
    })

    await setTodoTitle('Fake todo title')

    expect(screen.queryByPlaceholderText('Todo description')).toHaveFocus()

    await setTodoDescription('Fake todo description')

    expect(screen.queryByPlaceholderText('Todo title'))
      .toHaveDisplayValue('Fake todo title')

    expect(screen.queryByPlaceholderText('Todo description'))
      .toHaveDisplayValue('Fake todo description')
  })

  test('change todo priority to important has selected value', async () => {
    const { user } = testSetup({
      jsx: <TodoContainer />
    })

    const prioritySelector = screen.queryByTestId('todo-priority__selector')

    await user.click(prioritySelector)

    await waitFor(async () => {
      const importantPriority = screen.queryByText('Important')

      await user.click(importantPriority)
    })

    screen.debug(prioritySelector)
  })

  test('save created todo successfuly', async () => {
    const {
      setTodoDescription,
      setTodoTitle,
      user
    } = testSetup({
      jsx: <TodoContainer />
    })

    await setTodoTitle('Fake todo title')

    expect(screen.queryByPlaceholderText('Todo description')).toHaveFocus()

    await setTodoDescription('Fake todo description')

    screen.debug()
    const saveTodoBtn = screen.queryByText('Save')

    await user.click(saveTodoBtn)

    const todoTitleSection = await screen.findByTestId('todo-title-header')
    const todoDescriptionSection = await screen.findByTestId('todo-description')

    await waitFor(() => {
      expect(todoTitleSection).toHaveTextContent('Fake todo title')
      expect(todoDescriptionSection).toHaveTextContent('Fake todo description')
    })
  })
})
