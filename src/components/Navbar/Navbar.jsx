import {
  // Avatar,
  Box,
  Button,
  // Center,
  Flex,
  Link,
  /* Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList, */
  Stack,
  useColorMode,
  useColorModeValue
  // useDisclosure
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const NavLink = ({ children, href }) => (
  <Link
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700')
    }}
    href={href}
    px={2}
    py={1}
    rounded={'md'}
  >
    {children}
  </Link>
)

export default function Navbar () {
  const { colorMode, toggleColorMode } = useColorMode()
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} minW="100%" px={4}>
        <Flex alignItems={'center'} h={16} justifyContent={'space-between'}>
          <NavLink href="/"><strong>TODOSTRIKER</strong></NavLink>
          <NavLink href="/lists">My Lists</NavLink>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {/* <Menu>
                <MenuButton
                  as={Button}
                  cursor={'pointer'}
                  minW={0}
                  rounded={'full'}
                  variant={'link'}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>My Todos Lists</MenuItem>
                </MenuList>
              </Menu> */}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
