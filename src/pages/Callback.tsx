import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { JwtTokenStatus, useGuard, User } from '@authing/guard-react18'

export default function Callback() {
  const history = useHistory()
  const guard = useGuard()

  const handleCallback = async () => {
    try {
      // 触发 guard.handleRedirectCallback() 方法完成登录认证
      // 用户认证成功之后，我们会将用户的身份凭证存到浏览器的本地缓存中
      await guard.handleRedirectCallback()

      // 处理完 handleRedirectCallback 之后，你需要先检查用户登录态是否正常
      const loginStatus: JwtTokenStatus | undefined  = await guard.checkLoginStatus()

      if (!loginStatus) {
        return console.error('Guard is not get login status')
      }

      // 获取到登录用户的用户信息
      const userInfo: User | null = await guard.trackSession()

      console.log(userInfo)

      // 跳转到固定页面
      history.replace('/personal')
      
    } catch (e) {
      // 登录失败，推荐再次跳转到登录页面
      console.error('Guard handleAuthingLoginCallback error: ', e)
    }
  }

  useEffect(() => {
    handleCallback()
  })

  return <div>This is Callback page</div>
}
