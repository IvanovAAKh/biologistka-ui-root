import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

const Scheduler = ({
  action,
  interval,
  startDelay = 0,
}) => {
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setTimerId(setInterval(action, interval));
    }, startDelay);
    return () => clearInterval(timerId);
  }, []);

  return null;
};

Scheduler.propTypes = {
  action: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired,
  startDelay: PropTypes.number,
};

export default Scheduler;