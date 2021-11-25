import React from 'react';
import NavigationBar from './components/NavigationBar'
import './FrontPage.css';
import covidApi from './api/Covid19API';
import Map from './components/LeafletMap';


export default function FrontPage() {
    const getCountries = covidApi.Countries();

    return (
        
        <div>
            <NavigationBar/>        
            <h1 id="header">Worldwide COVID-19 cases</h1>

            <form className = "float-container">
                <div className="float-child"> 
                    <div className="container" id="box1">
                        <div className="mb-3">
                            <label htmlFor="countryTextInput" className="form-label">Country: </label>
                            <select id="countryTextInput" className="form-select">
                                <option defaultValue>Country</option>
                                {(getCountries === undefined) ? (<option value="loading">loading</option>) : (getCountries.map(country => {
                                    return <option value={ country.Slug } key={ country.ISO2 }>{ country.Country }</option>
                                }))}
                            </select>
                        </div>
            
                        <div className="mb-3">
                            <label htmlFor="filterTextInput" className="form-label">Filter:</label>
                            <select id="filterTextInput" className="form-select">
                                <option defaultValue>Filter</option>
                                <option value="confirmed">Confirmed cases</option>
                                <option value="recovered">Recovered cases</option>
                                <option value="active">Active cases</option>
                                <option value="deaths">Deaths</option>
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

    )

};