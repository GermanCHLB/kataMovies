import React from 'react'
import { Alert } from 'antd'

const ErrorAlert = () => {
  return (
    <div>
      <Alert message="Error" description="Something went wrong..." type="error" showIcon />
    </div>
  )
}

export default ErrorAlert
