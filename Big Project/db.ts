
import { openDB, IDBPDatabase } from 'idb';
import { Habit } from './types';

const DB_NAME = 'zenhabit-db';
const DB_VERSION = 1;
const STORE_NAME = 'habits';

let dbPromise: Promise<IDBPDatabase>;

export const initDB = () => {
  dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveHabit = async (habit: Habit) => {
  const db = await dbPromise;
  return db.put(STORE_NAME, habit);
};

export const deleteHabit = async (id: string) => {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
};

export const getAllHabits = async (): Promise<Habit[]> => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const getHabitById = async (id: string): Promise<Habit | undefined> => {
  const db = await dbPromise;
  return db.get(STORE_NAME, id);
};
