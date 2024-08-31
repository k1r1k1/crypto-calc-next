import { Metadata } from "next";
import Calculator from './components/Calculator'

export const metadata: Metadata = {
  title: 'Crypto calc - Main',
}

const requestHeaders: HeadersInit = new Headers()
requestHeaders.set('Content-Type', 'application/json;charset=utf-8')
requestHeaders.set('X-CMC_PRO_API_KEY', process.env.API_CMC_KEY || '')

async function getFiat() {
  const res = await fetch('https://pro-api.coinmarketcap.com/v1/fiat/map?limit=20', {
    headers: requestHeaders
  })

  return await res.json()
}

const Home = async () => {
  const { data: fiatData, status: fiatStatus } = await getFiat()

  return (
    <Calculator {...{ fiatData, fiatStatus } } />
  );
}

export default Home
