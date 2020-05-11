import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api/index';

//functional component
//destructure props
const CountryPicker = ({ country, handleCountryChange }) => {

    //this returns a pair: this.state(fetchedCountries), setState()(setFetchedCountries)
    //setFetchedCountries is used to update fetchedCountries
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();

        //without setFetchedCountries, useEffect() would run endlessly
        //now it will only run when setFetchedCountries changes
    }, [setFetchedCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect value={country ? country : ""} onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;