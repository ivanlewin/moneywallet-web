import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { Wallet } from 'types';

type Query = {
  query?: string;
  filters: {
    wallet: Wallet['id'];
  };
};
const QueryContext = createContext({
  query: {} as Partial<Query>,
  setQuery: (() => { }) as Dispatch<SetStateAction<Partial<Query>>>,
});

type QueryProviderProps = {
  children: ReactNode;
};
export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [query, setQuery] = useState<Partial<Query>>({});

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => useContext(QueryContext);
