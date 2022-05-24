import React from 'react'
import { Spin as SpinAntd } from 'antd'
const Spin = (props: { children: JSX.Element; loading: boolean }) => {
  return <>{props.loading ? <SpinAntd tip={'Cargando ...'}>{props.children}</SpinAntd> : <>{props.children}</>}</>
}

export default Spin
