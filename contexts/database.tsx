import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { DatabaseSchema } from 'schemas';
import { Database } from 'types';
import { isLocalStorageAvailable } from 'utils';

const DatabaseContext = createContext({
  database: {} as Partial<Database>,
});

type DatabaseProviderProps = {
  children: ReactNode;
};
export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
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

export const useDatabase = () => useContext(DatabaseContext);
