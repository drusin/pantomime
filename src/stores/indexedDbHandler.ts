const DB_NAME = 'pantomime_db';
const DB_VERSION = 0;
const IMAGE_STORE_NAME = 'images';

function findImage(subject: string) {

}

async function getDb() {
  const request = new Promise<IDBDatabase>((success, error) => {
    const openRequest = indexedDB.open(DB_NAME, DB_VERSION);
    openRequest.onupgradeneeded = upgradeDb;
    openRequest.onsuccess = (event) => success(((event.target) as IDBRequest).result);
    openRequest.onerror = (event) => console.error(`Database error: ${((event.target) as IDBRequest).error?.message}`);
  });
  const db = await request;
}

function upgradeDb(event: Event) {
  const db = (event.target as IDBRequest).result;
  db.
}

