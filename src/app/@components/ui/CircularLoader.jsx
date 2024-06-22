import { CircularProgress } from '@mui/material'
import React from 'react'

function CircularLoader() {
  return (
    <div className="flex justify-center items-center p-12"><CircularProgress></CircularProgress></div>
  )
}

export default CircularLoader