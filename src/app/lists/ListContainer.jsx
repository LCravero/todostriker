'use client'

import { createTodosListInDB } from '@/services/todoslist.services'
import { getAllListTodos } from '@/services/todo.services'
import ListCard from './ListCard'
import NewListCard from './NewListCard'
import { useState } from 'react'
import { Container, Grid, GridItem, Heading, useColorModeValue } from '@chakra-ui/react'

export default function ListsContainer ({ todosList }) {
  const [lists, setLists] = useState(todosList)
  const listContainerHeaderColor = useColorModeValue('#555e6e', 'whiteAlpha.600')

  const onNewListsHandler = async () => {
    const { data: newList } = await createTodosListInDB({})

    const { id } = newList
    const { data: listTodos } = await getAllListTodos({ listId: id })

    console.log({ listTodos })
    const remainingTodos = listTodos.filter((todo) => !todo.is_completed)

    setLists((currListItems) => [
      ...currListItems,
      {
        ...newList,
        todos: listTodos.length,
        remainings: remainingTodos.length
      }
    ])
  }

  return (
    <Container
      centerContent
      h={'100%'}
      minW={'100%'}
      p={{ base: '1rem', md: '1rem', lg: '1rem' }}
    >
      <Grid
        gridRowGap={'1rem'}
        h={'100%'}
        templateColumns={{
          base: 'minmax(400px, 600px)',
          md: 'minmax(400px, 800px)'
        }}
        templateRows={{
          base: 'auto minmax(400px, 600px)',
          md: 'auto minmax(500px, 700px)'
        }}
      >
        <GridItem>
          <Heading
            as="h3"
            color={listContainerHeaderColor}
            size="lg"
          >
            My Lists
          </Heading>
        </GridItem>
        <GridItem
          p={'1rem'}
        >
          <Grid
            gridGap={'1rem'}
            templateColumns={{
              base: 'repeat(auto-fill, minmax(200px, 200px))',
              md: 'repeat(auto-fill, minmax(200px, 240px))'
            }}
          >
            <GridItem>
              <NewListCard variant={'ghost'} onNewList={onNewListsHandler} />
            </GridItem>
            {
              lists.map((list) => (
                <ListCard data={list} key={list.id} />
              ))
            }
          </Grid>
        </GridItem>
      </Grid>
    </Container>
  )
}
