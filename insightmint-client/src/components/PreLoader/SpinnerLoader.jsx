import { RevolvingDot } from "react-loader-spinner";

const SpinnerLoader = () => {
  return (
    <>
      <section className="flex justify-center">
        <RevolvingDot
          radius="45"
          strokeWidth="5"
          color="red"
          secondaryColor="green"
          ariaLabel="revolving-dot-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </section>
    </>
  );
};

export default SpinnerLoader;
