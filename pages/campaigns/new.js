import { useState } from "react";
import { Form, Button, Input} from "semantic-ui-react";

export default function CampaignNew() {
  const [minimumContribution, setMinimumContribution] = useState('')

  
  return (
    <div>
       <h3>Create Campaign</h3>
        <Form>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input label="wei" labelPosition="right"
            value={minimumContribution}
            onChange={(event)=>{
              setMinimumContribution(event.target.value);
            }}
            />
          </Form.Field>
          <Button primary>Create!</Button>
        </Form>
    </div>
  );
}
