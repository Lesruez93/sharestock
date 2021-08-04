import React, {useEffect, useState, useCallback } from 'react';
import {Button, Form, Input, Select, Row, List, Typography, Table} from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {baseUrl} from "./utils";

const FormItem = Form.Item;
var data;
const PortfolioPage = ({profile}) => {

    const [statement, setStatement] = useState()

    const columns = [
        {
            title: 'Security',
            dataIndex: 'link.Idx1',
            key: 'link.Idx1',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.link.Idx1 - b.link.Idx1
        },
        {
            title: 'CSD',
            dataIndex: 'link.idx47',
            key: 'link.idx47',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.link.idx47 - b.link.idx47

        }, {
            title: 'No. of Shares',
            dataIndex: 'link.Idx4',
            key: 'link.Idx4',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.link.Idx4 - b.link.Idx4
        }, {
            title: 'Cost',
            dataIndex: 'link.Cost',
            key: 'link.Cost',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.link.Cost - b.link.Cost
        }, {
            title: 'Current Value',
            dataIndex: 'link.NetAmount',
            key: 'link.NetAmount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.link.NetAmount - b.link.NetAmount
        },

        {
            title: '% profit/Loss',
            dataIndex: 'link.perc',
            key: 'link.perc',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.link.perc - b.link.perc
        }


    ];
    const portfolio = async () =>  {
      const postdata = {
        "Table": " newport ",
        "Column": " *, ((NetAmount- Cost) / cost) * 100 as perc ",
        "Where": " idx6 = '"+ profile.id +"' and cost > '1' and idx4 > '0' order by idx1 ",

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
      }).then(r=>console.log(r)).catch(error => {
        console.error(error.headers);
      });
      try {

          let result = await API.json();
          data = result;
          setStatement(result)
          console.log(data)
      }catch (e) {

      }
      // ClientType = result;

    //   const resd = result.map(item => {
    //    // ClientType.push(item.code);
    //      const  securityid  = item.securityid
    //   return { securityid }
    //  })

    }


    useEffect(() => {
  
        portfolio()
      }, [])

    return (
        <>
                    <div className="padd"
    >
    {/*         <table className="table table-striped">*/}
    {/*         <tbody>*/}
    {/*    <tr >*/}
    {/*      <th  style={{textAlign:'left'}}>Security</th>*/}
    {/*      <th  style={{textAlign:'left'}}>CSD</th>*/}
    {/*      <th  style={{textAlign:'right'}}>No. of Shares</th>*/}
    {/*      <th  style={{textAlign:'right'}}>Cost</th>*/}
    {/*      <th  style={{textAlign:'right'}}>Current Value</th>*/}
    {/*      <th  style={{textAlign:'right'}}>% profit/Loss</th>*/}
    {/*    </tr>*/}
    {/*   */}
    {/* {data ?*/}
    {/*    data.map(link =>*/}
    {/*      <tr>*/}
    {/*        <td style={{textAlign:'left'}}>{link.Idx1}</td>*/}
    {/*        <td style={{textAlign:'left'}}>{link.idx47}</td>*/}
    {/*        <td style={{textAlign:'right'}}>{link.Idx4}</td>*/}
    {/*        <td style={{textAlign:'right'}}>{link.Cost}</td>*/}
    {/*        <td style={{textAlign:'right'}}>{link.NetAmount}</td>*/}
    {/*        <td style={{textAlign:'right'}}>{link.perc}</td>*/}
    {/*      </tr>*/}

    {/*    )*/}
    {/*  */}
    {/*  : null}*/}
    {/*  */}
    {/*   </tbody>*/}
    {/*</table>*/}

                        <Table dataSource={data} columns={columns} />;

                    </div>


        </>
   
   );
  };

  export default PortfolioPage;


