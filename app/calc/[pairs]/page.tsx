import Home from "@/app/page";

interface Props {
  params: {
    pairs?: string;
  }
}

const Pair = ({ params }: Props) => (
  <Home pairs={params.pairs?.split('-')} />
)

export default Pair
