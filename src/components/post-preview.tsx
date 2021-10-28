import Link from 'next/link'
import { memo } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { MdPerson } from 'react-icons/md'

import { Text, Flex, Icon } from '@chakra-ui/react'
import { Post } from '@types'

type PostPreviewProps = Post

const base = ({ author, publicAt, subTitle, title, uid }: PostPreviewProps) => {
  return (
    <Flex
      flexDir="column"
      maxW="100%"
      py='0.5rem'
      sx={{
        '> * + *': { mt: '0.5rem' },
        '> *': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxW: '100%',
          whiteSpace: 'nowrap'
        }
      }}
    >
      <Link href={`/post/${uid}`} passHref>
        <Text
          as="a"
          fontWeight="700"
          fontSize="1.75rem"
          _hover={{
            color: 'highlight'
          }}
          transition="color 0.3s"
        >
          {title}
        </Text>
      </Link>

      <Text as="small" fontSize="1.125rem" fontWeight="400" color="body">
        {subTitle}
      </Text>

      <Flex alignItems="center" color="body">
        <Flex as="time" alignItems="center" fontSize="0.875rem">
          <Icon fontSize="1.1rem" mr="0.4rem" as={FiCalendar} />

          {publicAt}
        </Flex>

        <Flex
          textTransform="capitalize"
          ml="1rem"
          as="span"
          alignItems="center"
          fontSize="0.875rem"
        >
          <Icon fontSize="1.1rem" mr="0.4rem" as={MdPerson} />

          {author}
        </Flex>
      </Flex>
    </Flex>
  )
}

export const PostPreview = memo(base)
