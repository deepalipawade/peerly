import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { USER_PROFILE_API, GIVE_HI5_API } from "constants/actionConstants";
import LeftfPanel from "shared-components/left-panel/LeftPanelComponent";
import { useHistory } from "react-router-dom";

const LeftPanelContainer = () => {
  let history = useHistory();
  const userProfile = useSelector((state) => state.userProfileReducer);
  const [showError, setShowError] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const status = actionGenrator(USER_PROFILE_API);
  const hi5Status = actionGenrator(GIVE_HI5_API);
  if (userId === 1) {
    history.push("/profile");
  }
  const handleCloseError = () => {
    setShowPopup(false);
    dispatch(actionObjectGenrator(hi5Status.init));
  };
  let hi5_quota_balance = userProfile.data.hi5_quota_balance;
  const showErrorPopup = () => setShowPopup(true);

  useEffect(() => {
    dispatch(actionObjectGenrator(status.success));
  }, [dispatch, status.success]);
  if (userProfile.error === "invalid_token") {
    return <SessionTimeoutComponent />;
  } else if (userProfile.error === "access_denied") {
    return <UnauthorisedErrorComponent />;
  }
  return (
    <LeftfPanel
      profileImage={userProfile.data.profile_image_url}
      profileName={userProfile.data.display_name}
      collectedHi5={userProfile.data.hi5_count}
      errorMessage="You have Empty Hi5 quota balance"
      showError={showError}
      handleCloseError={handleCloseError}
      handleShowError={showErrorPopup}
      showPopup={showPopup}
      hi5_quota_balance={hi5_quota_balance}
      setShowError={setShowError}
      setUserId={setUserId}
      id={1}
    />
  );
};

export default LeftPanelContainer;