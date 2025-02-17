import React, { useContext } from 'react';
// import { Env, WindowEnv } from '../../models';
import { Env,WindowEnv } from '../../../models/Env';
import { Provider } from 'react-redux'
export const EnvContext = React.createContext<Env | undefined>(undefined);
import { store } from '../../../redux/store';


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
function useEnv(): Env {
  const env = useContext(EnvContext);
  /* istanbul ignore next */
  if (env === undefined) {
    throw new Error('useEnv must be used within a EnvProvider');
  }
  return env;
}

/**
 * Provides an instance of WindowEnv
 */
const EnvProvider: React.FC = ({ children }) => {
  // let store = mockStore({
  //   roleId:0,
  //   rolelist:{}
  // })
  return (
    // <EnvContext.Provider value={new WindowEnv()}>
    <Provider store={store}>
      {children}
    </Provider>
      
    // </EnvContext.Provider>
  );
};

export { EnvProvider, useEnv };
