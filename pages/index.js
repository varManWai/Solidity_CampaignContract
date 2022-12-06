import { useEffect } from "react";
import factory from "../ethereum/factory";

import { Card, Button } from "semantic-ui-react";

export default function Home({ campaigns }) {

  const renderCompaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }



  return (
    <div>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
      ></link>
      <h1>this is the root page!!!</h1>

      <Button floated="right" content="Create Campaign" icon="add circle" primary />
      <div>{renderCompaigns()}</div>
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