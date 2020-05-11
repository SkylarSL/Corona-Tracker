import React from 'react';

/*
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
*/

//these components are all imported in one line thanks to "./components/index.js"
import { Cards, Chart, CountryPicker, CountrySearch } from './components';

//another way to add css styles
import styles from './App.module.css'

//curly braces because its a name/ specific object
//if you just have a index.js file you DO NOT need to specify it
import { fetchData } from './api/index';

class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            data: {},
            countryNames: [],
            country: '',
        }
    }

    //makes componentDidMount() async
    async componentDidMount(){

        //"await" is used becaues we are dealing with async function
        const fetchedData = await fetchData();

        //set the data state to the fetched data from the api
        this.setState({data: fetchedData, countryNames: fetchedData});
    }

    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country);

        this.setState({data: fetchedData, country: country});
    }

    render(){

        const { data, countryNames, country } = this.state;


        return(
            
            //grabs the class name of "container" from "App.module.css"
            <div className={styles.container}>
                <Cards data = {data}/>
                <div className={styles.inputs}>
                    <CountryPicker country={country} handleCountryChange = {this.handleCountryChange}/>
                    <CountrySearch countries={countryNames.locations} country={country} handleCountryChange = {this.handleCountryChange}/>
                </div>
                <Chart data={data} country={country}/>
            </div>
        );
    }
}

export default App;