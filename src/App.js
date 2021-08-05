import React, {useEffect, useState} from "react";
import {Link, MemoryRouter as RouterMem, Route} from "react-router-dom";
import OrderPage from './OrderPage';
import StatementPage from './Statement';
import PortfolioPage from './Portfolio';
import PricePage from './home';
import PayPage from "./paynow";
import {Eye, Mail} from 'react-feather';
import {Affix, Button, Form, Input, Menu, message, Popover, Row, } from 'antd';
import 'antd/dist/antd.css';
import './index.css'
import {AppstoreOutlined,SnippetsOutlined, DollarCircleOutlined , SwapOutlined,  BgColorsOutlined} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { SketchPicker } from 'react-color'
import { Typography } from 'antd';
import {baseUrl, Post, verifyToken,} from './utils';
import cookie from 'js-cookie';
import {GlobalStyles} from "./GlobalStyles";

const { SubMenu } = Menu;
const { Title} = Typography;
const {Text  } = Typography;

const FormItem = Form.Item;
var token = "";


function App(props, context ) {

    //token = cookie.get('auth')
    //console.log(token)
    const history = useHistory();

    const [count, setCount] = React.useState(0);
    const [loading,setLoading] = useState(false);
    const [userName, setUsername] = useState()
    const [container, setContainer] = useState(null);
    const [key, setKey] = useState("/");
    const [background,setBackground] = useState( '#FFFFFF' );
    const [backgroundColor,setBackgroundColor] = useState( '#F0F0F0' );
    const [background2,setBackground2] = useState( '#07c7ff' );
    const  handleChangeComplete2 = (color) => {

        setBackground2(color.hex );
    };

    const  handleChangeComplete = (color) => {

        setBackground(color.hex );
    };

    const  handleChangeCompleteBgColor = (color) => {

        setBackgroundColor(color.hex );
    };

    const rightStyle = { position: 'absolute', top: 0, right: 0 };
    const fab = { position: 'absolute', top: 40, right: 20 };



    var profile =  token ? verifyToken(token) : '';
    console.log(profile)
    profile = {id: "DATVESTNO.6NONT1959-0001", name: "OLSEN BRETT", csd: "171120026925-0001", code: "MOC"}
    async function login(){
        setLoading(true);


        let data1 = { };
        //console.log(data)
        /* email */
        //data.target[0].__reactProps$dc93hu7x1i.value
        data1 = {  email: userName || '' };
        /* password */
        data1 = { ...data1, password: pass || '' };
        const loginApi = await fetch(`${baseUrl}clientauth`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        }).catch(error => {
            console.error('Error:', error);
        });
        let result = await loginApi.json();
        // console.log(result)
        if (result.success ) {
            token = result.token;
            message.success(
                'Sign complete. Taking you to your dashboard!'
            )
            localStorage.setItem('signin','in');
            profile = token ? verifyToken(token) : '';
            // memory.set(sessionId, token);

            // set the set-cookie header on the response with the session ID
            //  result.setHeader('set-cookie', `auth=${token}`);
            cookie.set('auth', token,{
                expires: (1/24/60)*10
            })

            // req.session = session;
            //Route.push('/');

        } else {
            message.error(result.error)
        }
        setLoading(false);

        Bal();

    }

    async function Bal(){
        const postdata = {
            "db": "StockTest",
            "Table": " dbo.TotalStat INNER JOIN dbo.idmsMst ON dbo.TotalStat.Client = dbo.idmsMst.Idx1 ",
            "Column": " dbo.TotalStat.Client,dbo.idmsMst.Idx2 as ClientName, SUM(cast(dbo.TotalStat.Total * -1 as decimal(38,2))) AS Expr1, dbo.idmsMst.Idx28, dbo.idmsMst.Idx13,getdate() as date ",
            "Where": " dbo.totalstat.userid = '"+ profile.code +"' and dbo.totalstat.client like '"+ profile.id +"' GROUP BY dbo.TotalStat.Client,dbo.idmsMst.Idx2, dbo.idmsMst.Idx28 ,dbo.idmsMst.Idx13 ",

        };
        const myObjStr = JSON.stringify(postdata);
        //console.log(myObjStr)
        //   const API = await fetch(`${baseUrl}sql`, {
        //     //     method: 'POST',
        //     //     headers: {
        //     //       Accept: 'application/json',
        //     //       'Content-Type': 'application/json',
        //     //     },
        //     //     body: myObjStr,
        //     //   }).catch(error => {
        //     //     console.error(error.headers);
        //     //   });
        //     //  let result = await API.json();
        Post(myObjStr).then(result=>{
          //  setSecurity(result)
            if(result.length > 0) {setBal(result[0].Expr1)}
        }).catch(er=>{

        });


    }

    const MINUTE_MS = 600000;

    const content2 = (
        <div>
            <SketchPicker
                color={background2 }
                onChangeComplete={handleChangeComplete2 }
            />
        </div>
    );

    const backgroundContent = (
        <div>
            <SketchPicker
                color={backgroundColor }
                onChangeComplete={handleChangeCompleteBgColor }
            />
        </div>
    );

    const content = (
        <div>
          <SketchPicker
              color={background }
              onChangeComplete={handleChangeComplete }
          />
        </div>
    );

    const  handleClick = e => {
        console.log('click ', e);

        setKey({ current: e.key });
    };
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Logs every minute');
            Bal()
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    const [pass, setPass] = useState()
    const [bal, setBal] = useState('0.00')
    const centerStyle2 = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        background:background2

    };

    const centerStyle = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        background:background

    };
    return (
        <>
            <GlobalStyles />
            <div style={{background:backgroundColor}}  className="scrollable-container"  ref={setContainer}>

                {profile  ? (
                        <RouterMem>
                            <Menu   style={centerStyle}  mode="horizontal">

                                <Menu.Item style={{rightStyle}} >
                                    <div>
                                        <Affix  target={() => container}>
                                            <Popover content={content} title="Theme" trigger="click">

                                                <Button type={'secondary'} shape="circle" icon={<BgColorsOutlined />} size={'large'} />
                                            </Popover>
                                        </Affix>
                                    </div>
                                </Menu.Item>

                            {/*<table style={{width: '40%'}} >*/}

                            {/*   */}
                            {/*        /!*<tr style={{"margin-right":'20px'}} >*!/*/}
                            {/*        /!*    <th  style={{width: '5%', textAlign:'right'}}>Balance</th>*!/*/}
                            {/*        /!*    <th  style={{width: '5%', textAlign:'right'}}>Unsettled</th>*!/*/}
                            {/*        /!*    <th  style={{width: '5%', textAlign:'right'}}>Holdings</th>*!/*/}
                            {/*        /!*    <th  style={{width: '5%', textAlign:'right'}}>Available</th>*!/*/}
                            {/*        /!*</tr>*!/*/}

                            {/*        /!*<tr  >*!/*/}
                            {/*        /!*    <td style={{width: '5%', textAlign:'right'}} >{bal}</td>*!/*/}
                            {/*        /!*    <td style={{width: '5%', textAlign:'right'}}>0.00</td>*!/*/}
                            {/*        /!*    <td style={{width: '5%', textAlign:'right'}}>0.00</td>*!/*/}
                            {/*        /!*    <td style={{width: '5%', textAlign:'right'}}>{bal}</td>*!/*/}
                            {/*        /!*</tr>*!/*/}

                            {/*    </table>*/}

                                <Menu.Item  >
                                    <div>
                                        <Title level={5}>  <h5>Balance</h5></Title>
                                        <Text  className="p">0.00</Text>
                                    </div>
                                </Menu.Item>

                                <Menu.Item  >
                                    <div>
                                        <Title level={5}>     <h5>Unsettled</h5></Title>
                                        <Text  className="p">0.00</Text>
                                    </div>
                                </Menu.Item>
                                <Menu.Item  >
                                <div>
                                    <Title level={5}> <h5>Holdings</h5></Title>
                                    <Text  className="p">0.00</Text>
                                </div>
                            </Menu.Item>
                                <Menu.Item  >
                                <div>
                                    <Title level={5}>   <h5>Available</h5></Title>
                                    <Text  className="p">  0.00</Text>
                                </div>
                            </Menu.Item>
</Menu>
                            {/*<Link to="/" style={{margin: '10px'}}>Prices</Link>*/}
                            {/*<Link to="/orders" style={{margin: '10px'}}>Place Orders</Link>*/}
                            {/*<Link to="/statement" style={{margin: '10px'}}>Statement</Link>*/}
                            {/*<Link to="/portfolio" style={{margin: '10px'}}>Portfolio</Link>*/}
                            {/*<Link to="/pay" style={{margin: '10px'}}>Transfer</Link>*/}


                       <div  >
                           <Menu theme={'dark'}  style={centerStyle2}  onClick={handleClick} selectedKeys={['price']} mode="horizontal">


                               <Menu.Item style={{rightStyle}} >
                                  <div>
                                      <Affix  target={() => container}>
                                          <Popover content={content2} title="Theme" trigger="click">

                                              <Button type={'secondary'} shape="circle" icon={<BgColorsOutlined />} size={'large'} />
                                          </Popover>
                                      </Affix>
                                  </div>
                               </Menu.Item>
                                <Menu.Item  key="/" icon={<DollarCircleOutlined   />  }>

                                    <Link to='/'> Prices</Link>
                                </Menu.Item>


                                <Menu.Item key="/orders"  to="/orders"    icon={<AppstoreOutlined />}>

                                    <Link to={'/orders'}> Place Orders</Link>
                                </Menu.Item>




                                <Menu.Item key="/statement"  icon={<SnippetsOutlined />}>
                                    <Link to={'/statement'}>  Statement</Link>
                                </Menu.Item>



                                <Menu.Item key="/portfolio"  icon={<AppstoreOutlined />}>
                                    <Link to={'/portfolio'}> Portfolio </Link>
                                </Menu.Item>


                                <Menu.Item key="/pay"  to="/pay"  icon={<SwapOutlined />}>
                                    <Link to={'/pay'}>   Pay</Link>
                                </Menu.Item>


                            </Menu>

                       </div>


                            <Route exact path="/" component={PricePage} />
                            <Route exact path="/orders" render={(props) => <OrderPage profile={profile}/>} />
                            <Route exact path="/statement" render={(props) => <StatementPage profile={profile}/>} />
                            <Route exact path="/portfolio" render={(props) => <PortfolioPage profile={profile}/>} />
                            <Route exact path="/pay" render={(props) => <PayPage profile={profile}/>} />

                        </RouterMem> ) :
                    (
                        <Row
                            type="flex"
                            width="100%"
                            justify="center"
                            className="px-3 bg-white mh-page"
                            style={{minHeight: '100vh'}}
                        >
                            <Form  layout="vertical"
                                   onSubmit={e => {
                                       e.preventDefault();

                                       login()

                                   }}
                            >

                                <div style={{ justify: "center"}}>

                                    <FormItem label="UserName">
                                        <Input
                                            prefix={
                                                <Mail
                                                    size={16}
                                                    strokeWidth={1}
                                                    style={{color: 'rgba(0,0,0,.25)'}}
                                                />
                                            }
                                            type="text"
                                            placeholder="UserName"
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </FormItem>

                                    <FormItem label="Password">
                                        <Input
                                            prefix={
                                                <Eye
                                                    size={16}
                                                    strokeWidth={1}
                                                    style={{color: 'rgba(0,0,0,.25)'}}
                                                />
                                            }
                                            type="password"
                                            placeholder="Password"
                                            onChange={e => setPass(e.target.value)}
                                        />
                                    </FormItem>
                                    <Button loading={loading} type="primary" onClick={e => {
                                        e.preventDefault();

                                        login()

                                    }}>Login</Button>

                                </div>


                            </Form>
                        </Row>
                    )  }
                <Affix  style={fab}>
                    <Popover content={backgroundContent} title="Theme" trigger="click">

                        <Button type={'secondary'} shape="circle" icon={<BgColorsOutlined />} size={'large'} />
                    </Popover>
                </Affix>
            </div>
        </>

    );
}
//export default Form.create()(App);
//export default Form.create()(MyForm);
export default App;

// export async function getServerSideProps(context) {

//   const { req } = context;

//   // const { token } = getAppCookies(req);
//   // const profile = token ? verifyToken(token.split(' ')[1]) : '';
//   const  token  = getAppCookies(req).auth;
//   const profile = token ? verifyToken(token) : '';
//    //loadSession(req, res);


//     return {
//       props: {
//         profile,
//           },
//     };
//   }
