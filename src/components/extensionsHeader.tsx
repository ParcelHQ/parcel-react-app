import React from 'react';
import { Row, Col } from 'reactstrap';

export default function ExtensionsHeader({ title, link, subTitle }: any) {
  return (
    <Row className="mb-2">
      <Col sm="12" className="ml-50">
        <p
          className="font-medium-5 mt-1 extension-title"
          data-tour="extension-title"
        >
          {title}
        </p>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {subTitle}
          </a>
        ) : (
          <p className="text-primary">{subTitle}</p>
        )}
      </Col>
    </Row>
  );
}
