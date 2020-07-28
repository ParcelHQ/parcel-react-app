import React from 'react';
import { Card, CardBody, Row, Col, FormGroup, Input } from 'reactstrap';

export default function Organizations() {
  return (
    <Row className="m-0">
      <Col sm="12">
        <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
          <CardBody className="text-center">
            <h1 className="font-large-3 my-1">Your Organizations</h1>

            <FormGroup>
              {/* <Label for="roundedInput">Rounded Input</Label> */}
              <Input
                className="round"
                type="text"
                id="roundedInput"
                placeholder="ethglobal"
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
