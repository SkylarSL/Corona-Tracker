import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

//makes an async function
//export allows you to ue the function in other files
export const fetchData = async (country) => {

    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }

    try {

        //await is used because it is async
        //this is destructured data from a JSON format
    
        const { data } = await axios.get(changeableUrl);
        const confirmed = data.confirmed;
        const recovered = data.recovered;
        const deaths = data.deaths;
        const lastUpdate = data.lastUpdate;
        if(!country){
            const countries = data.countries;
            var res = await axios.get(countries);
            var locations = res.data.countries;
            locations = locations.map(locations => locations.name);
        }
    
        const Data = { confirmed, recovered, deaths, lastUpdate, locations };

        return Data;

    }catch(err){
        console.log(err);
    }
}

export const fetchDailyData = async () => {
    try{
        //use `` for urls and http requests
        const {data} = await axios.get(`${url}/daily`);

        //maps every element in dailyData to it's value
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total, 
            deaths: dailyData.deaths.total, 
            date: dailyData.reportDate,
        }));

        return modifiedData;

    }catch(err){
        console.log(err);
    }
}

export const fetchCountries = async () => {
    try{    

        const {data: {countries}} = await axios.get(`${url}/countries`);
        
        return countries.map((country) => country.name);

    }catch(err){
        console.log(err);
    }
}