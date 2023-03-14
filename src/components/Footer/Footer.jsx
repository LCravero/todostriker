import { GoOctoface } from 'react-icons/go'
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden
} from '@chakra-ui/react'

const SocialButton = ({
  children,
  label,
  href
}) => (
    <chakra.button
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}
      alignItems={'center'}
      as={'a'}
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      cursor={'pointer'}
      display={'inline-flex'}
      h={8}
      href={href}
      justifyContent={'center'}
      rounded={'full'}
      transition={'background 0.3s ease'}
      w={8}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
)

export default function SmallWithSocial () {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        align={{ base: 'center', md: 'center' }}
        as={Stack}
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        maxW={'6xl'}
        py={4}
        spacing={4}
      >
        <Text>
          © 2023 -
          {' '}
          <strong>TodoStriker</strong>
          . All rights reserved
        </Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            href={'https://github.com/LCravero/todostriker'}
            label={'GitHub'}
          >
            <GoOctoface />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
