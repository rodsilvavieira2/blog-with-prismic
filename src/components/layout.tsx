import { ReactNode } from 'react'

import { Flex } from '@chakra-ui/react'

type LayoutProps = {
  children: ReactNode[] | ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex h="100vh">
      <Flex
        w="100%"
        maxW={['85%', '80%', '43.75rem']}
        mx="auto"
        flexDir="column"
      >
        {children}
      </Flex>
    </Flex>
  )
}
