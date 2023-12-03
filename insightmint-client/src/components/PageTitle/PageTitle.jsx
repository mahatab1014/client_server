/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} | Insight Mint`}</title>
    </Helmet>
  );
};

export default PageTitle;
