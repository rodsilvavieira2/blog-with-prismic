import { PrismicDocument } from '@types'

export const linkResolver = (doc: PrismicDocument) => {
  if (doc.type === 'page') {
    return `/post/${doc.uid}`
  }

  return '/'
}

export const hrefResolver = (doc: PrismicDocument) => {
  if (doc.type === 'page') {
    return '/post/[uid]'
  }

  return '/'
}
