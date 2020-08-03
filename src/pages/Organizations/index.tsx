import React from 'react';
import { Card, CardBody, Button, Row, Label, Col, FormGroup } from 'reactstrap';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

export default function Organizations() {
  let history = useHistory();
  const organizationOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' },
  ];

  function selected() {
    history.push('/home');
  }

  return (
    <Row className="m-0">
      <Col sm="12">
        <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
          <CardBody className="text-center">
            <h1 className="font-large-3 my-1">Your Organizations</h1>
            <h1 className="font-large-1 my-1">
              Search through your currently existing orgs
            </h1>
            <FormGroup style={{ width: '50%', margin: 'auto' }}>
              <Label for="organizations" aria-labelledby="organizations" />

              <Select
                id="organizations"
                className="React"
                classNamePrefix="select"
                defaultValue={organizationOptions[0]}
                name="organizations"
                options={organizationOptions}
                isClearable={true}
              />
            </FormGroup>
            <Button
              className="my-1"
              type="submit"
              color="primary"
              onClick={() => selected()}
            >
              Go
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
