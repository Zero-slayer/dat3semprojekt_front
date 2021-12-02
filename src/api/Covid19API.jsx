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
const coords = slog_country => liveUrl + slog_country + '/status/' + 'confirmed';
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
    const Coordinates = (slug_country) => {
        const [json, setJson] = useState([]);
        const getData = async () => {
            const response = await fetch(coords(slug_country), application_json);
            const json = await response.json();
            setJson(json[0] === undefined ? ["18.35", "-64.93"] : [json[0]["Lat"], json[0]["Lon"]]);

        };
        useEffect(() => {
            getData()
        }, [slug_country])

        if (json.length > 0) {
            return json
        }
        return ["18.35", "-64.93"]

    }
    const Chart = (total, country, _case) => {
        const DAY_IN_MS = 1000 * 60 * 60 * 24;
        let weeks = 10;
        if (!total)
            weeks = 11;
        console.log(total + " - " + weeks);
        const date = new Date(new Date() - ((DAY_IN_MS * 7 * weeks) + DAY_IN_MS));
        var tenWeeksAgo = date.getFullYear().toString() + '-' + ((date.getMonth() + 1)).toString() + '-' + date.getDate().toString() + '';
        const [json, setJson] = useState([]);
        let _country = "south-africa";
        let _status = "Confirmed";

        if (country) { _country = country; }
        if (_case) { _status = _case; }

        const GetData = async () => {
            const response = await fetch(data_from_past_10_weeks(_country, _status, tenWeeksAgo), application_json);
            const json = await response.json();
            setJson(json);
        };
        function ReturnArrays() {
            let objArr = []
            const startArr = objArr;
            const array = [];
            let combined = 0

            if (json.length <= 0) {
                return array;
            };

            json.forEach(item => {
                let checkBool = false;
                objArr.forEach(o => {
                    if (o.date === item["Date"]) {
                        checkBool = true;
                        o.number += item[_case];
                    }
                });

                if (!checkBool) {
                    objArr.push({
                        date: item["Date"],
                        number: item[_case]
                    });
                }
            });

            for (let index = 0; index < startArr.length; index++) {
                combined += startArr[index].number;
                if ((index + 1) % 7 === 0) {
                    array.push(combined);
                    combined = 0;
                };
            };
            if (!total) {
                let toRemove = array[0];
                for (let index = 1; index < array.length; index++) {
                    const holder = toRemove;
                    toRemove = array[index];
                    array[index] -= holder;
                }
                array.shift();
            }
            
            return array;
        };

        useEffect(() => {
            GetData();
        }, [country, total, _case])

        return ReturnArrays();

    }
    const Countries = () => {
        const [countryList, setCountryList] = useState([]);
        const [globalStats, setGlobalStats] = useState([]);
        const getData = async () => {
            const response = await fetch(summaryUrl, application_json);
            const json = await response.json();
            setCountryList(json["Countries"]);
            setGlobalStats(json["Global"]);
        };
        useEffect(() => {
            getData()
        }, [])
        const List = () => {
            return (
                countryList.sort((a, b) => {
                    let fa = a["Country"].toLowerCase(),
                        fb = b["Country"].toLowerCase();
            
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                }))
        }
        const Stats = () => {
            return globalStats;
        }
        return {
            List,
            Stats
        }
    }

    return {
        Coordinates,
        Countries,
        Chart
    }

}
const api = Covid19API();
export default api;