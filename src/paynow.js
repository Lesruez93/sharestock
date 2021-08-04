import React, {useState } from 'react';
import {Button, Form, Input, Select, Row, List, message, Typography, Space} from 'antd';
import 'antd/dist/antd.css';
import {baseUrl} from "./utils";
import Card from "antd/es/card";
var dateFormat = require("dateformat");

const FormItem = Form.Item;

const PayPage = ({profile}) => {

    const [security, setSecurity] = useState([])
    const [pricetype, setpricetype] = useState('')
    const [email, setEmail] = useState('')
    const [price, setprice] = useState('0')
    const [phone, setPhone] = useState()
    const [counter, setCounter] = useState('')

    async function  PayEcocash() {
        let orderno = new Date().toLocaleString().replaceAll("/","").replaceAll(",","").replaceAll(":","").replaceAll(" ","").replaceAll("AM","").replaceAll("PM","");
        var postdata = {
            OrderNumber: orderno,
            Amount: price,
            PhoneNumber: phone,
            Email: email
    };
          const myObjStr = JSON.stringify(postdata);
        const API = await fetch(`${baseUrl}ecocash`, {
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
          console.log(result)
      }

      async function  Paypaynow() {
        //  new Date = Date.now().toString;
       
        let orderno = new Date().toLocaleString().replaceAll("/","").replaceAll(",","").replaceAll(":","").replaceAll(" ","").replaceAll("AM","").replaceAll("PM","");
        var postdata = {
            OrderNumber: orderno,
            Amount: price,
            PhoneNumber: phone,
            Email: email
    };
          const myObjStr = JSON.stringify(postdata);
        const API = await fetch(`${baseUrl}Payment`, {
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
          
          openInNewTab(result["redirectUrl"])
       
          const today = Date.now();

//console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));
var now = new Date();
var sql = ` Insert into payments( Idx3, Idx6, Idx7, Idx8, Idx16, Idx17,Idx18, Idx19, Idx23,  Idx25,userid,ProcessedBy,ProcessedTime,pollurl) values ('`+ dateFormat(now, "yyyy/MM/dd") + `','` + profile.id + `' ,'Web Payment' , 'CBZCUSTODIALBAN' , '` + price + `' , 'Receipt', `+ orderno +` , 'Receipt via web' , 'EOD' ,   '620','`+ profile.code + `','Web','` + dateFormat(now, "dd/MM/yyyy HH:mm:ss") + `', '` + result["pollUrl"] + `')
            Insert into payments( Idx3, Idx6, Idx7, Idx8, Idx16, Idx17,Idx18, Idx19, Idx23,  Idx25,userid,ProcessedBy,ProcessedTime,pollurl) values ('`+ dateFormat(now, "yyyy/MM/dd") + `','CBZCUSTODIALBAN' ,'Web Payment' , '` + profile.id + `' , '` + price + `' , 'Receipt', `+ orderno +` , 'Receipt via web' , 'EOD' ,   '205','` + profile.code + `','Web','` + dateFormat(now, "dd/MM/yyyy HH:mm:ss") + `','` + result["pollUrl"] + `')`
      
          const postdata1 = {
              "db": "StockTest",
            "statement": sql
          };
          
          const myObjStr1 = JSON.stringify(postdata1);
          console.log(myObjStr1)
      
          const API1 = await fetch(`${baseUrl}SqlBulk`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: myObjStr1,
          credentials: 'same-origin'
          }).catch(error => {
            console.error(error.headers);
          });
           result = await API1.json();
         
          if (result.status = 200) {
      
      
          } else {
      
            message.error("Error making payment.")
          }
      }

      const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }

    return (
        <>
        
    <div className="padd">
        <Card>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>

  
                  <FormItem label="Amount">
                      <Input onChange={e => setprice(e.target.value) } value={price} name="quantityTextbox" type="number"  style={{width: '80%'}} id="quantityTextbox" />
                      </FormItem>

                    
                      <FormItem label="Phone Number" >
                      <Input  onChange={e => setPhone(e.target.value) } value={phone} name="phoneTextBox" type="number" style={{width: '80%'}} id="phoneTextBox" />
                      </FormItem>

                      <FormItem label="Email Address" >
                      <Input  onChange={e => setEmail(e.target.value) } value={email} name="emailTextBox" type="email" style={{width: '80%'}}  id="emailTextBox" />
                      </FormItem>




              </Form>

        <div className="text-center">
            <Space>
                <Button className="primary" type="primary" onClick={e => {
                    e.preventDefault();

                    PayEcocash()

                }}>Pay Ecocash</Button>
                <Button  onClick={e => {
                    e.preventDefault();

                    Paypaynow()

                }}>Pay Paynow</Button>
            </Space>
        </div>
        </Card>
    </div>


</>
   
   );
  };

  export default PayPage;


