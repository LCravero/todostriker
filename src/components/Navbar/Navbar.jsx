import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
  useColorMode,
  useColorModeValue
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

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} minW="100%" px={4}>
        <Flex alignItems={'center'} h={16} justifyContent={'space-between'}>
          <NavLink href="/"><strong>TODOSTRIKER</strong></NavLink>
          <Flex gap={'1rem'}>
            <NavLink href="/lists">My Lists</NavLink>

            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button variant="ghost" onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
