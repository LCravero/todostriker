'use client'

import { GoTasklist } from 'react-icons/go'
import { useRouter } from 'next/navigation'
import { Box, Card, CardBody, Heading, IconButton, Stack, Text } from '@chakra-ui/react'

export default function ListCard ({ data, variant = 'default' }) {
  const { id, name, todos: todosAmount, remainings } = data
  const router = useRouter()

  return (
    <Card
      _hover={{
        cursor: 'pointer'
      }}
      bg={'#9e86e5'}
      borderColor={variant === 'ghost' ? 'transparent' : '#6620a9'}
      h={{ base: '150px', md: '200px' }}
      variant="outline"
      w={{ base: '150px', md: '230px' }}
      onClick={() => router.push(`/lists/${id}`)}
    >
      <CardBody pb={'0.5rem'}>
        <Stack direction="column" justifyContent={'space-between'}>
          <Stack
            alignItems="flex-start"
            direction="row"
            gap={'0.5rem'}
          >
            <IconButton
              isRound
              icon={<GoTasklist />}
              size={'lg'}
              variant="ghost"
            />
            <Heading
              as="h5"
              color="whiteAlpha.600"
              size="lg"
            >
              {name}
            </Heading>
          </Stack>
          <Stack direction="row" gap={'1rem'}>
            <Box>
              <Text fontSize="xs">
                <strong>{todosAmount}</strong>
                {' '}
                todos
                </Text>
              <Text fontSize="xs">
                <strong>{remainings}</strong>
                {' '}
                remainings
              </Text>
            </Box>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  )
}
