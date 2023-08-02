import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { Wallet } from 'types/database';

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
export const useQuery = () => useContext(QueryContext);

type QueryProviderProps = {
  children: ReactNode;
};
const QueryProvider = ({ children }: QueryProviderProps) => {
  const [query, setQuery] = useState<Partial<Query>>({});

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};


export default QueryProvider;