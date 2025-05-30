'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
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
        callbackUrl: '/hub',
      })

      if (result?.error) {
        setError(result.error)
      }
    } catch (err) {
      console.error(err)
      setError('Une erreur est survenue lors de la connexion.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-gray-100'>
      <div className='bg-white p-6 rounded-2xl shadow-lg w-80'>
        <h1 className='text-2xl font-bold text-center mb-4'>JOOTS</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email / ID Jootser'
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
            placeholder='Password'
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
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        </form>
      </div>
    </div>
  )
}
