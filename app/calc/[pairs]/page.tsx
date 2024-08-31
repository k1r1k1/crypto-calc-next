const Pair = ({ params }: any) => {
  console.log('params', params)
  return (
    <>
      <h4 className="text-success">{params.pairs}</h4>
    </>
  );
}

export default Pair
