import React, { FC } from 'react'

const Button: FC<{
  title: string
  onClick: () => void
  styles?: React.CSSProperties
  isGold?: boolean
  isWhite?: boolean

  customClassName?: string
  disabled?: boolean
}> = ({ title, onClick, isGold = false, isWhite = false, styles = {}, customClassName = '', disabled = false }) => {
  return (
    <button
      style={styles}
      disabled={disabled}
      className={`${customClassName}  custom_button font-Gothic text-sm ${isGold ? 'custom_button_gold' : ''} ${
        isWhite ? 'custom_button_white' : ''
      } ${disabled ? 'custom_button_disabled' : ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
