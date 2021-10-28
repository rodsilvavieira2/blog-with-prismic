import Image from 'next/image'
import Link from 'next/link'
import { MdArrowForwardIos } from 'react-icons/md'

import { Flex, Text, IconButton, Box, Tooltip } from '@chakra-ui/react'
import { NextPageData } from '@types'

import logo from '../../public/logo.svg'

type PostHeaderProps = {
  nextPageData: NextPageData | null
}

export const PostHeader = ({ nextPageData }: PostHeaderProps) => {
  return (
    <Flex
      h="6rem"
      alignItems="center"
      justifyContent="space-between"
      flexShrink={0}
    >
      <Box />

      <Link href="/" passHref>
        <Flex pos="relative" as="a">
          <Image src={logo} alt="codedev" />

          <Text fontWeight="600" fontSize="2xl" ml="0.7rem">
            Codedev
          </Text>
        </Flex>
      </Link>

      {nextPageData
        ? (
        <Link href={`/post/${nextPageData.uid}`} passHref>
          <Tooltip label={`next page: ${nextPageData.title}`}>
            <IconButton
              fontSize="2xl"
              color="highlight"
              colorScheme="facebook"
              bgColor="gray.700"
              aria-label="next post"
              boxShadow="base"
              as="a"
            >
              <MdArrowForwardIos />
            </IconButton>
          </Tooltip>
        </Link>
          )
        : (
        <Box />
          )}
    </Flex>
  )
}
