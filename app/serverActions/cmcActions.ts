'use server'
 
// import { redirect } from 'next/navigation'

const requestHeaders: HeadersInit = new Headers()
requestHeaders.set('Content-Type', 'application/json;charset=utf-8')
requestHeaders.set('X-CMC_PRO_API_KEY', process.env.API_CMC_KEY || '')

export async function getCryptos(prevState: any, fiat: string | undefined) {
  console.log('SERVER', { prevState, fiat })
  const res = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20${fiat ? `&convert=${fiat}` : ''}`, {
    headers: requestHeaders
  })

  const response = await res.json()

//   if (!res.ok) {
//     return { message: 'Please enter a valid email' }
//   }

//   redirect('/dashboard')

  return response.data
}
