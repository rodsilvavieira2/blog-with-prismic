import dayjs from 'dayjs'
import { RichTextBlock } from 'prismic-reactjs'

import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse'
import { Post, PostPage, PrismicDocument, PostTypeData } from '@types'

export class TransformPrismicData {
  static toRichText (data: PostTypeData) {
    return data.reduce<RichTextBlock[]>((acc, block) => {
      const node = [block.heading, block.content1].flat()
      return node.concat(acc)
    }, [])
  }

  static getPageData (source: PrismicDocument) {
    const { data, uid } = source

    return {
      uid: uid as string,
      title: data.title as string,
      subTitle: data.subtitle as string,
      author: data.author as string,
      publicAt: dayjs(data.last_publication_date as string).format(
        'DD MMMM YYYY'
      )
    }
  }

  static toPostLinksData (source: PrismicDocument[]): Post[] {
    return source.map((item) => this.getPageData(item))
  }

  static toPostPageData (source: PrismicDocument): PostPage {
    const { data } = source

    return {
      ...this.getPageData(source),
      html: this.toRichText(data.content),
      bannerUrl: data.banner.url
    }
  }

  static getNextPage (source: ApiSearchResponse) {
    return {
      pageData: source.results.map((item) => this.getPageData(item)),
      nextPageLink: source.next_page
    }
  }
}
