import  React from 'react';
import { IAppSettings } from '../../ITypes'
// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const AppContext = React.createContext<IAppSettings | null>(null);

export default AppContext;