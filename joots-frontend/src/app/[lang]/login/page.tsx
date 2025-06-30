'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useTranslations } from '@/contexts/TranslationContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useLocale } from '@/hooks/useTranslations'

export default function LoginPage() {
  const { dictionary } = useTranslations()
  const locale = useLocale()
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: `/${locale}/hub`,
      })

      if (result?.error) {
        setError(result.error)
      }
          } catch (err) {
        console.error(err)
        setError(dictionary.common.error)
      } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-gray-100'>
      <div className='bg-white p-6 rounded-2xl shadow-lg w-80'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold'>JOOTS</h1>
          <LanguageSwitcher />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            id='email'
            name='email'
            placeholder={dictionary.auth.email}
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete='email'
            className='w-full p-2 border rounded mb-2'
            disabled={isLoading}
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder={dictionary.auth.password}
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete='current-password'
            className='w-full p-2 border rounded mb-4'
            disabled={isLoading}
          />
          <button
            type='submit'
            className='w-full bg-purple-600 text-white p-2 rounded disabled:opacity-50'
            disabled={isLoading}
          >
            {isLoading ? dictionary.common.loading : dictionary.auth.signin}
          </button>
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        </form>
      </div>
    </div>
  )
}
