//this component uses hooks

import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/index';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

//functional component
const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {

    const [dailyData, setDailyData] = useState([]);
    /*
    the above is the same as:
    this.state = {
        dailyData: {},
    }
    */

    //useEffect() lets you use state and other React features without writing a class.
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    //this is a charts.js object
    const lineChart = (
        dailyData.length ? 
        <Line
            data={{
                labels: dailyData.map(({date}) => date), 
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed), 
                    label: 'Infected', 
                    borderColor: '#3333ff', 
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths), 
                    label: 'Deaths', 
                    borderColor: 'red', 
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }],
            }}
        /> 
        : null
    );

    const barChart = (
        confirmed ?
            <Bar 
                data={{
                    labels: ['Infected', 'Deaths', 'Recovered'], 
                    datasets: [{
                        label: 'People', 
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                        ], 
                        data: [confirmed.value, deaths.value, recovered.value]
                    }]
                }}
                options = {{
                    legend: {display: false}, 
                    title: {display: true, text:`${country}`},
                }}
            />
        : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;