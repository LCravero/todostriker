'use client'
import { getTodosLists } from '@/services/todoslist.services'
import { List } from '@/components'
import { usePathname } from 'next/navigation'
import useTodos from '@/hooks/useTodos'
import { AddIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Grid, GridItem, Stack, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const getListName = async (listId) => {
  const EMPTY_NAME_FALLBACK = ''

  const { data, error } = await getTodosLists({
    byId: listId
  })

  if (error)
    return EMPTY_NAME_FALLBACK

  const [listData] = data
  const { name } = listData

  return name
}

const getListIdFromPathname = (pathname) => {
  const [, _path, id] = pathname.split('/')

  return String(id)
}

export default function ListID () {
  const [listName, setListName] = useState('')
  const [viewAll, setViewAll] = useState(true)
  const [viewCompleted, setViewCompleted] = useState(false)
  const pathname = usePathname()
  const listId = getListIdFromPathname(pathname)

  const { todos, getAllDBCompletedTodos, getAllTodos } = useTodos({
    byList: true, listId
  })
  const toast = useToast()

  useEffect(() => {
    getListName(listId)
      .then((name) => setListName(name))
      .catch(() => setListName(''))
  }, [listId])

  const onViewCompletedClickHandler = async (event) => {
    event.stopPropagation()
    setViewCompleted(!viewCompleted)
    setViewAll(false)

    const { error } = await getAllDBCompletedTodos({
      byList: true, listId
    })

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

    const { error } = await getAllTodos({
      byList: true, listId
    })

    if (error)
      toast({
        title: 'Error getting all todos',
        description: 'Ups... something went wrong.Try again!',
        status: 'error',
        variant: 'subtle',
        duration: 4000
      })
  }

  return (
    <Container
      centerContent
      h={'100%'}
      minW={'100%'}
      p={{ base: '1rem', md: '1rem', lg: '1.5rem' }}
    >
      <Grid
        gridGap={'1rem'}
        templateColumns={{
          base: '1fr', md: '1fr'
        }}
        templateRows={{
          base: 'auto 400px', md: 'auto 700px'
        }}
      >
        <GridItem>
          <Stack direction="column" gap={'2rem'}>
            <Box className="list-name">
              <Text as="b" fontSize="3xl">{listName}</Text>
            </Box>
            <Stack direction="row" justifyContent={'space-between'}>
              <Button
                colorScheme={'teal'}
                leftIcon={<AddIcon />}
                size={'sm'}
                variant="solid"
                onClick={() => {}}
              >
                New Todo
              </Button>
              <Stack direction="row" gap={'0.5rem'}>
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
                  leftIcon={viewAll
                    ? <ViewIcon />
                    : <ViewOffIcon />}
                  mt={0}
                  size={{ base: 'xs', md: 'sm' }}
                  variant="link"
                  onClick={onViewAllClickHandler}
                >
                  All
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </GridItem>
        <GridItem
          h={'100%'}
          overflowY={'auto'}
        >
          <List isDraggable items={todos} />
        </GridItem>
      </Grid>
    </Container>
  )
}
