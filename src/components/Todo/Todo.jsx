/* eslint-disable camelcase */
'use client'

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  StackDivider,
  Tag,
  Text,
  Textarea
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { forwardRef, useMemo } from 'react'

const colorByPriority = {
  low: 'teal',
  important: 'purple',
  urgent: 'red'
}

const Todo = forwardRef((props, ref) => {
  const {
    data,
    onBlurSection,
    onChangePriority,
    onComplete,
    onDismiss,
    onEdit,
    onRemove,
    onSave,
    onSetTitle
  } = props

  const {
    title,
    description,
    priority,
    is_completed,
    // list_id,
    editable,
    toUpdate
  } = data

  const badgeColor = useMemo(() => colorByPriority[priority], [priority])

  return (
    <Card
      bg="whiteAlpha.200"
      borderColor={is_completed ? 'teal' : 'gray'}
      // display={{ base: 'grid', md: 'block' }}
      h={{ base: 'auto', md: 'auto' }}
      // justifyContent={{ base: 'center' }}
      variant="outline"
      w={{ base: '400px', md: '100%' }}
      // minH={'150px'}
    >
      <CardBody pb={'0.5rem'}>
        {
            editable && !is_completed
              ? (
                  <Input
                    _placeholder={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                    defaultValue={title}
                    mb={'0.5rem'}
                    name="title"
                    placeholder="Todo title"
                    ref={ref.titleRef}
                    size={'lg'}
                    variant="unstyled"
                    onBlur={(event) => onBlurSection({
                      event,
                      section: 'title'
                    })}
                    onKeyUp={onSetTitle}
                  />
                )
              : (
                  <Stack alignItems={'center'} direction="row" mb={'0.5rem'}>
                    <IconButton
                      isRound
                      aria-label="Complete todo"
                      colorScheme="teal"
                      icon={<CheckIcon />}
                      isActive={is_completed}
                      size={'sm'}
                      variant="ghost"
                      onClick={onComplete}
                    />
                    <Heading
                      as="h3"
                      color={`${is_completed ? 'teal' : 'gray'}`}
                      size="lg"
                    >
                      {title}
                    </Heading>
                  </Stack>
                )
          }
        <Stack divider={<StackDivider />}>
          {
            editable && !is_completed
              ? (
                <Textarea
                  bg="whiteAlpha.300"
                  defaultValue={description}
                  fontSize={'sm'}
                  placeholder={description}
                  ref={ref.descriptionRef}
                  resize="none"
                  onBlur={(event) => onBlurSection({
                    event,
                    section: 'description'
                  })}
                />
                )
              : (
                  <Text
                    as={'i'}
                    color={'gray'}
                    fontSize={'sm'}
                  >
                    {description}
                  </Text>
                )
          }
        </Stack>
      </CardBody>

      <CardFooter pb={'1.5rem'}>
        {
          editable && !is_completed
            ? (
              <Stack direction="row" justify="space-between" w="100%">
                <Box>
                  <Select
                    isDisabled={is_completed}
                    placeholder="Priority"
                    size="sm"
                    variant="flushed"
                    onChange={onChangePriority}
                  >
                    <option value="low">Low</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </Select>
                </Box>

                <ButtonGroup spacing={'0.5rem'} variant="ghost">
                  <Button
                    colorScheme="purple"
                    fontSize={{ base: 'xs', md: 'sm' }}
                    size="sm"
                    variant="ghost"
                    onClick={onDismiss}
                  >
                    Dismiss
                  </Button>
                  <Button
                    colorScheme="teal"
                    fontSize={{ base: 'xs', md: 'sm' }}
                    size="sm"
                    variant="ghost"
                    onClick={onSave}
                  >
                    {
                      toUpdate
                        ? 'Update'
                        : 'Save'
                    }
                  </Button>
                </ButtonGroup>
              </Stack>
              )
            : (
              <Stack
                alignItems={'center'}
                direction="row"
                justify="space-between"
                w="100%"
              >
                <Flex alignContent={'center'}>
                  <Tag
                    borderRadius={'lg'}
                    colorScheme={badgeColor}
                    size={{ base: 'sm', md: 'md' }}
                  >
                    {priority}
                  </Tag>
                </Flex>
                <Stack direction="row">
                  <IconButton
                    isRound
                    aria-label="Edit todo"
                    colorScheme="teal"
                    icon={<EditIcon />}
                    isDisabled={is_completed}
                    variant="ghost"
                    onClick={onEdit}
                  />
                  <IconButton
                    isRound
                    aria-label="Remove todo"
                    colorScheme="purple"
                    icon={<DeleteIcon />}
                    isDisabled={is_completed}
                    variant="ghost"
                    onClick={onRemove}
                  />
                </Stack>
              </Stack>
              )
        }
        </CardFooter>
    </Card>
  )
})

export default Todo
