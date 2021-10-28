import { RichTextBlock } from 'prismic-reactjs'

import type { Document } from '@prismicio/client/types/documents'

export type Post = {
  uid: string
  title: string
  subTitle: string
  author: string
  publicAt: string
}

export type PostTypeData = [
  {
    heading: RichTextBlock[]
    content1: RichTextBlock[]
  }
]

export type PostPage = {
  html: RichTextBlock[]
  bannerUrl: string
} & Post

export type PrismicDocument = Document

export type NextPageData = {
  uid: string
  title: string
}
