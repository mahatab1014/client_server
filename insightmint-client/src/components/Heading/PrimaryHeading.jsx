/* eslint-disable react/prop-types */
const PrimaryHeading = ({ heading_h1 }) => {
  return (
    <div className="relative">
      <h1 className="relative -top-5   text-2xl md:text-5xl font-semibold">
        {heading_h1}
      </h1>
    </div>
  );
};

export default PrimaryHeading;
