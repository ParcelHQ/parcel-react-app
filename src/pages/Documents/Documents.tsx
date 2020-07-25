import React from 'react';
import { Row, Col } from 'reactstrap';

import Import from '../../components/Import';
import SimpleTable from '../../components/Tables/SimpleTable';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';

const Documents = () => {
  return (
    <>
      <Import />
      <Row>
        <Col sm="12">
          <SimpleTable />
        </Col>
      </Row>
    </>
  );
};

export default Documents;
