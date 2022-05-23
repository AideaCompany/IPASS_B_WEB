import useAuth from '@/providers/AuthContext'
import { updateClientFn } from '@/services/clients'
import { message } from 'antd'
import { DarkMode, DisableNotifications, History, PaymentMethods, Profile, Schedule, Support, TermsOfService } from 'icons/profileIcons'
import React from 'react'
import PhotoPicker from '../FormComponents/PhotoPicker'
import ConfigElements from './ConfigElements'

const Config = () => {
  const configElements = [
    {
      icon: <Profile />,
      text: 'Configuración de perfil',
      onClick: () => {}
    },
    {
      icon: <Schedule />,
      text: 'Mi horario',
      onClick: () => {}
    },
    {
      icon: <PaymentMethods />,
      text: 'Métodos de pago',
      onClick: () => {}
    },
    {
      icon: <History />,
      text: 'Historial de reservas',
      onClick: () => {}
    },
    {
      icon: <Support />,
      text: 'Soporte',
      onClick: () => {}
    },
    {
      icon: <DarkMode />,
      text: <>Modo Oscuro</>,
      onClick: () => {}
    },
    {
      icon: <DisableNotifications />,
      text: 'Desactivar Notificaciones',
      onClick: () => {}
    },
    {
      icon: <TermsOfService />,
      text: 'Términos y condiciones',
      onClick: () => {}
    }
  ]
  const { user } = useAuth()
  const updatePhoto = async (value: File) => {
    await updateClientFn({ _id: user?._id as string, photo: value })
    message.success('Foto de perfil actualizada')
  }
  return (
    <div className="config_container">
      <p className="font-Helvetica text-black font-bold text-lg">{`${user?.name1} (${user?.email})`}</p>
      <div className="container_image">
        <PhotoPicker onChange={updatePhoto} initialValue={user?.photo} />
      </div>
      <div className="container_config_elements">
        {configElements.map((configElement, i) => (
          <React.Fragment key={i}>
            <ConfigElements element={configElement} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Config
