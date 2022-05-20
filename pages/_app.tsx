import { CarProvider } from '@/providers/CarContext'
import { ApolloProvider } from '@apollo/client'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import 'swiper/css'
import 'swiper/css/pagination'
import Client from '../graphql/config'
import { AuthProvider } from '../providers/AuthContext'
import '../styles/index.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="global_container">
      <ApolloProvider client={Client}>
        <AuthProvider>
          <CarProvider>
            <Component {...pageProps} />
          </CarProvider>
        </AuthProvider>
      </ApolloProvider>
    </div>
  )
}

export default MyApp
