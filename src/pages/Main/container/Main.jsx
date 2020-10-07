import React, {useEffect, useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as importedActions from '../actions/actions';

const Main = ({
  actionFetch,
  isFailed,
  isFetching,
}) => {
  useEffect(() => {
    console.log('Why?');
    actionFetch({

    });
  }, []);

  return (
    <>
      {isFetching &&
        <div>
          Loading...
        </div>
      }
      {isFailed &&
        <div>
          Failed
        </div>
      }
      {!isFailed && !isFetching &&
        <div>
          Success
        </div>
      }
    </>
  )
};

const mapDispatchToProps = (dispatch) => {
  const {
    fetchD,
  } = bindActionCreators(importedActions, dispatch);

  return ({
    actionFetch: fetchD,
  });
};

const mapStateToProps = state => ({
  isFailed: state.reducer.isFailed,
  isFetching: state.reducer.isFetching,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)