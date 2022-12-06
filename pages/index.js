import { useEffect } from "react";
import factory from "../ethereum/factory";

import { Card, Button } from "semantic-ui-react";

import Link from "next/link";

export default function Home({ campaigns }) {

  const renderCompaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (<Link href={`/campaigns/${address}`}>View Campaign</Link>),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }



  return (
    <div>
      <h1>this is the root page!!!</h1>
      <Link href="/campaigns/new">
        <Button floated="right" content="Create Campaign" icon="add circle" primary />
      </Link>
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