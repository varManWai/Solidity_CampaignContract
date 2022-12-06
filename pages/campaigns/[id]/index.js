import { useRouter } from "next/router";
import { useEffect } from "react";
import Campaign from "../../../ethereum/campaign";

export default function CampaignShow(campaign) {
    //   const router = useRouter();
    //   const path = JSON.stringify(router.query);

    //   useEffect(() => {
    //     console.log(router.query.id);

    //     const campaign = Campaign(router.query.id);

    //     const testing = async () => {
    //       const data = await campaign.methods.getSummary().call();
    //       return data;
    //     };

    //     console.log(testing());
    //   }, []);

    return (
        <div>
            {console.log(campaign)}
            <h2>this is the id page</h2>
            <h2>this is something shit {campaign.minimumContribution}</h2>
        </div>
    );
}

export async function getServerSideProps(context) {

    const { id } = context.query;

    console.log(id);

    const campaign = Campaign(id);

    const fetchData = await campaign.methods.getSummary().call();

    console.log(fetchData);

    // Data fetching
    return {
        props: { 
            minimumContribution: fetchData[0],
            balance:fetchData[1],
            requestsCount:fetchData[2],
            approversCount:fetchData[3],
            manager:fetchData[4]
        
        },
    };
}
