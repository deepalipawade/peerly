import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";
import ImageComponent from "../core-component/imageComponent";

const RecognitionByComponent = (props) => {
  const {
    recognition_by,
    labelClassNameRecognitionBy,
    imageClassName,
    divClassNameRecognitionBy,
  } = props;
  return (
    <div className={divClassNameRecognitionBy}>
      <LabelComponent
        labelText={recognition_by.name}
        className={labelClassNameRecognitionBy}
      />
      <ImageComponent src={recognition_by.image} className={imageClassName} />
    </div>
  );
};

RecognitionByComponent.propTypes = {
  recognition_by: PropTypes.object.isRequired,
  labelClassNameRecognitionBy: PropTypes.string,
  imageClassName: PropTypes.string,
  divClassNameRecognitionBy: PropTypes.string,
};

export default RecognitionByComponent;
