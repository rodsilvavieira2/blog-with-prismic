import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import { HomeHeader, Layout, PostsRender } from '@components'
import { PrismicDocument } from '@types'
import { QueryPrismic } from '@util'

type HomeProps = {
  prevPage: string | null
  nextPage: string | null
  results: PrismicDocument[]
}

const Home: NextPage<HomeProps> = ({ results, nextPage }) => {
  return (
    <>
      <Head>
        <title>Codedev | Home</title>
      </Head>

      <Layout>
        <>
          <HomeHeader />

          <PostsRender data={results} nextPage={nextPage} />
        </>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData = {} }) => {
  const { ref } = previewData as any

  const queryClient = new QueryPrismic()

  const result = await queryClient.getPostPages({ ref, numberOfPages: 1 })

  return {
    props: {
      ...result
    }
  }
}

export default Home
