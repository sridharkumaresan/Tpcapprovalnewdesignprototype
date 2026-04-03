import * as React from 'react';
import { ITpcService } from '../services/ITpcService';
import { IUserContext } from '../models/ITpcRequest';

export interface ITpcAppContextProps {
  appService: ITpcService;
  currentUser: IUserContext;
}

export const TpcAppContext = React.createContext<ITpcAppContextProps | undefined>(undefined);

export const useTpcAppContext = (): ITpcAppContextProps => {
  const context = React.useContext(TpcAppContext);
  if (context === undefined) {
    throw new Error('useTpcAppContext must be used within a TpcAppContextProvider');
  }
  return context;
};
