import './App.css';
import {useState, useEffect } from 'react';
import {useGetWeaterDataQuery} from './redux/apiServices/weatherApi'
import Barchart from './components/bar_chart/Barchart';

function App() {
  const {data, isLoading, error} = useGetWeaterDataQuery()
  const chartData = data?.forecast?.forecastday

  return (
    <div className="App">
      <div><h1>{data?.location?.name}</h1></div>
      {data && <Barchart data={chartData}/>}
      {data?.forecast?.forecastday?.map((obj, i) => {
        return (
            <div key={i}>
            <h2>{obj?.date}</h2>
            <p>{obj?.day.maxtemp_c}</p>
            </div>
          )
      })
    }
    </div>
  );
}

export default App;
