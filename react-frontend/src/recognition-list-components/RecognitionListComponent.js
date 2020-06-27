import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";
import { Button } from "core-components/button/ButtonComponent";

const Wrapper = styled.div`
  border: 1px solid var(--grey);
  background: var(--white) 0% 0% no-repeat padding-box;
  border-radius: 36px;
  opacity: 1;
  padding-bottom: 19%;
  margin-left: 35%;
  margin-right: 20%;
  height: 537px;
  margin-top: 100px;
  position: fixed;
  overflow: scroll;
  overflow-y: hidden;
`;
const Sidebar = styled.div`
  height: 100vh;
  position: absolute;
  padding-left: 20px;
  background-color: navy;
  opacity: 0.8;
  color: white;
  width: 400px;
  position: fixed;
  z-index: 1000;
  margin-right: 800px;
  margin-left: 441px;
  margin-top: -78px;
  animation: slide-open 2s forwards;
`;
const RecognitionListComponent = ({
  recognitionList,
  giveHi5func,
  sliderOn,
  sliderOff,
  filter,
}) => {
  const getDateFormate = (timestamp) =>
    new Date(timestamp * 1000).toDateString();

  return (
    <Wrapper>
      <Button onClick={sliderOn}> click </Button>
      {filter ? (
        <Sidebar className="sidebar">
          <h2>Sidebar</h2>
          <button id="close" onClick={sliderOff}>
            &times; close
          </button>
        </Sidebar>
      ) : null}
      {recognitionList.map((recognition) => (
        <RecognitionCardComponent
          key={recognition.index}
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
          hi5Count={recognition.recognition_hi5s.length}
        />
      ))}
      <div id="#1233" style={{ height: 1 }} className="text-center" />
    </Wrapper>
  );
};

RecognitionListComponent.propTypes = {
  recognitionList: PropTypes.array.isRequired,
  giveHi5func: PropTypes.func.isRequired,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  errorMessage: PropTypes.string,
  onFilterClick: PropTypes.func,
  filter: PropTypes.string,
  sliderOn: PropTypes.func,
  sliderOff: PropTypes.func,
};

export default React.memo(RecognitionListComponent);