import ProtectRoute from '@/components/Auth/ProtectRoute'
import { CarProvider } from '@/providers/CarContext'
import { LoadingProvider } from '@/providers/LoadingContext'
import { ApolloProvider } from '@apollo/client'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import 'swiper/css'
import 'swiper/css/pagination'
import Client from '../graphql/config'
import { AuthProvider } from '../providers/AuthContext'
import '../styles/index.scss'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className="global_container">
      <ApolloProvider client={Client}>
        <AuthProvider>
          <ProtectRoute router={router}>
            <CarProvider>
              <LoadingProvider>
                <Component {...pageProps} />
              </LoadingProvider>
            </CarProvider>
          </ProtectRoute>
        </AuthProvider>
      </ApolloProvider>
    </div>
  )
}

export default MyApp
