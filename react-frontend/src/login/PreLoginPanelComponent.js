import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

import PeerlyTextAndLogo from "shared-components/peerly-logo/PeerlyTextAndLogo";
import InformativeTextComponent from "login/InformativeTextComponent";
import LoginImageComponent from "login/LoginImageComponent";

const Wrapper = styled(Container)`
  height: 100vh;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--black)" : "var(--white)"};
`;

const RowComponent = styled(Row)`
  height: calc(100% / 3);
`;

const PreLoginPanelComponent = ({
  theme,
  className,
  informativeText,
  encouragementThought,
}) => (
  <Wrapper
    theme={theme}
    className={`d-sm-block d-xs-block d-md-none ${className}`}
    data-testid="officeInfo"
  >
    <RowComponent>
      <Col className="m-auto">
        <PeerlyTextAndLogo theme={theme} />
      </Col>
    </RowComponent>
    <RowComponent className="overflow-hidden">
      <Col className="p-0">
        <LoginImageComponent className="img-fluid" />
      </Col>
    </RowComponent>
    <RowComponent>
      <Col className="m-auto">
        <InformativeTextComponent
          theme={theme}
          informativeText={informativeText}
          encouragementThought={encouragementThought}
        />
      </Col>
    </RowComponent>
  </Wrapper>
);

PreLoginPanelComponent.propTypes = {
  informativeText: PropTypes.string.isRequired,
  encouragementThought: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(["dark", "light"]),
  className: PropTypes.string,
};

PreLoginPanelComponent.defaultProps = {
  theme: "dark",
};

export default React.memo(PreLoginPanelComponent);
