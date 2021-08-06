import React, { useEffect, useState } from "react";
import axios from "axios"
import { Line } from 'react-chartjs-2';
import { Form } from './components/Form'
import { CssBaseline } from '@material-ui/core';
const App = () => {
  const [cityData, setCityData] = useState({ labels: [], datasets: [] })
  const [cityName, setCityName] = useState("")

  console.log(cityData)

  const getCityData = () => {
    axios.get(`https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`)
      .then(resp => {
        const currentData = resp.data;

        const categoriesName = currentData.categories.map((cat) => cat.name);
        const scores = currentData.categories.map((cat) => cat.score_out_of_10);

        const rColor = Math.floor(Math.random() * 255);
        const gColor = Math.floor(Math.random() * 255);
        const bColor = Math.floor(Math.random() * 255);


        const dataSet = {
          label: cityName,
          backgroundColor: `rgba(${rColor}, ${gColor}, ${bColor}, .8)`,
          borderColor: `rgba(${rColor}, ${gColor}, ${bColor}, 1)`,
          borderWidth: 1,
          hoverBackground: `rgba(${rColor}, ${gColor}, ${bColor}, .3)`,
          data: scores
        }
        setCityData({ labels: categoriesName, datasets: [...cityData.datasets, dataSet] })
      })
  }

  useEffect(() => {
    getCityData()
  }, [cityName]);




  return (
    <div className="App">
      <CssBaseline />
      <Form cityName={cityName} setCityName={setCityName} />
      <Line
        data={cityData}
        width={100}
        height={50}
      // options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}

export default App;
