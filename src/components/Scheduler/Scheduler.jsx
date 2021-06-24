import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

const Scheduler = ({
  action,
  id,
  interval,
  startDelay = 0,
}) => {
  const scheduledTimeStorageKey = `Scheduler.scheduledTime.${id}`;
  const timerIdStorageKey = `Scheduler.timerId.${id}`;

  useEffect(() => {
    const scheduledTime = localStorage.getItem(scheduledTimeStorageKey);
    const currentTime = Date.now();

    if (scheduledTime
      && scheduledTime > currentTime
      && scheduledTime - currentTime < interval
    ) {
      setTimeout(() => {
        action();
        localStorage.setItem(scheduledTimeStorageKey, Date.now() + interval);
        const timerId = setInterval(() => {
          action();
          localStorage.setItem(scheduledTimeStorageKey, Date.now() + interval);
        }, interval);
        localStorage.setItem(timerIdStorageKey, timerId);
      }, scheduledTime - currentTime)
    } else {
      setTimeout(() => {
        const timerId = setInterval(() => {
          action();
          localStorage.setItem(scheduledTimeStorageKey, Date.now() + interval);
        }, interval);
        localStorage.setItem(timerIdStorageKey, timerId);
      }, startDelay);
    }

    return () => clearInterval(localStorage.getItem(timerIdStorageKey));
  }, []);

  return null;
};

Scheduler.propTypes = {
  action: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  interval: PropTypes.number.isRequired,
  startDelay: PropTypes.number,
};

export default Scheduler;