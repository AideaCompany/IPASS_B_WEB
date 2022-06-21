import React, { FC } from 'react'

const Button: FC<{
  title: string
  onClick: () => void
  styles?: React.CSSProperties
  isGold?: boolean
  customClassName?: string
  disabled?: boolean
}> = ({ title, onClick, isGold = false, styles = {}, customClassName = '', disabled = false }) => {
  return (
    <button
      style={styles}
      disabled={disabled}
      className={`${customClassName}  custom_button font-Gothic text-sm ${isGold ? 'custom_button_gold' : ''} ${
        disabled ? 'custom_button_disabled' : ''
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
