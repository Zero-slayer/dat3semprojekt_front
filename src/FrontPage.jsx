import React from 'react';
import { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar'
import './FrontPage.css';
import CovidApi from './api/Covid19API';
import Map from './components/LeafletMap';
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import Line from './OverTimeGraph'


export default function FrontPage() {
    const getCountries = CovidApi.Countries();
    const [state, setState] = useState({
        slug_country: "none",
        status: "none",
        type: "dayone"
    });

    const handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setState({ ...state, [name]: value });
    }

    return (
        
        <div>
            <NavigationBar/>        
            <h1 id="header">Worldwide COVID-19 cases</h1>

            <div className="container">
                    <div className="float-child">
                        <div className="container" id="box1">
                            <div className="mb-3">
                                <label htmlFor="countryInput" className="form-label">Country: </label>
                                <select id="countryInput" className="form-select" name="slug_country" onChange={handleChange}>
                                    <option defaultValue="none" value="none" >None</option>
                                    {(getCountries === undefined) ? (<option value="none">None</option>) : (getCountries.map(country => {
                                        return <option value={ country.Slug } key={ country.ISO2 }>{ country.Country }</option>
                                    }))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="filterInput" className="form-label">Status:</label>
                                <select id="filterInput" className="form-select" name="status" onChange={handleChange}>
                                    <option defaultValue value="none">None</option>
                                    <option value="confirmed">Confirmed cases</option>
                                    <option value="recovered">Recovered cases</option>
                                    <option value="active">Active cases</option>
                                    <option value="deaths">Deaths</option>
                                </select>
                                <br />
                                <select id="typeInput" className="form-select filter" name="type" onChange={handleChange}>
                                    <option defaultValue value="dayone">Day one cases</option>
                                    <option value="total">Total cases</option>
                                    <option value="live">Live cases</option>
                                </select>
                            </div>

                        </div>
                    </div>
                
                    <div className="float-child" id="leafletMap">
                        <Map country={state.slug_country === "none" ? "united-states" : state.slug_country}/>
                    </div>
                <div className="section">
                    <Line total={state.type == "total"} country={state.slug_country === "none" ? "united-states" : state.slug_country}/>
                </div>
            </div>
        </div>
    )

};