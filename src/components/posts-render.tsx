import axios from 'axios'
import { useCallback, useState } from 'react'

import { Stack, Button, useToast } from '@chakra-ui/react'
import { PrismicDocument } from '@types'
import { TransformPrismicData } from '@util'

import { PostPreview } from './post-preview'
import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse'

type PostsRenderProps = {
  data: PrismicDocument[]
  nextPage: string | null
}

export const PostsRender = ({ data, nextPage }: PostsRenderProps) => {
  const [posts, setPosts] = useState(() => {
    return TransformPrismicData.toPostLinksData(data)
  })

  const [nextPageLink, setNextPageLink] = useState(()=> nextPage)

  const [isLoadingForPosts, setIsLoadingForPosts] = useState(false)

  const toast = useToast()

  const getMorePosts = useCallback(async () => {
    if (nextPageLink) {
      setIsLoadingForPosts(true)

      try {
        const { data } = await axios.get<ApiSearchResponse>(nextPageLink)
        const transformedData = TransformPrismicData.getNextPage(data)

        setPosts((prev) => [...prev, ...transformedData.pageData])
        setNextPageLink(transformedData.nextPageLink)
        setIsLoadingForPosts(false)
      } catch {
        toast({
          title: 'Get new posts',
          description: 'Error on getting new posts',
          status: 'error'
        })

        setIsLoadingForPosts(false)
      }
    }
  }, [nextPageLink])

  return (
    <Stack
      spacing="1.5rem"
      pb='10rem'
      sx={{
        '> div + div': {
          borderTop: '1px solid',
          borderColor: 'info'
        }
      }}
    >
      {posts.map((item) => (
        <PostPreview key={item.uid} {...item} />
      ))}

      {nextPageLink && (
        <Button
          size='lg'
          alignSelf="center"
          boxShadow="base"
          colorScheme="pink"
          isLoading={isLoadingForPosts}
          loadingText="Loading..."
          onClick={getMorePosts}
        >
          Load more posts...
        </Button>
      )}
    </Stack>
  )
}
