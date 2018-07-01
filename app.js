import express from 'express';
import { getListCurrencies, getConvertedCurrency } from './server/currencyService';
import {
  getCachedListCurrencies, getCachedRates, storeCurrencies, storeRates,
} from './server/indexDB';

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  getListCurrencies().then((result) => {
    const data = Object.values(result.data.results);
    storeCurrencies(result);
    res.render('index', {
      data,
    });
  }).catch((error) => {
    console.log(error.message);
    getCachedListCurrencies().then((result) => {
      res.render('index', {
        data: Object.values(result.data.results),
      });
    });
  });
});
app.listen(4200);
