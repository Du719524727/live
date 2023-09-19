import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { JwtTokenStatus, useGuard, User } from '@authing/guard-react18'


export default function TestGuard4 () {
  const history = useHistory()
  const guard = useGuard()

  const handleCallback = async () => {
    try {
      // await guard.handleRedirectCallback()

      const loginStatus: JwtTokenStatus | undefined  = await guard.checkLoginStatus()

      if (!loginStatus) {
        return console.error('Guard is not get login status')
      }

      const userInfo: User | null = await guard.trackSession()

      console.log(userInfo)

      // history.replace('/basics')

    } catch (e) {

      console.error('Guard handleAuthingLoginCallback error: ', e)

      history.replace('/')  
    }
  }

  useEffect(() => {
    handleCallback()
  })

  guard.start('#authing-guard-container')
    .then(userInfo => {
    console.log('userInfo: ', userInfo)
    history.replace('/basics')
    // handleCallback()
    })
    .catch(userInfo => {
      history.replace('/')     
    })
  

  return <>
    <div id="authing-guard-container"></div>
  </>
}