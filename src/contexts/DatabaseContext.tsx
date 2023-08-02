import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { DatabaseSchema } from 'schemas';
import { Database } from 'types/database';
import { isLocalStorageAvailable } from 'utils';

type DatabaseContextValue = {
  database: Partial<Database>,
};

const DatabaseContext = createContext<DatabaseContextValue>({
  database: {},
});

export const useDatabase = () => useContext(DatabaseContext);

type DatabaseProviderProps = {
  children: ReactNode;
};
const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const [database, setDatabase] = useState<Partial<Database>>({});

  useEffect(() => {
    try {
      if (!isLocalStorageAvailable) {
        return;
      }
      const dbData = window.localStorage.getItem('database');
      if (!dbData) {
        return;
      }
      const db = JSON.parse(dbData);
      const database = DatabaseSchema.parse(db);
      setDatabase(database);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <DatabaseContext.Provider value={{ database }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
