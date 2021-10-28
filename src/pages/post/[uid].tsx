import type { GetStaticProps, GetStaticPaths } from 'next'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { RichText } from 'prismic-reactjs'
import { useEffect, useRef, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { MdPerson, MdOutlineAccessTime } from 'react-icons/md'
import readingTime from 'reading-time'

import { Box, Text, Flex, Icon } from '@chakra-ui/react'
import { Layout, PostHeader } from '@components'
import { NextPageData, PostPage } from '@types'
import { QueryPrismic, TransformPrismicData } from '@util'

type PostPops = {
  pageData: PostPage
  nextPageData: NextPageData | null
}

const Post: NextPage<PostPops> = ({ pageData, nextPageData }) => {
  const [timeToRead, setTimeToRead] = useState('0 min read')
  const readingContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const innerHTML = readingContentRef.current?.innerHTML

    const time = readingTime(innerHTML ?? '')

    setTimeToRead(time.text)
  }, [])

  const { title, bannerUrl, html, publicAt, author } = pageData

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout>
        <PostHeader nextPageData={nextPageData} />

        <Box
          h={['10rem', '15rem', '20rem']}
          position="relative"
          flexShrink={0}
          overflow="hidden"
          borderRadius="base"
          mb="1rem"
        >
          <Image src={bannerUrl} layout="fill" alt={title} />
        </Box>

        <Text
          fontSize="2rem"
          fontWeight="700"
          as="h1"
          mb="1rem"
          color="highlight"
        >
          {title}
        </Text>

        <Flex
          alignItems={['flex-start', 'center']}
          mb="2rem"
          flexDir={['column', 'row']}
        >
          <Flex alignItems="center" fontSize="0.875rem" as="time">
            <Icon fontSize="1.2rem" as={FiCalendar} mr="0.5rem" />

            {publicAt}
          </Flex>

          <Flex
            alignItems="center"
            fontSize="0.875rem"
            textTransform="capitalize"
            ml={[0, '1rem']}
            mt={['0.5rem', 0]}
          >
            <Icon fontSize="1.2rem" as={MdPerson} mr="0.5rem" />

            {author}
          </Flex>

          <Flex
            alignItems="center"
            fontSize="0.875rem"
            ml={[0, '1rem']}
            mt={['0.5rem', 0]}
          >
            <Icon fontSize="1.2rem" as={MdOutlineAccessTime} mr="0.5rem" />

            {timeToRead}
          </Flex>
        </Flex>

        <Box
          lineHeight="1.5"
          textAlign="justify"
          pb="10rem"
          ref={readingContentRef}
          sx={{
            'h2, h3': {
              fontSize: '1.1rem',
              fontWeight: '600',
              pb: '0.7rem',
              color: 'heading'
            },
            p: {
              color: 'body'
            },
            '* + h3': {
              mt: '2rem'
            },
            'p + p, ul': {
              mt: '1rem'
            },
            ul: {
              listStyle: 'none',
              'li::before': {
                content: '"\u2022"',
                display: 'inline-block',
                color: 'highlight',
                fontWeight: 'bold',
                mr: '0.5rem'
              }
            }
          }}
        >
          <RichText render={html} />
        </Box>
      </Layout>
    </>
  )
}

export default Post

type Params = { uid: string }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { uid } = params as Params

  const queryClient = new QueryPrismic()

  const result = await queryClient.getPostByUUID(uid)

  const pageData = TransformPrismicData.toPostPageData(result)

  const nextPageData = await queryClient.getNextPage(result.id)

  return {
    props: {
      pageData,
      nextPageData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const queryClient = new QueryPrismic()

  return {
    paths: (await queryClient.getPostPages({ numberOfPages: 20 })).results.map(
      (post) => `/post/${post.uid}`
    ),
    fallback: false
  }
}
