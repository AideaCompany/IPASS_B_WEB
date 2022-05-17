import '../styles/index.scss'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../providers/AuthContext'
import { ApolloProvider } from '@apollo/client'
import Client from '../graphql/config'
import 'swiper/css'
import 'swiper/css/pagination'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="global_container">
      <ApolloProvider client={Client}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </div>
  )
}

export default MyApp
