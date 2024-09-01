import { Metadata } from "next";
import Calculator from "./components/Calculator"
import { getCryptos, getFiat } from "./serverActions/cmcActions"

export const metadata: Metadata = {
  title: 'Crypto calc - Main',
}

interface Props {
  pairs?: string[] | string;
}

const Home = async ({ pairs }: any) => {
  const fiatData = await getFiat()
  const cryptoData = await getCryptos(null, pairs && pairs[1] || undefined)

  return (
    <Calculator {...{ cryptoData, fiatData, pairs } } />
  );
}

export default Home
