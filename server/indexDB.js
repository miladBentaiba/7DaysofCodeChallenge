import idb from 'idb';
import {
DATA_BASE,
RATES_OBJECT_NAME,
COUNTRIES_OBJECT_NAME
} from 'constants';

const dbPromise = idb.open(DATA_BASE, 1, upgradeDB => {
  upgradeDB.createObjectStore(COUNTRIES_OBJECT_NAME);
  upgradeDB.createObjectStore(RATES_OBJECT_NAME);
});

function saveCurrencies(currencies) {
    return this._dbPromise.then(db => {
      db.transaction(COUNTRIES_OBJECT_NAME, 'readwrite')
      .objectStore(COUNTRIES_OBJECT_NAME).put(currencies, COUNTRIES_OBJECT_NAME);
    });
  }

 function storeRates(rates) {
    return this._dbPromise.then(db => {
      db.transaction(RATES_OBJECT_NAME, 'readwrite')
      .objectStore(RATES_OBJECT_NAME).put(rates, rates.id);
    });
  }

function getCachedListCurrencies() {
  return this.dbPromise.then(db => db.transaction(OBJECT_NAME)
    .objectStore(OBJECT_NAME).getAll());
}

function getCachedRates() {

}

export { getCachedListCurrencies, getCachedRates };
