// pages/_app.js
import { ChakraProvider, color, extendTheme } from '@chakra-ui/react'
import "../styles/Home.module.css"
import "animate.css";
import { fontSize } from '@mui/system';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme= extendTheme({colors});

function MyApp({ Component, pageProps }) {
  return (
    
    <ChakraProvider theme={theme}>
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp