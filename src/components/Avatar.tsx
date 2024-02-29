import React from 'react'

import logo from '../logo.svg'

interface AvatarProps {
  email: string
}

const Avatar: React.FC<AvatarProps> = ({ email }) => (
  <div className="Avatar">
    <img src={logo} className="Avatar__img" alt="avatar" />
    <div className="Avatar__text">{email}</div> 
  </div>
)

export default Avatar
