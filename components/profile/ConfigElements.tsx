import React from 'react'

const ConfigElements = ({ element }: { element: { icon: JSX.Element; text: string | JSX.Element; onClick: () => void } }) => {
  return (
    <div className="container_config_element cursor-pointer" onClick={element.onClick}>
      <span style={{ fontSize: '2rem' }}>{element.icon}</span>
      <p className="font-Helvetica text-light-black font-normal  text-lg">{element.text}</p>
    </div>
  )
}

export default ConfigElements
