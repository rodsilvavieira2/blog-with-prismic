import Image from 'next/image'
import Link from 'next/link'

import { Box, Flex, Text } from '@chakra-ui/react'

import logo from '../../public/logo.svg'

export const HomeHeader = () => {
  return (
    <Box h="6rem" flexShrink={0}>
      <Link href="/" passHref>
        <Flex
          pos="relative"
          h="100%"
          as="a"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={logo} alt="codedev" />

          <Text fontWeight="600" fontSize="2xl" ml="0.7rem">
            Codedev
          </Text>
        </Flex>
      </Link>
    </Box>
  )
}
