import React,{useState, useEffect} from 'react';  
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';  
import styles from './Chart.module.css'  
import { Container } from '@material-ui/core';  
  
const Chart = ({data:{confirmed, recovered, deaths}, country}) => {  
    //this is a set representation with setter method of a state  
    const [dailyData, setDailyData] = useState([]);  
      
    useEffect(() => {  
    const fetchAPI = async()=>{  
        setDailyData(await fetchDailyData());  
        }  
        fetchAPI();  
    },[]);  
  
const lineChart =(  
    dailyData.length ? (   
        <Line data={{  
                        labels: dailyData.map(({date}) =>  date),  
                        datasets :[{  
                            data :  dailyData.map(({confirmed}) =>  confirmed),  
                            label: 'Infected',  
                            borderColor: '#3333ff',  
                            fill: true,  
                        },  
                        {  
                            data :  dailyData.map(({deaths}) =>  deaths),  
                            label: 'Deaths',  
                            borderColor: 'red',  
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',  
                            fill: true,  
                        }]  
                    }}  
                    options={ {  
                        scales : { xAxes : [ { gridLines : { display : false } } ], yAxes : [ { gridLines : { display : false } } ] }  
                    } }  
                    />):null  
                    );  
  
const BarChart  =(  
       confirmed?(  
        <Bar  
        data={{  
            labels: ['Infected', 'Recovered', 'Deaths'],  
            datasets:[{  
                label:'People',  
                backgroundColor:['rgba(108, 10, 235, 0.5)','rgba(60, 165, 12, 0.89)', 'rgba(179, 13, 13, 0.829)' ],  
                data:[confirmed.value, recovered.value, deaths.value]  
            }]  
        }}  
        options={{  
            legend:{display:false},  
            title: {display:true, text:`current state in ${country}`}  
        }}  
        />             
        ): null  
    )  
    return (  
     <div className={styles.container}>  
         {country? BarChart : lineChart}  
     </div>  
    )  
}  
export default Chart; 