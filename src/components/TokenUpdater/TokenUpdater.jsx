import React from 'react';
import Scheduler from 'components/Scheduler';
import useActions from 'hooks/useActions';
import useUser from 'hooks/useUser';
import * as requests from 'requests';

const TOKEN_UPDATE_INTERVAL = 1000 * 60 * 7; // ms * seconds * minutes

const TokenUpdater = () => {
  const {
    isAuthorized,
  } = useUser();

  const {
    fetchRefreshToken,
  } = useActions(requests);

  return (
    <>
      {isAuthorized && (
        <Scheduler
          action={fetchRefreshToken}
          id="TokenUpdater"
          interval={TOKEN_UPDATE_INTERVAL}
        />
      )}
    </>
  );
};

export default TokenUpdater;