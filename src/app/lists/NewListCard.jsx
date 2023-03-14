'use client'

import { GoTasklist } from 'react-icons/go'
import { Card, CardBody, Heading, IconButton, Stack, useColorModeValue } from '@chakra-ui/react'

export default function NewListCard ({ variant, listData, onNewList }) {
  const headingColor = useColorModeValue('whiteAlpha.600', 'whiteAlpha.500')

  if (!listData)
    return (
      <Card
        _hover={{
          cursor: 'pointer'
        }}
        bg={'#eaa6a6'}
        borderColor={variant === 'ghost' ? 'transparent' : '#bd0e0f'}
        h={{ base: '150px', md: '200px' }}
        variant="outline"
        w={{ base: '150px', md: '230px' }}
        onClick={onNewList}
      >
        <CardBody pb={'0.5rem'}>
          <Stack
            alignItems="center"
            direction="column"
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
              color={headingColor}
              size="lg"
            >
              New List
            </Heading>
          </Stack>
        </CardBody>
      </Card>
    )
}
