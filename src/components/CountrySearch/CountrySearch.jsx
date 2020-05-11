import React, { useState } from 'react';
import { Input, Button, FormControl } from '@material-ui/core';

import styles from './CountrySearch.module.css';

const CountrySearch = ({ countries, country, handleCountryChange }) => {

    const [searchCountry, setSearchCountry] = useState([]);

    const onChangeCountry = async (country) => {

        setSearchCountry(country);

    }

    const submit = () => {

        if(countries.indexOf(searchCountry) !== -1){

            handleCountryChange(searchCountry);

        }else{
            console.log("ASDF");
        }

    }

    return(
        <FormControl className={styles.formControl}>
            <div>
                <Input placeholder={country ? country : ""} onChange={(e) => onChangeCountry(e.target.value)}></Input>
                <Button onClick={submit}>Search</Button>
            </div>
        </FormControl>
    )
}

export default CountrySearch;