import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    highlight: '#FF57B2',
    heading: '#F8F8F8',
    background: '#1A1D23',
    info: '#BBBBBB',
    body: '#D7D7D7'
  },
  styles: {
    global: {
      body: {
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: 'background',
        color: 'heading'
      }
    }
  }
})
