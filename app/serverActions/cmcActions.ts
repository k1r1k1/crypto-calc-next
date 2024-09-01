'use server'

const requestHeaders: HeadersInit = new Headers()
requestHeaders.set('Content-Type', 'application/json;charset=utf-8')
requestHeaders.set('X-CMC_PRO_API_KEY', process.env.API_CMC_KEY || '')

export async function getCryptos(_: any, fiat: string | undefined) {
  return fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20${fiat ? `&convert=${fiat}` : ''}`, {
    headers: requestHeaders
  })
    .then(resp => resp.json())
    .then(resp => resp.data)
    .catch(e => e)
}

export async function getFiat() {
  return fetch('https://pro-api.coinmarketcap.com/v1/fiat/map?limit=20', {
    headers: requestHeaders
  })
    .then(resp => resp.json())
    .then(resp => resp.data)
    .catch(e => e)
}
