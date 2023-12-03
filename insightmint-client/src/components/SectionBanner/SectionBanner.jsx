/* eslint-disable react/prop-types */
const SectionBanner = ({heading, description}) => {
  return (
    <div
      className="hero bg-fixed"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1462396240927-52058a6a84ec?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-70 py-40"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md space-y-3">
          <h2 className="text-4xl md:text-5xl">{heading}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionBanner;
