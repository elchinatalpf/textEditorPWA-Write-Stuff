import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {

  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content }); // check this later Questions?????
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  return result?.jate;
};


// still check for this. don't know if is needed.
// export const deleteDb = async (id) => {
//   const jateDB = await openDB('jate', 1);
//   const tx = jateDB.transaction('jate', 'readwrite');
//   const store = tx.objectStore('jate');
//   const request = store.delete(id);
//   const result = await request;
//   console.log('result.value', value);
//   return result;
// };

initdb();
