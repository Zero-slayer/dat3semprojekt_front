import React from 'react';
import { useState, useEffect } from 'react';

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

const application_json = () => {
    var ops = {
        headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        }
    }
    return ops;

}

function Covid19API() {
    const Summary = () => {
        const [summaryData, setSummaryData] = useState([]);
        const getData = async () => {
            const response = await fetch(summaryUrl, application_json);
            const json = await response.json();
            return setSummaryData(json["Global"]["TotalConfirmed"]);};

        useEffect(() => {
            getData()
        }, [])

        return (
                summaryData
        )

    }

    const Countries = () => {
        const [countriesArray, setCountriesArray] = useState([]);
        const getData = async () => {
            const response = await fetch(countriesUrl, application_json);
            const data = await response.json();

            data.forEach(country => {
                Object.entries(country).forEach(([key, value]) => {
                    if (key === "Country") {
                        // console.log(value);
                        setCountriesArray(countriesArray => [...countriesArray, value]);
                    }
                });
            });

        }

        useEffect(() => {
            getData()
        }, [])

        return (
            countriesArray
        )

    }

    return {
        Summary,
        Countries
    }

}

const api = Covid19API();
export default api;