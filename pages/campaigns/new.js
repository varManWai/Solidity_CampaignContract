import { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";

import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

export default function CampaignNew() {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <h3>Create Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) => {
              setMinimumContribution(event.target.value);
            }}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary>Create!</Button>
      </Form>
    </div>
  );
}
