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
const data_from_past_10_weeks = (slog_country, status, date) => liveUrl + slog_country + '/status/' + status + '/date/' + date;

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
        const [json, setJson] = useState([]);
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
        const [json, setJson] = useState([]);
        const getData = async () => {
            const response = await fetch(default_country(slug_country), application_json);
            const json = await response.json();
            setJson(json);
        };
        useEffect(() => {
            getData()
        }, [])
        return [ 
            json[0].Lat,
            json[0].Lon
        ]

    }
    const Chart = ( country, status ) => {
        const DAY_IN_MS = 1000 * 60 * 60 * 24;
        const today = new Date( new Date() - ((DAY_IN_MS * 7 * 10) + DAY_IN_MS));
        var tenWeeksAgo = today.getFullYear().toString() + '-' +  ((today.getMonth() + 1)).toString() + '-' + today.getDate().toString() + '';
        const [json, setJson] = useState([]);
        let _country = "south-africa";
        let _status = "Confirmed";
        console.log(status)
        console.log(country)

        if (country) { _country = country; }
        if (status) { _status = status; }

        const GetData = async () => {
            const response = await fetch(data_from_past_10_weeks(_country,_status, tenWeeksAgo), application_json);
            const json = await response.json();
            setJson(json);
        };
        async function ReturnArrays() {
            const startArr = json;
            console.log(startArr)
            let array = [];
            let combined = 0
            for (let index = 0; index < startArr.length; index++) {
                // console.log(combined);
                // console.log(((index != 0)))
                if (!(index ===  0) && index % 7 === 0) {
                    array = [...array, combined]
                    console.log(combined);
                    combined = 0;
                };
                console.log(startArr[index][status])
                combined += startArr[index][status];
            };
            return array;
        };
        async function getDataAndReturnArrays() {
            await GetData();
            await ReturnArrays();
        }

        useEffect(() => {
             getDataAndReturnArrays()
        }, [])
        return (
            [-1]
        )

    }
    const Status = (slug_country, status, type) => {
        const [json, setJson] = useState([]);
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
        const [json, setJson] = useState([]);
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
            Countries,
            Chart
        }

}
const api = Covid19API();
export default api;