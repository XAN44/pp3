'use client'

import React, { useState, useTransition } from 'react'
import { Button, Input } from '@nextui-org/react'
import { ResetPassword } from '../../../../server/resetPw'

function ResetPasswordForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const handleVerifyEmail = async () => {
    setError('')
    setSuccess('')

    if (!email) {
      setError('กรุณากรอกอีเมล')
      return
    }

    // ตรวจสอบอีเมล
    const response = await ResetPassword({ email, password: '' })

    if (response?.error) {
      setError(response.error)
    } else {
      setIsEmailVerified(true)
      setSuccess('อีเมลถูกต้อง กรุณากรอกรหัสผ่านใหม่')
    }
  }

  const handleResetPassword = () => {
    setSuccess('')
    setError('')
    startTransition(async () => {
      if (!email || !password) {
        setError('กรุณากรอกข้อมูลให้ครบถ้วน')
        return
      }
      const response = await ResetPassword({ email, password })

      if (response?.error) {
        setError(response?.error)
      }
      setSuccess(response?.success)
    })
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      {!isEmailVerified ? (
        <>
          <Input
            type="text"
            placeholder="Email"
            className="mt-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={handleVerifyEmail}
            className="mt-4 w-full bg-blue-500 text-white"
          >
            Verify Email
          </Button>
        </>
      ) : (
        <>
          <Input
            type="password"
            placeholder="New Password"
            className="mt-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleResetPassword}
            className="mt-4 w-full bg-blue-500 text-white"
          >
            Reset Password
          </Button>
        </>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-emerald-500">{success}</p>}
    </div>
  )
}

export default ResetPasswordForm
