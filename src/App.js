import React from 'react'

import { GuardProvider } from '@authing/guard-react18'

import RouterComponent from './router/index.tsx'

import './App.css'

import '@authing/guard-react18/dist/esm/guard.min.css'

export default function App() {
  return (
    <>
      <GuardProvider
        appId="65015ead3a8ba1d4e74a33e8"
        redirectUri="https://console.authing.cn/console/get-started/65015ead3a8ba1d4e74a33e8" 
        onlogin={'/basics'}
      >
        <RouterComponent></RouterComponent>
      </GuardProvider>
    </>
  )
}