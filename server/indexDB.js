import idb from 'idb';
import {
  DATABASE_NAME,
  RATES_OBJECT_NAME,
  COUNTRIES_OBJECT_NAME,
} from './constants';

const dbPromise = idb.open(DATABASE_NAME, 1, (upgradeDB) => {
  upgradeDB.createObjectStore(COUNTRIES_OBJECT_NAME);
  upgradeDB.createObjectStore(RATES_OBJECT_NAME);
});

function storeCurrencies(currencies) {
  return dbPromise.then((db) => {
    db.transaction(COUNTRIES_OBJECT_NAME, 'readwrite')
      .objectStore(COUNTRIES_OBJECT_NAME).put(currencies, COUNTRIES_OBJECT_NAME);
  });
}

function storeRates(rates) {
  return dbPromise.then((db) => {
    db.transaction(RATES_OBJECT_NAME, 'readwrite')
      .objectStore(RATES_OBJECT_NAME).put(rates, rates.id);
  });
}

function getCachedListCurrencies() {
  return dbPromise.then(db => db.transaction(COUNTRIES_OBJECT_NAME)
    .objectStore(COUNTRIES_OBJECT_NAME).getAll());
}

function getCachedRates() {

}

export {
  getCachedListCurrencies, getCachedRates, storeCurrencies, storeRates,
};
