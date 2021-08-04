import React, {useEffect, useState, useCallback, Profiler } from 'react';
import {Button, Form, Input, Select, Row, List, Typography, Space, Col} from 'antd';
import 'antd/dist/antd.css';
import {baseUrl, centerStyle} from "./utils";
import Card from "antd/es/card";

const FormItem = Form.Item;

const OrderPage = ({profile}) => {

    const [security, setSecurity] = useState([])
    const [pricetype, setpricetype] = useState('')
    const [type, settype] = useState('')
    const [price, setprice] = useState('0')
    const [qty, setqty] = useState('0')
    const [counter, setCounter] = useState('')

    async function  order() {
        const postdata = {
            "Table": " orders ",
            "Column": "  Client, Security, Quantity, OrderType, Price, Limit, Duration, Status,  Company ",
            "Values": " '"+ profile.csd +"','"+ counter +"','"+ qty +"','"+ type +"','"+ pricetype +"','"+ price +"','','Open','"+ profile.code +"' ",
        
          };
          const myObjStr = JSON.stringify(postdata);
        const API = await fetch(`${baseUrl}insert`, {
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
      }
    const DescriptionItem = ({ title, content }) => (
        <Row type="flex" align="middle" justify="space-between" className="mb-2">
            <span>{title}</span>
            <small>{content}</small>
        </Row>
    );
    const securities = async () =>  {
      const postdata = {
        "Table": " security ",
        "Column": " securityid ",
        "Where": " securityid like '%.zw'",
    
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
    
    //   const resd = result.map(item => {
    //    // ClientType.push(item.code);
    //      const  securityid  = item.securityid
    //   return { securityid }
    //  })
     setSecurity(result)
    }
    function onChange(value) {
        
        setpricetype(value)
      }
      function onType(value) {
        
        settype(value)
      }
      function onCounter(value) {
        
        setCounter(value)
      }

    useEffect(() => {
  
        securities()
      }, [])

    return (
        <>


            <Row style={{padding:"20px"}} gutter={16}>
                    {/*<Form  name="basic"*/}
                    {/*labelCol={{ span: 10 }}*/}
                    {/*wrapperCol={{ span: 16 }} */}
                    {/*>*/}
                 <Col sm={24} md={12}>
                     <Card  bodyStyle={{ padding: 10 }} className="mb-4">
                         <Form
                             name="basic"
                             labelCol={{ span: 8 }}
                             wrapperCol={{ span: 16 }}>
                        <FormItem label="Stock Symbol">
                        <Select name="CounterDropDown" id="CounterDropDown" style={{width: '80%'}} onChange={onCounter}>
                        {security.map((option) => (
                        <Select.Option key={option.securityid} value={option.securityid}>{option.securityid}</Select.Option>
                        ))}
                          </Select>
                          </FormItem>
                        <FormItem stacked label="Transaction">
                        <Select name="transactionTypeDropDown" id="transactionTypeDropDown" style={{width: '80%'}}
                        onChange={onType}>
                          <Select.Option key="Buy" value="Buy">Buy</Select.Option>
                          <Select.Option key="Sell" value="Sell">Sell</Select.Option>
                        </Select>
                        </FormItem>
                        <FormItem label="Quantity">
                        <Input onChange={e => setqty(e.target.value) } style={{width: '80%'}} value={qty} name="quantityTextbox" type="number" maxLength="6" id="quantityTextbox" />
                        </FormItem>

                        <FormItem label="Price">
                        <Select name="priceDropDown" id="priceDropDown" style={{width: '80%'}}
                        onChange={onChange} >
                          <Select.Option  key="Market" value="Market">Market</Select.Option>
                          <Select.Option key="Limit" value="Limit">Limit</Select.Option>
                        </Select>
                        </FormItem>
                        <FormItem label="Limit" hidden={pricetype != "Limit"}>
                        <Input  onChange={e => setprice(e.target.value) } value={price} name="limitPriceTextBox" type="number" maxLength="6" id="limitPriceTextBox" />
                        </FormItem>
                             <div className="text-center">
                             <Button className="primary" type="primary" onClick={e => {
                                 e.preventDefault();

                                 order()

                             }}>Process Order</Button>
                         </div>
                         </Form>
                     </Card>
                 </Col>


                <Col sm={24} md={12}>
                    <Card  bodyStyle={{ padding: 12 }} className="mb-4">

             {/* <div style={{marginLeft: '5%'}}>*/}
             {/* <span>Brokerage: </span><br/>*/}
             {/* <span>ZSE Levy: </span><br/>*/}
             {/* <span>CSD Levy: </span><br/>*/}
             {/*  <span>Security Levy: </span><br/>*/}
             {/*  <span>Ivestor Protection Levy: </span><br/>*/}
             {/*  <span>VAT: </span><br/>*/}
             {/*  <span>Stamp Duty: </span><br/>*/}
             {/*  <span>Witholding Tax: </span><br/><br/>*/}
             {/*  <span><b>Total:</b> </span><br/>*/}

             {/*</div>*/}
             {/*<div style={{marginLeft: '5%'}}>*/}
             {/* <span> ZWL$ {(Math.round(((price * qty) * 0.0092) * 100) / 100).toFixed(2)}</span><br/>*/}
             {/* <span> ZWL$ {(Math.round(((price * qty) * 0.001) * 100) / 100).toFixed(2)}</span><br/>*/}
             {/* <span> ZWL$ {(Math.round(((price * qty) * 0.001) * 100) / 100).toFixed(2)}</span><br/>*/}
             {/*  <span> ZWL$ {(Math.round(((price * qty) * 0.0016) * 100) / 100).toFixed(2)}</span><br/>*/}
             {/*  <span> ZWL$ {(Math.round(((price * qty) * 0.00025) * 100) / 100).toFixed(2)}</span><br/>*/}
             {/*  <span> ZWL$ {(Math.round((((price * qty) * 0.0092) * 0.145) * 100) / 100).toFixed(2)}</span><br/>*/}
             {/*  <span> ZWL$ { type == 'Buy'  ? ( (Math.round(((price * qty) * 0.0025) * 100) / 100).toFixed(2)):(Math.round(0).toFixed(2))}</span><br/>*/}
             {/*  <span> ZWL$ {type == 'Sell'  ? ((Math.round(((price * qty) * 0.0001) * 100) / 100).toFixed(2)):(Math.round(0).toFixed(2))}</span><br/>*/}
             {/*  <br/>*/}
             {/*  <span><b>ZWL$ { type == 'Buy'  ? ( (Math.round((((price * qty) * 0.01689075630252101)+ (price * qty)) * 100) / 100).toFixed(2)):( (Math.round((((price * qty) * 0.0243839285714286)- (price * qty )) * -100) / 100).toFixed(2))}</b></span><br/>*/}
             {/*  */}
             {/*</div>*/}

                        <Col xs={10} >
                            <DescriptionItem
                                title={'Brokerage:'}
                                content={<span> ZWL$ {(Math.round(((price * qty) * 0.0092) * 100) / 100).toFixed(2)}</span>}
                            />

                            <DescriptionItem
                                title={'ZSE Levy:'}
                                content={<span> ZWL$ {(Math.round(((price * qty) * 0.001) * 100) / 100).toFixed(2)}</span>}
                            />

                            <DescriptionItem
                                title={'CSD Levy'}
                                content={<span> ZWL$ {(Math.round(((price * qty) * 0.001) * 100) / 100).toFixed(2)}</span>}
                            />

                            <DescriptionItem
                            title={'Security Levy:'}
                            content={<span> ZWL$ {(Math.round(((price * qty) * 0.0016) * 100) / 100).toFixed(2)}</span>}

                        /> <DescriptionItem
                            title={'Investor Protection Levy:'}
                            content={<span> ZWL$ {(Math.round(((price * qty) * 0.00025) * 100) / 100).toFixed(2)}</span>}

                        /> <DescriptionItem
                            title={'VAT:'}
                            content={<span> ZWL$ {(Math.round((((price * qty) * 0.0092) * 0.145) * 100) / 100).toFixed(2)}</span>}

                        /> <DescriptionItem
                            title={'Stamp Duty:'}
                            content={<span> ZWL$ { type == 'Buy'  ? ( (Math.round(((price * qty) * 0.0025) * 100) / 100).toFixed(2)):(Math.round(0).toFixed(2))}</span>}

                        /> <DescriptionItem
                            title={'Witholding Tax:'}
                            content={ <span> ZWL$ {type == 'Sell'  ? ((Math.round(((price * qty) * 0.0001) * 100) / 100).toFixed(2)):(Math.round(0).toFixed(2))}</span>}

                        /> <DescriptionItem
                            title={<h3> Total:</h3>}
                            content={<h3><b>ZWL$ { type == 'Buy'  ? ( (Math.round((((price * qty) * 0.01689075630252101)+ (price * qty)) * 100) / 100).toFixed(2)):( (Math.round((((price * qty) * 0.0243839285714286)- (price * qty )) * -100) / 100).toFixed(2))}</b></h3>}
                        />

                        </Col>
                    </Card>
                </Col>





      </Row>


</>
   
   );
  };

  export default OrderPage;


