import Prismic from '@prismicio/client'
import type { DefaultClient } from '@prismicio/client/types/client'
import { getPrismicClient } from '@services'

type qetPostPagesParams = {
  numberOfPages?: number
  ref?: any
}

export class QueryPrismic {
  private prismicClient: DefaultClient = getPrismicClient()

  async getAllPosts () {
    const { results } = await this.prismicClient.query(
      Prismic.Predicates.at('document.type', 'post')
    )

    return results
  }

  async getPostPages ({ numberOfPages = 2, ref = null }: qetPostPagesParams) {
    const { results, prev_page, next_page } = await this.prismicClient.query(
      Prismic.Predicates.at('document.type', 'post'),
      {
        pageSize: numberOfPages,
        ref,
        orderings: '[document.first_publication_date desc]'
      }
    )

    return {
      prevPage: prev_page,
      nextPage: next_page,
      results
    }
  }

  async getPostByUUID (uuid: string) {
    const result = await this.prismicClient.getByUID('post', uuid, {})

    return result
  }

  async getNextPage (currentPageID: string) {
    const { results } = await this.prismicClient.query(
      Prismic.Predicates.at('document.type', 'post'),
      {
        after: currentPageID,
        pageSize: 1
      }
    )

    if (results.length) {
      return {
        uid: results[0].uid as string,
        title: results[0].data.title
      }
    }

    return null
  }
}
