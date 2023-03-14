/* eslint-disable no-nested-ternary */
'use client'

import { GoTasklist } from 'react-icons/go'
import { List } from '../components'
import styles from './page.module.css'
import { useMediaQuery } from '@chakra-ui/media-query'
import { useState } from 'react'
import useTodos from '../hooks/useTodos'
import useTodoStore from '../store/slices/todo-store-slice'
import { v4 as uuidV4 } from 'uuid'
import { AddIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Grid, GridItem, IconButton, Stack, Text, useToast } from '@chakra-ui/react'

export default function Home () {
  const { todos, createDBTodo, getAllDBCompletedTodos, getAllTodos } = useTodos({})
  const [viewCompleted, setViewCompleted] = useState(false)
  const [viewAll, setViewAll] = useState(true)
  const [isSmallScreen] = useMediaQuery('(max-width: 750px)')
  const toast = useToast()

  const [remainingTodosFromStore, addTodoToStorage] = useTodoStore((state) => [
    state.remainingTodos, state.addTodo
  ])

  console.log({ remainingTodosFromStore })

  const onAddTodoClickHandler = async (event) => {
    event.stopPropagation()
    const newTodoId = uuidV4()

    addTodoToStorage({ id: newTodoId })
    const { error } = await createDBTodo({ id: newTodoId })

    if (error)
      toast({
        title: 'Error adding todo',
        description: 'Ups... something went wrong.Try again!',
        status: 'error',
        variant: 'subtle',
        duration: 4000
      })
  }

  const onViewCompletedClickHandler = async (event) => {
    event.stopPropagation()
    setViewCompleted(!viewCompleted)
    setViewAll(false)

    const { error } = await getAllDBCompletedTodos({})

    if (error)
      toast({
        title: 'Error getting completed todos',
        description: 'Ups... something went wrong.Try again!',
        status: 'error',
        variant: 'subtle',
        duration: 4000
      })
  }

  const onViewAllClickHandler = async (event) => {
    event.stopPropagation()
    setViewAll(!viewAll)
    setViewCompleted(false)

    const { error } = await getAllTodos({})

    if (error)
      toast({
        title: 'Error getting all todos',
        description: 'Ups... something went wrong.Try again!',
        status: 'error',
        variant: 'subtle',
        duration: 4000
      })
  }

  const onCreateTodosListHandler = (event) => {
    event.stopPropagation()
    window.location.assign('/lists')
  }

  return (
    <Container
      centerContent
      h={'100%'}
      minW={'100%'}
      p={{ base: '1rem', md: '1rem', lg: '1.5rem' }}
    >
      <Grid
        gridRowGap={'1rem'}
        h={'100%'}
        templateColumns={{
          base: 'auto minmax(400px, 1fr)', md: 'auto minmax(400px, 1fr)'
        }}
        templateRows={{ base: '600px', md: '700px' }}
      >
        <GridItem
          className="todos-menu__container"
          colSpan={{ base: 1, lg: 1 }}
          h={'100%'}
          px={'0.5rem'}
          rowSpan={{ base: 1 }}
        >
          <Stack
            alignItems={'flex-start'}
            direction={{ base: 'row', md: 'column' }}
            gap={{ md: '2rem' }}
            h={'100%'}
            justifyContent={{ base: 'space-between', md: 'normal' }}
            px={{ md: '1rem' }}
            w={'100%'}
          >
            <Stack direction={{ base: 'column', md: 'column' }} pt={{ base: '2rem', md: '0' }}>
              {
                isSmallScreen
                  ? (
                    <IconButton
                      isRound
                      colorScheme={'teal'}
                      icon={<AddIcon />}
                      size={'sm'}
                      variant="solid"
                      onClick={onAddTodoClickHandler}
                    />
                    )
                  : (
                    <Button
                      colorScheme={'teal'}
                      leftIcon={<AddIcon />}
                      size={'md'}
                      variant="solid"
                      onClick={onAddTodoClickHandler}
                    >
                      New Todo
                    </Button>
                    )
              }
              {
                isSmallScreen
                  ? (
                    <IconButton
                      isRound
                      colorScheme={'purple'}
                      icon={<GoTasklist />}
                      size={'sm'}
                      variant="solid"
                      onClick={onCreateTodosListHandler}
                    />
                    )
                  : (
                      <Button
                        colorScheme={'purple'}
                        leftIcon={<GoTasklist />}
                        size={'md'}
                        variant="solid"
                        onClick={onCreateTodosListHandler}
                      >
                        Create List
                      </Button>
                    )
              }
            </Stack>

            {
              !isSmallScreen
                ? (
                  <Stack
                    direction={{ base: 'row', md: 'column' }}
                    gap={{ base: '2.5rem' }}
                    justifyContent="space-between"
                  >
                    <Stack
                      direction={{ base: 'row', md: 'column' }}
                      gap={{ base: '0.5rem', md: '0.5rem' }}
                    >
                      <Button
                        colorScheme={viewCompleted ? 'teal' : ''}
                        isActive={viewCompleted}
                        justifyContent={'flex-start'}
                        leftIcon={viewCompleted ? <ViewIcon /> : <ViewOffIcon />}
                        size={{ base: 'xs', md: 'sm' }}
                        variant="link"
                        onClick={onViewCompletedClickHandler}
                      >
                        Completed
                      </Button>
                      <Button
                        colorScheme={viewAll ? 'teal' : ''}
                        isActive={viewAll}
                        justifyContent={'flex-start'}
                        leftIcon={viewAll ? <ViewIcon /> : <ViewOffIcon />}
                        mt={0}
                        size={{ base: 'xs', md: 'sm' }}
                        variant="link"
                        onClick={onViewAllClickHandler}
                      >
                        All
                      </Button>
                    </Stack>
                    <Box className="remaining-legend__container">
                      {
                        remainingTodosFromStore
                          ? (
                            <span>
                              <strong>
                                {remainingTodosFromStore}
                                {' '}
                                remaining
                              </strong>
                            </span>
                            )
                          : (
                              <span><strong>🎉 Well Done!!</strong></span>
                            )
                      }
                    </Box>
                  </Stack>
                  )
                : null
            }
          </Stack>
        </GridItem>

        <GridItem
          className={styles.todosList__container}
          colSpan={{ base: 1, lg: 1 }}
          h={'100%'}
          overflowY={'auto'}
          px={'0.5rem'}
          rowSpan={{ base: 1, lg: 1 }}
        >
          {
            todos.length
              ? (
                  isSmallScreen
                    ? (
                      <Grid
                        rowGap={{ base: '0.5rem' }}
                        templateColumns={{ base: '1fr', lg: '1fr' }}
                        templateRows={{ base: 'auto 1fr', lg: '1fr' }}
                      >
                        <GridItem minW={'100%'}>
                          <Stack
                            direction="row"
                            justifyContent={{ base: 'space-between' }}
                          >
                            <Stack
                              direction={{ base: 'row' }}
                              gap={{ base: '0.5rem' }}
                            >
                              <Button
                                colorScheme={viewCompleted ? 'teal' : ''}
                                isActive={viewCompleted}
                                justifyContent={'flex-start'}
                                leftIcon={viewCompleted ? <ViewIcon /> : <ViewOffIcon />}
                                size={{ base: 'xs' }}
                                variant="link"
                                onClick={onViewCompletedClickHandler}
                              >
                                Completed
                              </Button>
                              <Button
                                colorScheme={viewAll ? 'teal' : ''}
                                isActive={viewAll}
                                justifyContent={'flex-start'}
                                leftIcon={viewAll ? <ViewIcon /> : <ViewOffIcon />}
                                mt={0}
                                size={{ base: 'xs' }}
                                variant="link"
                                onClick={onViewAllClickHandler}
                              >
                                All
                              </Button>
                            </Stack>
                            <Box className="remaining-legend__container">
                              {
                                remainingTodosFromStore
                                  ? (
                                    <Text fontSize={'xs'}>
                                      <strong>
                                        {remainingTodosFromStore}
                                        {' '}
                                        remaining
                                      </strong>
                                    </Text>
                                    )
                                  : (
                                      <Text fontSize={'xs'}><strong>🎉 Well Done!!</strong></Text>
                                    )
                              }
                            </Box>
                          </Stack>
                        </GridItem>
                        <GridItem minW={'100%'}>
                          <List isDraggable items={todos} />
                        </GridItem>
                      </Grid>
                      )
                    : (
                      <List isDraggable items={todos} />
                      )
                )
              : <Box
                  className="no-content"
                  display={'grid'}
                  p={'1rem'}
                  placeContent={'center'}
                >
                  <Text fontSize={{ base: '2xl' }}>No content to see</Text>
                </Box>
          }
        </GridItem>
      </Grid>
    </Container>
  )
}
