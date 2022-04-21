import '../styles/index.scss'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="global_container">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
