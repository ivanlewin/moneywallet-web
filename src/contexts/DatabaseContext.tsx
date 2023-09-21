import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { LegacyDatabase } from 'types/legacy-database';

type DatabaseContextValue = {
  database: Partial<LegacyDatabase>,
};

const DatabaseContext = createContext<DatabaseContextValue>({
  database: {},
});

export const useDatabase = () => useContext(DatabaseContext);

type DatabaseProviderProps = {
  children: ReactNode;
};
const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const [database, setDatabase] = useState<Partial<LegacyDatabase>>({});

  useEffect(() => {
  }, []);

  return (
    <DatabaseContext.Provider value={{ database }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
