import { connect as reduxConnect } from 'react-redux';

const connect = (mapState, actionCreators) => (Component) => {
  return reduxConnect(mapState, actionCreators)(Component);
}

export default connect;
