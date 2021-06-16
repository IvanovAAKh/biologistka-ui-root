import FingerprintJS from '@fingerprintjs/fingerprintjs';

const LOCAL_STORAGE_KEYS = {
  CLIENT_ID: 'clientId',
};

const getClientId = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.CLIENT_ID);
};

const setClientId = (id) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CLIENT_ID, id);
};

const generateClientId = () => {
  return FingerprintJS.load()
    .then(fp => fp.get())
    .then(({ visitorId }) => visitorId);
};

export default () => {
  const storedClientId = getClientId();
  return storedClientId
    ? Promise.resolve(storedClientId)
    : generateClientId()
      .then(clientId => {
        setClientId(clientId);
        return clientId
      });
};