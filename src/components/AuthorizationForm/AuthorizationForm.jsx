import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import IconVisibility from 'components/icons/Visibility';
import IconVisibilityOff from 'components/icons/VisibilityOff';
import md5 from 'md5';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Tab from 'components/Tab';
import TabContent from 'components/TabContent';
import Tabs from 'components/Tabs';
import TabsContent from 'components/TabsContent';
import TextField from 'components/TextField';
import Typography from 'components/Typography';
import useActions from 'hooks/useActions';
import useUser from 'hooks/useUser';
import * as userActions from 'app/actions/user';
import * as appErrorCodes from 'app/constants/errorCodes';

const getClasses = makeStyles(theme => ({
  actionItem: {
    padding: '4px 0px',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '-4px 0px',
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  inputField: {
    width: '100%',
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
  },
  paddingLeft: {
    paddingLeft: '8px',
  },
  paddingLeft3x: {
    paddingLeft: '24px',
  },
  paddingTop2x: {
    paddingTop: '16px',
  },
  paddingTop3x: {
    paddingTop: '24px',
  },
  paddingTop4x: {
    paddingTop: '32px',
  },
}));

const AVAILABLE_TABS = {
  login: "login",
  register: "register"
};

const VALIDATION_ERRORS = {
  CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH: 'CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH',
  EMPTY_LOGIN: 'EMPTY_LOGIN',
  EMPTY_CONFIRM_PASSWORD: 'EMPTY_CONFIRM_PASSWORD',
  EMPTY_PASSWORD: 'EMPTY_PASSWORD',
  IS_NOT_EMAIL: 'IS_NOT_EMAIL',
};

const intlKeysToValidationErrors = {
  [VALIDATION_ERRORS.CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH]: 'error.passwordsNotMatch',
  [VALIDATION_ERRORS.EMPTY_CONFIRM_PASSWORD]: 'error.emptyConfirmPassword',
  [VALIDATION_ERRORS.EMPTY_LOGIN]: 'error.emptyLogin',
  [VALIDATION_ERRORS.EMPTY_PASSWORD]: 'error.emptyPassword',
  [VALIDATION_ERRORS.IS_NOT_EMAIL]: 'error.isNotEmail',
  [appErrorCodes.WRONG_LOGIN_OR_PASSWORD]: 'error.wrongLoginOrPassword',
};

const isEmail = (text) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(text.toLowerCase());
};

const initialState = {
  confirmPassword: '',
  isConfirmPasswordVisible: false,
  isPasswordVisible: false,
  login: '',
  name: '',
  password: '',
  selectedTab: AVAILABLE_TABS.login,
  validationErrors: [],
};

const AuthorizationForm = ({
  onSuccess, // TODO: add impl
}) => {
  const classes = getClasses();

  const {
    clearErrors,
    fetchSignIn,
    fetchSignUpAndSignIn,
  } = useActions(userActions);

  const user = useUser();
  const { formatMessage } = useIntl();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    clearErrors();
  }, []);

  return (
    <div className={classes.container}>
      <Tabs
        fullWidth
        onChange={(event, newValue) => setState({
          ...initialState,
          selectedTab: newValue,
        })}
        value={state.selectedTab}
      >
        <Tab
          label={formatMessage({
            id: 'signIn',
          })}
          value={AVAILABLE_TABS.login}
        />
        <Tab
          label={formatMessage({
            id: 'signUp',
          })}
          value={AVAILABLE_TABS.register}
        />
      </Tabs>
      <TabsContent value={state.selectedTab}>
        <TabContent value={AVAILABLE_TABS.login}>
          <div className={classes.tabContent}>
            <div className={classes.inputField}>
              {(() => {
                const isError = [
                    VALIDATION_ERRORS.EMPTY_LOGIN,
                    VALIDATION_ERRORS.IS_NOT_EMAIL,
                  ].some(error => state.validationErrors.includes(error));
                return (
                  <TextField
                    isError={isError}
                    label={formatMessage({
                      id: 'email',
                    })}
                    helperText={isError
                      ? formatMessage({
                        id: intlKeysToValidationErrors[[
                          VALIDATION_ERRORS.EMPTY_LOGIN,
                          VALIDATION_ERRORS.IS_NOT_EMAIL,
                        ].find(error => state.validationErrors.includes(error))]
                      })
                      : null
                    }
                    onChange={({ target }) => {
                      const newValidationErrors = state.validationErrors
                        .filter(error => !([
                          VALIDATION_ERRORS.EMPTY_LOGIN,
                          VALIDATION_ERRORS.IS_NOT_EMAIL,
                        ]).includes(error));
                      setState({
                        ...state,
                        login: target.value,
                        validationErrors: newValidationErrors,
                      });
                    }}
                    value={state.login}
                  />
                );
              })()}
            </div>
            <div className={classes.fullWidth}>
              <div className={classes.paddingTop3x}>
                <div className={classes.inputField}>
                  {(() => {
                    const isError = [
                      VALIDATION_ERRORS.EMPTY_PASSWORD,
                    ].some(error => state.validationErrors.includes(error));
                    return (
                      <TextField
                        AdornmentEnd={(
                          <IconButton
                            onClick={() => setState({
                              ...state,
                              isPasswordVisible: !state.isPasswordVisible,
                            })}
                          >
                            {state.isPasswordVisible
                              ? (<IconVisibility size={24} />)
                              : (<IconVisibilityOff size={24} />)}
                          </IconButton>
                        )}
                        inputType={state.isPasswordVisible
                          ? 'text'
                          : 'password'}
                        isError={isError}
                        helperText={isError
                          ? formatMessage({
                            id: intlKeysToValidationErrors[[
                              VALIDATION_ERRORS.EMPTY_PASSWORD,
                            ].find(error => state.validationErrors.includes(error))]
                          })
                          : null
                        }
                        label={formatMessage({
                          id: 'password',
                        })}
                        onChange={({ target }) => {
                          const newValidationErrors = state.validationErrors
                            .filter(error => !([
                              VALIDATION_ERRORS.EMPTY_PASSWORD,
                            ].includes(error)));
                          setState({
                            ...state,
                            password: target.value,
                            validationErrors: newValidationErrors,
                          });
                        }}
                        value={state.password}
                      />
                    );
                  })()}
                </div>
              </div>
            </div>
            <div className={classes.fullWidth}>
              <div className={classes.paddingTop4x}>
                <div className={classes.actionsContainer}>
                  {user.isFailedFetchUser &&  (
                    <div className={classes.actionItem}>
                      <Typography color="error">
                        {(() => {
                          const userErrorCodes = user.errors
                            .map(error => error.code);
                          const foundKnownErrorKey = Object
                            .keys(intlKeysToValidationErrors)
                            .find(knownErrorKey => userErrorCodes
                              .includes(knownErrorKey));
                          return formatMessage({
                            id: foundKnownErrorKey
                              ? intlKeysToValidationErrors[foundKnownErrorKey]
                              : 'error.internal',
                          });
                        })()}
                      </Typography>
                    </div>
                  )}
                  <div className={classes.actionItem}>
                    <Button
                      disabled={user.isFetchingUser}
                      fullWidth
                      onClick={() => {
                        const newValidationErrors = [];
                        if (!state.login) {
                          newValidationErrors.push(VALIDATION_ERRORS.EMPTY_LOGIN);
                        }
                        if (state.login && !isEmail(state.login)) {
                          newValidationErrors
                            .push(VALIDATION_ERRORS.IS_NOT_EMAIL);
                        }
                        if (!state.password) {
                          newValidationErrors
                            .push(VALIDATION_ERRORS.EMPTY_PASSWORD);
                        }

                        setState({
                          ...state,
                          validationErrors: newValidationErrors,
                        });

                        if (!newValidationErrors.length) {
                          fetchSignIn({
                            login: state.login.toLowerCase(),
                            password: md5(state.password),
                          });
                        }
                      }}
                      variant="main"
                    >
                      <Typography
                        color="inherit"
                        variant="button"
                      >
                        {formatMessage({ id: 'signIn' })}
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabContent>
        <TabContent value={AVAILABLE_TABS.register}>
          <div className={classes.tabContent}>
            <div className={classes.inputField}>
              <TextField
                label={formatMessage({
                  id: 'name',
                })}
                onChange={({ target }) => setState({
                  ...state,
                  name: target.value,
                })}
                value={state.name}
              />
            </div>
            <div className={classes.fullWidth}>
              <div className={classes.paddingTop2x}>
                <div className={classes.inputField}>
                  <TextField
                    inputType="phone"
                    label={formatMessage({
                      id: 'phoneNumber',
                    })}
                    // TODO: add correct handling of phone number,
                    onChange={({ target }) => setState({
                      ...state,
                      phone: target.value,
                    })}
                    value={state.phone}
                  />
                </div>
              </div>
            </div>
            <div className={classes.fullWidth}>
              <div className={classes.paddingTop2x}>
                <div className={classes.inputField}>
                  {(() => {
                    const isError = [
                      VALIDATION_ERRORS.EMPTY_LOGIN,
                      VALIDATION_ERRORS.IS_NOT_EMAIL,
                    ].some(error => state.validationErrors.includes(error));
                    return (
                      <TextField
                        isError={isError}
                        label={formatMessage({
                          id: 'email',
                        })}
                        helperText={isError
                          ? formatMessage({
                            id: intlKeysToValidationErrors[[
                              VALIDATION_ERRORS.EMPTY_LOGIN,
                              VALIDATION_ERRORS.IS_NOT_EMAIL,
                            ].find(error => state.validationErrors.includes(error))]
                          })
                          : null
                        }
                        onChange={({ target }) => {
                          const newValidationErrors = state.validationErrors
                            .filter(error => !([
                              VALIDATION_ERRORS.EMPTY_LOGIN,
                              VALIDATION_ERRORS.IS_NOT_EMAIL,
                            ]).includes(error));
                          setState({
                            ...state,
                            login: target.value,
                            validationErrors: newValidationErrors,
                          });
                        }}
                        value={state.login}
                      />
                    );
                  })()}
                </div>
              </div>
            </div>
            <div className={classes.fullWidth}>
              <div className={classes.paddingTop2x}>
                <div className={classes.inputField}>
                  {(() => {
                    const isError = [
                      VALIDATION_ERRORS.CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH,
                      VALIDATION_ERRORS.EMPTY_PASSWORD,
                    ].some(error => state.validationErrors.includes(error));
                    return (
                      <TextField
                        AdornmentEnd={(
                          <IconButton
                            onClick={() => setState({
                              ...state,
                              isPasswordVisible: !state.isPasswordVisible,
                            })}
                          >
                            {state.isPasswordVisible
                              ? (<IconVisibility size={24} />)
                              : (<IconVisibilityOff size={24} />)}
                          </IconButton>
                        )}
                        inputType={state.isPasswordVisible
                          ? 'text'
                          : 'password'}
                        isError={isError}
                        helperText={isError
                          ? formatMessage({
                            id: intlKeysToValidationErrors[[
                              VALIDATION_ERRORS.CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH,
                              VALIDATION_ERRORS.EMPTY_PASSWORD,
                            ].find(error => state.validationErrors.includes(error))]
                          })
                          : null
                        }
                        label={formatMessage({
                          id: 'password',
                        })}
                        onChange={({ target }) => {
                          const newValidationErrors = state.validationErrors
                            .filter(error => !([
                              VALIDATION_ERRORS.CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH,
                              VALIDATION_ERRORS.EMPTY_PASSWORD,
                            ].includes(error)));
                          setState({
                            ...state,
                            password: target.value,
                            validationErrors: newValidationErrors,
                          });
                        }}
                        value={state.password}
                      />
                    );
                  })()}
                </div>
              </div>
            </div>
            <div className={classes.fullWidth}>
              <div className={classes.paddingTop2x}>
                <div className={classes.inputField}>
                  {(() => {
                    const isError = [
                      VALIDATION_ERRORS.CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH,
                      VALIDATION_ERRORS.EMPTY_CONFIRM_PASSWORD,
                    ].some(error => state.validationErrors.includes(error));
                    return (
                      <TextField
                        AdornmentEnd={(
                          <IconButton
                            onClick={() => setState({
                              ...state,
                              isConfirmPasswordVisible: !state.isConfirmPasswordVisible,
                            })}
                          >
                            {state.isConfirmPasswordVisible
                              ? (<IconVisibility size={24} />)
                              : (<IconVisibilityOff size={24} />)}
                          </IconButton>
                        )}
                        inputType={state.isConfirmPasswordVisible
                          ? 'text'
                          : 'password'}
                        isError={isError}
                        helperText={isError
                          ? formatMessage({
                            id: intlKeysToValidationErrors[[
                              VALIDATION_ERRORS.CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH,
                              VALIDATION_ERRORS.EMPTY_CONFIRM_PASSWORD,
                            ].find(error => state.validationErrors.includes(error))]
                          })
                          : null
                        }
                        label={formatMessage({
                          id: 'confirmPassword',
                        })}
                        onChange={({ target }) => {
                          const newValidationErrors = state.validationErrors
                            .filter(error => !([
                              VALIDATION_ERRORS.CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH,
                              VALIDATION_ERRORS.EMPTY_CONFIRM_PASSWORD,
                            ].includes(error)));
                          setState({
                            ...state,
                            confirmPassword: target.value,
                            validationErrors: newValidationErrors,
                          });
                        }}
                        value={state.confirmPassword}
                      />
                    );
                  })()}
                </div>
              </div>
            </div>
            <div className={classes.fullWidth}>
              <div className={classes.paddingTop4x}>
                <div className={classes.actionsContainer}>
                  {(user.isFailedFetchUser || user.isFailedSignUp) &&  (
                    <div className={classes.actionItem}>
                      <Typography color="error">
                        {(() => {
                          const userErrorCodes = user.errors
                            .map(error => error.code);
                          const foundKnownErrorKey = Object
                            .keys(intlKeysToValidationErrors)
                            .find(knownErrorKey => userErrorCodes
                              .includes(knownErrorKey));
                          return formatMessage({
                            id: foundKnownErrorKey
                              ? intlKeysToValidationErrors[foundKnownErrorKey]
                              : 'error.internal',
                          });
                        })()}
                      </Typography>
                    </div>
                  )}
                  <div className={classes.actionItem}>
                    <Button
                      disabled={user.isFetchingSignUp
                        || user.isFailedFetchUser}
                      fullWidth
                      onClick={() => {
                        const newValidationErrors = [];
                        if (!state.login) {
                          newValidationErrors.push(VALIDATION_ERRORS.EMPTY_LOGIN);
                        }
                        if (state.login && !isEmail(state.login)) {
                          newValidationErrors
                            .push(VALIDATION_ERRORS.IS_NOT_EMAIL);
                        }
                        if (!state.password) {
                          newValidationErrors
                            .push(VALIDATION_ERRORS.EMPTY_PASSWORD);
                        }
                        if (!state.confirmPassword) {
                          newValidationErrors
                            .push(VALIDATION_ERRORS.EMPTY_CONFIRM_PASSWORD);
                        }
                        if (state.password
                          && state.confirmPassword
                          && state.password !== state.confirmPassword
                        ) {
                          newValidationErrors
                            .push(VALIDATION_ERRORS.CONFIRM_PASSWORD_AND_PASSWORD_NOT_MATCH);
                        }

                        setState({
                          ...state,
                          validationErrors: newValidationErrors,
                        });

                        if (!newValidationErrors.length) {
                          fetchSignUpAndSignIn({
                            email: state.login,
                            firstName: state.name,
                            login: state.login.toLowerCase(),
                            password: md5(state.password),
                            phone: state.phone,
                          });
                        }
                      }}
                      variant="main"
                    >
                      <Typography
                        color="inherit"
                        variant="button"
                      >
                        {formatMessage({ id: 'signUp' })}
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabContent>
      </TabsContent>
    </div>
  )
};

AuthorizationForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default AuthorizationForm;