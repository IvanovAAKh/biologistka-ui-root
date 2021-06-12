import React, {useEffect, useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as importedActions from '../actions/actions';

const Main = ({
  actionFetch,
  isFailed,
  isFetching,
}) => {
  const [myVar, setMyVar] = useState(0);
  useEffect(() => {
    console.log('Why?');
    // actionFetch({
    //
    // });
  }, []);
  useEffect(() => {
    console.log('Use Effect: ', myVar);
  }, [myVar]);
  console.log('Render: ', myVar);
  return (
    <>
      {Array.from(new Array(150).keys()).map(key => (
        <div>
          {key}
        </div>
      ))}
      <button onClick={() => setMyVar(myVar + 1)}>asd</button>
      {isFetching &&
        <div>
          {(() => {
            const result = [];
            for (let i = 0; i< 100; i++) {
              result.push(<div>Loading...</div>);
            }
            return result;
          })()}
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