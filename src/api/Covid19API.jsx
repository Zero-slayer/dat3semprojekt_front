
const URL = 'https://api.covid19api.com/';
const summaryUrl = URL + 'summary';
const countriesUrl = URL + 'countries';
const dayOneUrl = 'dayone/country/';
const totalUrl = URL + 'total/' + dayOneUrl;
const liveUrl = URL + 'live/country/';

const day_one_default = slug_country => URL + 'dayone/country/' + slug_country;

const day_one_total_default = slug_country => totalUrl + slug_country;

const day_one_live_default = slug_country => liveUrl + slug_country;

const day_one_status = (slug_country, _status) => URL + dayOneUrl + slug_country +
'/status/' + _status;

const day_one_live_status = (slug_country, _status) => URL + dayOneUrl +
slug_country + '/status/' + _status + '/live'

const day_one_total = (slug_country, _status) => URL + totalUrl +
slug_country + '/status/' + _status;

function handleHttpErrors(response) {
    if (!response.ok) {
        return Promise.reject({ status: response.status, fullError: response.json() })
    }
    return response.json();
}

function Covid19API() {
    const summary = () => {
        return fetch(summaryUrl)
        .then(handleHttpErrors)
        
    }

    return {
        summary
    }
}
const api = Covid19API();
export default api;