import React, {useEffect, useState, useCallback } from 'react';
import {Line} from 'react-chartjs-2';
import 'antd/dist/antd.css';

import {baseUrl, centerStyle} from "./utils";
import {Affix, Card, Col, Row, Select} from "antd";
const { Option } = Select;

const PricePage = () => {
 const [chartData, setChartData] = useState({})
 const [clientType, setClientType] = useState([])
 const [security, setSecurity] = useState('African Sun')
 
const securities = async () =>  {
  const postdata = {
    "Table": " prices ",
    "Column": " distinct(code) as code ",
    "Where": " code <> '' and  CAST(date as date)  >= DATEADD(DD,-30,GETDATE()) order by code",

  };
  const myObjStr = JSON.stringify(postdata);
//console.log(myObjStr)
  const API = await fetch(`${baseUrl}sql`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: myObjStr,
  }).catch(error => {
    console.error(error.headers);
  });
  let result = await API.json();
  // ClientType = result;

  const resd = result.map(item => {
   // ClientType.push(item.code);
     const  code  = item.code
  return { code }
 })
 setClientType(result)
}

 const chart = async () =>  {

  const postdata = {
    "Table": " prices ",
    "Column": " code, convert(varchar(50), date, 103) as priceDate, Price,  (Select   cast(Avg(Cast(Price as decimal(38,2))) as varchar(50)) as Average from prices where company = '"+ security +"' and  CAST(date as date)  >= DATEADD(DD,-30,GETDATE()) group by company) as Average ",
    "Where": " company = '"+ security +"' and  CAST(date as date)  >= DATEADD(DD,-30,GETDATE()) order by   indno",

  };
  const myObjStr = JSON.stringify(postdata);
//console.log(myObjStr)
  const API = await fetch(`${baseUrl}sql`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: myObjStr,
  }).catch(error => {
    console.error(error.headers);
  });
  let result = await API.json();
  var prices = [];
  var dates = [];
  var result1 = result.map(item => {
    prices.push(item.Price);
    const { Price } = item
    return { Price }
})

 result1 = result.map(item => {
  dates.push(item.priceDate);
  const  priceDate  = item.priceDate
  return { priceDate }
})
    console.log(security)
   
   setChartData({
    labels: dates,
    datasets:[
      {
        label: security + ' Prices',
        data: prices,
        borderColor: 'green',
        backgroundColor: 'green',
        borderwidth:4
      },
      
    ] 
   })
 }

 var options = {
  responsive: true,
     scales: {
    //   y: {
    //     beginAtZero: true
    //   }
      x: {
        ticks: {
            maxTicksLimit: 10
            }
        }
     
     }
};

    function handleChange(value) {
        setSecurity(value)
    }
 useEffect(() => {
  
  securities()
  chart()
}, [security])

    return (
    <>
        <Row type="flex" align="middle">
            <Col>
                <div style={{ position: 'absolute', top: 10, left: 400 }}>
      <Select

          defaultValue={security}
             onChange={handleChange}
            name="clienttype"
            style={{ width: 520}}
          >
      
      {clientType.map((option) => (
              <Option key={option.code} value={option.code}>{option.code}</Option>
            ))}
          </Select>
                </div>
            </Col>
        </Row>
        <div className='padd'>
        <Card style={{ centerStyle }}>
      <div style={{width: '90%', height: '90%', margin: '5%'}}>
        <Line data={chartData} options={options} />
      </div>
        </Card>
        </div>
    </>
    );
  };



  export default PricePage;

