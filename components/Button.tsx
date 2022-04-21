import React, { FC } from 'react'

const Button: FC<{ title: string; onClick: () => void; isGold?: boolean }> = ({ title, onClick, isGold = false }) => {
  return (
    <button className={`custom_button font-Gothic text-sm ${isGold ? 'custom_button_gold' : ''}`} onClick={onClick}>
      {title}
    </button>
  )
}

export default Button
