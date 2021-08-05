import React, {useEffect, useState} from 'react';
import {Form, Table} from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {baseUrl} from "./utils";

const FormItem = Form.Item;
var data;
const StatementPage = ({profile}) => {
    const columns = [
        {
            title: 'Date',
            dataIndex: 'ProcDate',
            key: 'ProcDate',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.ProcDate - b.ProcDate
        },
        {
            title: 'Reference',
            dataIndex: 'ref',
            key: 'ref',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.ref - b.ref

        }, {
            title: 'Description',
            dataIndex: 'details',
            key: 'details',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.details - b.details
        }, {
            title: 'Debit',
            dataIndex: 'Debit',
            key: 'Debit',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.Debit - b.Debit
        }, {
            title: 'Credit',
            dataIndex: 'Credit',
            key: 'Credit',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.Credit - b.Credit
        }
]


    const [statement, setStatement] = useState()

    const statements = async () =>  {
      const postdata = {
        "Table": " dbo.Statement INNER JOIN  dbo.idmsMst ON dbo.Statement.Client = dbo.idmsMst.Idx1 and dbo.Statement.userid = dbo.idmsMst.userid ",
        "Column": " TOP 100 PERCENT Left(idmsmst.Idx31,17) as CSD,dbo.Statement.Client, dbo.Statement.ProcDate, dbo.Statement.seq, dbo.Statement.details, dbo.Statement.type, dbo.Statement.ref,  dbo.Statement.IndNo, dbo.idmsMst.Idx2, dbo.idmsMst.Idx31, dbo.idmsMst.Idx13, dbo.idmsMst.Idx32, dbo.Statement.[month],  ISNULL(dbo.Statement.Debit, ' ') AS Debit, ISNULL(dbo.Statement.credit, ' ') AS Credit  ",
        "Where": " dbo.Statement.Userid = '"+ profile.code +"'  and dbo.Statement.client like '"+ profile.id +"'  ORDER BY dbo.Statement.Client, dbo.Statement.ProcDate desc, dbo.Statement.type ",
    
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
     data = result;
    //   const resd = result.map(item => {
    //    // ClientType.push(item.code);
    //      const  securityid  = item.securityid
    //   return { securityid }
    //  })
    setStatement(result)
    console.log(data)
    }


    useEffect(() => {
  
        statements()
      }, [])

    return (
        <>
                    <div  className="padd"
    >
    {/*         <table className="table table-striped">*/}
    {/*         <tbody>*/}
    {/*    <tr >*/}
    {/*      <th  style={{textAlign:'left'}}>Date</th>*/}
    {/*      <th  style={{textAlign:'left'}}>Reference</th>*/}
    {/*      <th  style={{textAlign:'left'}}>Description</th>*/}
    {/*      <th  style={{textAlign:'right'}}>Debit</th>*/}
    {/*      <th  style={{textAlign:'right'}}>Credit</th>*/}
    {/*    </tr>*/}
    {/*   */}
    {/* {data ?*/}
    {/*    data.map(link =>*/}
    {/*      <tr>*/}
    {/*        <td style={{textAlign:'left'}}>{link.ProcDate}</td>*/}
    {/*        <td style={{textAlign:'left'}}>{link.ref}</td>*/}
    {/*        <td style={{textAlign:'left'}}>{link.details}</td>*/}
    {/*        <td style={{textAlign:'right'}}>{link.Debit}</td>*/}
    {/*        <td style={{textAlign:'right'}}>{link.Credit}</td>*/}
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

  export default StatementPage;


