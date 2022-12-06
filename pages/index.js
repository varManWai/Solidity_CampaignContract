import { useEffect } from "react";
import factory from "../ethereum/factory";

import { Card } from "semantic-ui-react";

export default function Home({ campaigns }) {

  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    };
  });

  return (
    <div>
      <h1>this is the root page!!!</h1>
      <Card.Group items={items} />;
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