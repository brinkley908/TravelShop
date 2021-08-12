import  React from 'react';
import { IAppConfig } from '../../ITypes'
// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const AppContext = React.createContext<IAppConfig | null>(null);

export default AppContext;