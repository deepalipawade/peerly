import React from "react";
//import { Col, Row } from "react-bootstrap";
import Styled from "styled-components";

import LabelComponent from "core-components/Label/LabelComponent";
import Row from "core-components/row/rowComponent";
import Col from "core-components/col/colComponents";

const Logo = Styled.div`
& {
  width: 50px;
  height: 50px;   
  position: absolute;
  top: 10px;
  transform: rotate(45deg);
}
&: before {
  content: "";
  width: 20px;
  height: 20px;
  border: 2px solid black;              
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
}  
`;
const PlusSign = Styled.div`
position: absolute;
top: 55%;
left: 55%;
transform: translate(-50%, -50%) rotate(-45deg);
color: black;
`;

const LogoComponent = () => (
  <Row className="d-flex flex-column" data-testid="peerlyLogoComponent">
    <Col className="d-flex justify-content-center">
      <Logo>
        <PlusSign>
          <LabelComponent text="+" className="text-center w-100" />
        </PlusSign>
      </Logo>
    </Col>
    <Col>
      <LabelComponent
        text="Peerly"
        className="text-black mt-5 pt-1 text-center w-100"
      />
    </Col>
  </Row>
);

export default LogoComponent;