import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";
import { Modal } from "core-components/modal/ModalComponent";

const Wrapper = styled.div`
  border: 1px solid var(--grey);
  background: var(--white) 0% 0% no-repeat padding-box;
  border-radius: 36px;
  opacity: 1;
  margin-top: 3%;
  margin-left: 35%;
  margin-right: 20%;
  height: 537px;
`;

const RecognitionListComponent = ({
  recognitionList,
  giveHi5func,
  show,
  handleClose,
  errorMessage,
}) => {
  const getDateFormate = (timestamp) =>
    new Date(timestamp * 1000).toDateString();

  return (
    <Wrapper className="sticky-top">
      {recognitionList.map((recognition) => (
        <RecognitionCardComponent
          key={recognition.id}
          giveHi5func={giveHi5func}
          recognitionId={recognition.id}
          givenByName={`${recognition.given_by_user.first_name} ${recognition.given_by_user.last_name}`}
          givenByImage={recognition.given_by_user.profile_image_url}
          givenForName={`${recognition.given_for_user.first_name} ${recognition.given_for_user.last_name}`}
          givenForImage={recognition.given_for_user.profile_image_url}
          givenAt={getDateFormate(recognition.given_at)}
          text={recognition.text}
          coreValue={recognition.coreValue.text}
          coreValueImage={recognition.coreValue.thumbnail_url}
          hi5Count={recognition.hi5Count.length}
        />
      ))}
      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body closeButton className="text-center text-danger">
          {errorMessage}
        </Modal.Body>
      </Modal>
      <div id="#1233" style={{ height: 1 }} className="text-center" />
    </Wrapper>
  );
};

RecognitionListComponent.propTypes = {
  recognitionList: PropTypes.array.isRequired,
  giveHi5func: PropTypes.func.isRequired,
  hi5Count: PropTypes.number,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default React.memo(RecognitionListComponent);
