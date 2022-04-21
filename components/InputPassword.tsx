import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import React, { FC, useState } from 'react'
import Input from './Input'
const InputPassword: FC<{}> = () => {
  const [clicked, setClicked] = useState(false)
  return (
    <>
      {clicked ? (
        <Input
          placeHolder="Contraseña"
          name="password"
          onClickIcon={() => {
            setClicked(!clicked)
          }}
          icon={<EyeOutlined />}
        />
      ) : (
        <Input
          type="password"
          placeHolder="Contraseña"
          name="password"
          onClickIcon={() => {
            setClicked(!clicked)
          }}
          icon={<EyeInvisibleOutlined />}
        />
      )}
    </>
  )
}

export default InputPassword
