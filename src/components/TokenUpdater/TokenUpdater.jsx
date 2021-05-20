import React, {useEffect, useState} from 'react';
import Scheduler from 'components/Scheduler';
import useActions from 'hooks/useActions';
import useUser from 'hooks/useUser';
import * as userActions from 'app/actions/user';

const DEFAULT_UPDATE_INTERVAL = 1000 * 1 * 1; // ms * seconds * minutes

const TokenUpdater = () => {
  const {
    isAuthorized,
    isFetchingUpdateToken,
    tokenExpirationTime,
  } = useUser();

  const [updateInterval, setUpdateInterval] = useState(DEFAULT_UPDATE_INTERVAL);

  useEffect(() => {
    if (tokenExpirationTime) {
      const minimalUpdateInterval = (tokenExpirationTime - Date.now()) / 2;
      setUpdateInterval(
        Math.min(minimalUpdateInterval, DEFAULT_UPDATE_INTERVAL),
      );
    }
  }, [tokenExpirationTime]);

  const {
    fetchUpdateToken,
  } = useActions(userActions);

  return (
    <>
      {isAuthorized && !isFetchingUpdateToken && (
        <Scheduler
          action={fetchUpdateToken}
          interval={updateInterval}
        />
      )}
    </>
  );
};

export default TokenUpdater;