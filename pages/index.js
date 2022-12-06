import { useEffect } from "react";
import factory from "../ethereum/factory";

export default function Home({ campaigns }) {

  return (
    <div>
      <h1>this is the root page!!!</h1>
      <div>{campaigns.map(value => {
        return (
          <div key={value}>{value}</div>
        )
      })}</div>
    </div>
  );
}

export async function getStaticProps() {
  const fetchData = await factory.methods.getDeployedCampaigns().call();

  // Data fetching
  return {

    // data added inside props will be
    // received by page component as `props`
    props: { campaigns: fetchData },
  };
}