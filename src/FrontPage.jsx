import React from 'react';
import { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar'
import './FrontPage.css';
import CovidApi from './api/Covid19API';
import Map from './components/LeafletMap';


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
    console.log(state);
    console.log(CovidApi.Default("south-africa"));

    const handleSubmit = event => {
        event.preventDefault();
        if (state.slug_country === "none") return console.log("-1");
        if (state.status === "none") return console.log(CovidApi.Default(state.slug_country).Country);
        console.log(CovidApi.Status(state.slug_country, state.status, state.type));
    }

    return (
        
        <div>
            <NavigationBar/>        
            <h1 id="header">Worldwide COVID-19 cases</h1>

            <div class="container">
                <form className = "float-container">
                    <div className="float-child"> 
                        <div className="container" id="box1">
                            <div className="mb-3">
                                <label htmlFor="countryTextInput" className="form-label">Country: </label>
                                <select id="countryTextInput" className="form-select">
                                    <option defaultValue>Country</option>
                                    {renderCountries}
                                </select>
                            </div>
                
                            <div className="mb-3">
                                <label htmlFor="filterTextInput" className="form-label">Filter:</label>
                                <select id="filterTextInput" className="form-select">
                                    <option defaultValue>Filter</option>
                                    <option value="1">Confirmed cases</option>
                                    <option value="2">Recovered cases</option>
                                    <option value="3">Active cases</option>
                                    <option value="4">Deaths</option>
                                </select>
                            </div>
                        </div>
                
                        <div className="container" id="box2">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                    </div>
                
                    <div className="float-child" id="leafletMap">
                        <Map />
                    </div>

                </form>
            </div>
        </div>

    )

};