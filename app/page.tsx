import { Metadata } from "next";
import Calculator from "./components/Calculator"
import { getCryptos, getFiat } from "./serverActions/cmcActions"

export const metadata: Metadata = {
  title: 'Crypto calc - Main',
}

const Home = async () => {
  const fiatData = await getFiat()
  const cryptoData = await getCryptos(null, undefined)

  return (
    <Calculator {...{ cryptoData, fiatData } } />
  );
}

export default Home
