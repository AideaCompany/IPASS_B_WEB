import type { NextPage } from 'next'
import Button from '../components/Button'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
const Home: NextPage = () => {
  const router = useRouter()
  return (
    <Layout>
      <div className="main_container_home">
        <p className="font-Butler font-bold text-5xl">VANT</p>

        <div className="container_buttons">
          <p className="font-Gothic text-gold">Aca podrás</p>
          <Button title="Iniciar sesión" onClick={() => router.push('login')} />
          <Button title="Registrarte" onClick={() => router.push('register')} />
        </div>
      </div>
    </Layout>
  )
}

export default Home
