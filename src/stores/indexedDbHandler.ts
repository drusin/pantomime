const DB_NAME = 'pantomime_db';
const DB_VERSION = 1;

// ##################### images #######################
const IMAGE = {
  STORE_NAME: 'images',
  C_SUBJECT: 'subject',
  C_IMAGE: 'image',
};

type Image = {
  subject: string,
  image: string
};

async function findImage(subject: string): Promise<string> {
  const objectStore = await getObjectStore(IMAGE.STORE_NAME, 'readonly');
  const request = objectStore.get(subject);
  return await new Promise((success) => {
    request.onsuccess = () => success(request.result?.[IMAGE.C_IMAGE] || '');
  });
}

async function getAllSavedImages(): Promise<Array<Image>> {
  const objectStore = await getObjectStore(IMAGE.STORE_NAME, 'readonly');
  const request = objectStore.getAll();
  return await new Promise((success) => {
    request.onsuccess = () => success(request.result as Array<Image>);
  });
}

async function saveImage(subject: string, image: string) {
  const objectStore = await getObjectStore(IMAGE.STORE_NAME, 'readwrite');
  const request = objectStore.add({
    [IMAGE.C_SUBJECT]: subject,
    [IMAGE.C_IMAGE]: image
  });
  await new Promise((success) => {
    request.onsuccess = success;
  });
}

// ###################### profiles ########################
const PROFILES = {
  STORE_NAME: 'profiles',
  C_ID: 'id',
  C_IMAGE: 'image',
};

type Profile = {
  id: number,
  image: string,
};

async function createNewProfile(image: string): Promise<Profile> {
  const objectStore = await getObjectStore(PROFILES.STORE_NAME, 'readwrite');
  const request = objectStore.add({ image });
  const id: number = await new Promise((success) => {
    request.onsuccess = () => success(request.result as number);
  });
  return await getProfile(id);
}

async function getProfile(id: number): Promise<Profile> {
  const objectStore = await getObjectStore(PROFILES.STORE_NAME, 'readonly');
  const request = objectStore.get(id);
  return await new Promise((success) => {
    request.onsuccess = () => success(request.result as Profile);
  });
}

async function getAllProfiles(): Promise<Array<Profile>> {
  const objectStore = await getObjectStore(PROFILES.STORE_NAME, 'readonly');
  const request = objectStore.getAll();
  return await new Promise((success) => {
    request.onsuccess = () => success(request.result as Array<Profile>);
  });
}

// ###################### helpers ############################
async function getObjectStore(storeName: string, mode: IDBTransactionMode) {
  const db = await getDb();
  const transaction = db.transaction(storeName, mode);
  return transaction.objectStore(storeName);
}

async function getDb() {
  const dbRequest = new Promise<IDBDatabase>((success) => {
    const openRequest = indexedDB.open(DB_NAME, DB_VERSION);
    openRequest.onupgradeneeded = upgradeDb;
    openRequest.onsuccess = (event) => success(((event.target) as IDBRequest).result);
    openRequest.onerror = (event) => console.error(`Database error: ${((event.target) as IDBRequest).error?.message}`);
  });
  return await dbRequest;
}

function upgradeDb(event: Event) {
  const db: IDBDatabase = (event.target as IDBRequest).result;
  const imageStore = db.createObjectStore(IMAGE.STORE_NAME, { keyPath: IMAGE.C_SUBJECT });
  imageStore.createIndex(IMAGE.C_IMAGE, IMAGE.C_IMAGE);
  const profileStore = db.createObjectStore(PROFILES.STORE_NAME, { keyPath: PROFILES.C_ID, autoIncrement: true });
  profileStore.createIndex(PROFILES.C_IMAGE, IMAGE.C_IMAGE);
}

export {
  findImage, getAllSavedImages, saveImage,
  createNewProfile, getProfile, getAllProfiles
};
