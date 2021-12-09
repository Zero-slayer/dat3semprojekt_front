import React from 'react';
import { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar'
import './FrontPage.css';
import CovidApi from './api/Covid19API';
import Map from './components/LeafletMap';
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import Chart from './OverTimeGraph'
import BarChart from './components/BarChart';


export default function FrontPage() {
    const getCountries = CovidApi.Countries().List();
    const getGlobalStats = CovidApi.Countries().Stats();
    const [state, setState] = useState({
        slug_country: "afghanistan",
        type: "dayone",
        case: "Active",
    });

    const handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setState({ ...state, [name]: value });
    }
    function loadGlobalStats() {
        if (getGlobalStats === undefined) {
            return <p>Loading data...</p>

        } else {
            return (
                <div id="globalStats">
                    <h2>Global stats:</h2>
                    <p>New confirmed: {getGlobalStats["NewConfirmed"]}</p>
                    <p>Total confirmed: {getGlobalStats["TotalConfirmed"]}</p>
                    <p>New deaths: {getGlobalStats["NewDeaths"]}</p>
                    <p>Total deaths: {getGlobalStats["TotalDeaths"]}</p>
                </div>
            )
        }

    }
    function loadWeatherImg(slug_country) {
        let coords = CovidApi.Coordinates(slug_country);
        let image = CovidApi.Weather(coords[1], coords[0]);
        return image;
    }

    return (
        
        <div>
            <div className="container d-none d-lg-block normal_view">
                <h1 id="header">Worldwide COVID-19 cases</h1>
                <div className="horizontal">
                    <div className="float-child">
                        <div id="box1">
                            <div className="mb-3">
                                <h2 htmlFor="countrySelect">Country: </h2>
                                <select id="countrySelect" className="form-select" name="slug_country" onChange={handleChange}>
                                    {(getCountries === undefined) ? (<option value="none">None</option>) : (getCountries.map((country, index) => {
                                        return <option value={ country.Slug } key={ index }>{ country.Country }</option>
                                    }))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <select id="typeSelect" className="form-select filter" name="type" onChange={handleChange}>
                                    <option defaultValue value="dayone">New</option>
                                    <option value="total">Total</option>
                                </select>
                                <select id="caseSelect" className="form-select filter" name="case" onChange={handleChange}>
                                    <option defaultValue value="Active">Active</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Deaths">Deaths</option>
                                    <option value="Recovered">Recovered</option>
                                </select>
                            </div>
                            <div>
                                {loadGlobalStats()}
                            </div>
                        </div>
                    </div>
                
                    <div className="float-child" id="leafletMap">
                        <Map country={state.slug_country === "none" ? "united-states" : state.slug_country}/>
                    </div>
                </div>
                <div className="section">
                    <Chart total={state.type === "total"} country={state.slug_country === "none" ? "united-states" : state.slug_country} _case={state.case}/>
                </div>
                <br></br>
                <div className="weathercontainer">
                    {loadWeatherImg(state.slug_country)}
                </div>
            </div>

            <div className="container d-lg-none mobile_view">
                <h2 id="header">Worldwide COVID-19 cases</h2>
                <div className="mobile_stats">
                    {loadGlobalStats()}
                </div>
                <div className="mb-3">
                    <h2 htmlFor="countrySelect" className="mobile_h2">Country: </h2>
                    <select id="countrySelect" className="form-select" name="slug_country" onChange={handleChange}>
                        {(getCountries === undefined) ? (<option value="none">None</option>) : (getCountries.map((country, index) => {
                            return <option value={ country.Slug } key={ index }>{ country.Country }</option>
                        }))}
                    </select>
                </div>
                <div className="mb-3">
                    <select id="typeSelect" className="form-select filter" name="type" onChange={handleChange}>
                        <option defaultValue value="dayone">New</option>
                        <option value="total">Total</option>
                    </select>
                    <select id="caseSelect" className="form-select filter" name="case" onChange={handleChange}>
                        <option defaultValue value="Active">Active</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Deaths">Deaths</option>
                        <option value="Recovered">Recovered</option>
                    </select>
                </div>
                <div className="section">
                    <Chart total={state.type === "total"} country={state.slug_country === "none" ? "united-states" : state.slug_country} _case={state.case}/>
                </div>
                <div className="section">
                    <BarChart/>
                </div>
            </div>
        </div>
    )

};