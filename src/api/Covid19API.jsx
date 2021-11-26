import React from 'react';
import { useState, useEffect } from 'react';

const URL = 'https://api.covid19api.com/';
const summaryUrl = URL + 'summary';
const countriesUrl = URL + 'countries';
const dayOneUrl = URL + 'dayone/country/';
const totalUrl = URL + 'total/' + dayOneUrl;
const liveUrl = URL + 'live/country/';

const type_URL = (slug_country, status, type) => {
    if (status === "none") {
        return URL + type + "/country/" + slug_country;
    }
    return URL + type + "/country/" + slug_country + "/status/" + status;
}

const default_country = slug_country => URL + 'country/' + slug_country;

const day_one_default = slug_country => dayOneUrl + slug_country;

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
    const Default = (slug_country) => {
        const [json, setJson] = useState();
        const getData = async () => {
            const response = await fetch(day_one_default(slug_country), application_json);
            const json = await response.json();
            setJson(json);
        };
        useEffect(() => {
            getData()
        }, [])
        return (
            json
        )

    }
    const Coordinates = (slug_country) => {
        const [json, setJson] = useState();
        const getData = async () => {
            const response = await fetch(default_country(slug_country), application_json);
            const json = await response.json();
            setJson(json);
        };
        useEffect(() => {
            getData()
        }, [])
        return (
            json
        )

    }
    const Status = (slug_country, status, type) => {
        const [json, setJson] = useState();
        const getData = async () => {
            const response = await fetch(type_URL(slug_country, status, type), application_json);
            const json = await response.json();
            setJson(json);
        };
        useEffect(() => {
            getData()
        }, [])
        return (
            json
        )

    }

    const Summary = () => {
        const [summaryData, setSummaryData] = useState([]);
        const getData = async () => {
            const response = await fetch(summaryUrl, application_json);
            const json = await response.json();
            return setSummaryData(json["Global"]["TotalConfirmed"]);
        };
        useEffect(() => {
            getData()
        }, [])
        return (
            summaryData
        )

    }

    const Countries = () => {
        const [json, setJson] = useState();
        const getData = async () => {
            const response = await fetch(countriesUrl, application_json);
            const json = await response.json();
            setJson(json);
        };
        useEffect(() => {
            getData()
        }, [])
        return (
            json
        )
    }
        return {
            Default,
            Coordinates,
            Status,
            Summary,
            Countries
        }

    }
const api = Covid19API();
export default api;