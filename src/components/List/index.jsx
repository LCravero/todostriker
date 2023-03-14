'use client'

import DraggableContainer from '../DraggableContainer/DraggableContainer'
import { reorder } from '../../utils/sorting'
import { Stack } from '@chakra-ui/react'
import TodoContainer from '../Todo/TodoContainer'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { useCallback, useEffect, useState } from 'react'

export default function List ({ items = [], isDraggable }) {
  const [listItems, setListItems] = useState(items)

  useEffect(() => setListItems(items), [items])

  const onDragEnd = useCallback((result) => {
    const { destination, source } = result

    // dropped outside the list
    if (!destination)
      return

    if (
      source.index === destination.index &&
        source.droppableId === destination.droppableId) return

    setListItems(prevListItems => reorder(prevListItems, source.index, destination.index))
  }, [])

  if (isDraggable)
    return (
      <DraggableContainer
        data-testid="draggable-container-area"
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId="todo-list-droppable-section">
          {
            (provided) => (
              <Stack
                {...provided.droppableProps}
                className="list__container"
                direction={'column'}
                h={'100%'}
                ref={provided.innerRef}
                w={'100%'}
              >
                {
                  listItems.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {
                        (provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TodoContainer
                              description={item.description}
                              id={item.id}
                              isCompleted={item.is_completed}
                              listId={item.list_id}
                              priority={item.priority}
                              title={item.title}
                            />
                          </div>
                        )
                      }
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </Stack>
            )
          }
        </Droppable>
      </DraggableContainer>
    )

  return (
    <Stack
      className="list__container"
      direction={'column'}
      h={'100%'}
      w={'100%'}
    >
      <Stack
        className="list__container"
        direction={'column'}
        gap={'0.5rem'}
        h={'100%'}
        w={'100%'}
      >
        {
          items.map((item) => (
            <TodoContainer
              description={item.description}
              id={item.id}
              isCompleted={item.is_completed}
              key={item.id}
              listId={item.list_id}
              priority={item.priority}
              title={item.title}
            />
          ))
        }
      </Stack>
    </Stack>
  )
}
