import { LineHeightOutlined } from '@ant-design/icons'
import React, { FC } from 'react'

const Button: FC<{ title: string; onClick: () => void; styles?: React.CSSProperties; isGold?: boolean; customClassName?: string }> = ({
  title,
  onClick,
  isGold = false,
  styles = {},
  customClassName = ''
}) => {
  return (
    <button
      style={styles}
      className={`${customClassName}  custom_button font-Gothic text-sm ${isGold ? 'custom_button_gold' : ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
