import axios from 'axios';
import { CURRENCY_API_URL } from './constants';

async function getListCurrencies() {
  try {
    const response = await axios.get(`${CURRENCY_API_URL}/currencies`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log('A problem while fetching currencies ', error.message);
    return {
      success: false,
      message: 'A problem while fetching currencies ',
    };
  }
}

async function getConvertedCurrency(amount, fromCurrency, toCurrency) {
  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  const query = `${fromCurrency}_${toCurrency}`;
  try {
    const response = await axios.get(`${CURRENCY_API_URL}/convert?q=${query}`);
    return {
      success: true,
      message: Math.round(amount * response.data.val * 100) / 100,
    };
  } catch (error) {
    console.log('A problem while converting currencies ', error.message);
    return {
      success: false,
      data: 'A problem while converting currencies ',
    };
  }
}

export { getListCurrencies, getConvertedCurrency };
