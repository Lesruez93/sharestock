import React, {useState} from "react";
import { Link, MemoryRouter as Router, Route } from "react-router-dom";
import AboutPage from './AboutPage';
import IndexPage from './home';
import {Eye, Mail} from 'react-feather';
import {Button, Card, Form, Input, message, Row} from 'antd';
import 'antd/dist/antd.css';

import {absoluteUrl, getAppCookies, verifyToken,} from '../src/utils';

const FormItem = Form.Item;





function App( props,{ form }) {
    const profile = props.profile;
    console.log(props)
    
    async function login(data){
        setLoading(true);
        
        let data1 = { };
    console.log(data.target[0].value)
        /* email */
        //data.target[0].__reactProps$dc93hu7x1i.value
        data1 = {  email: data.target[0].value || '' };
        /* password */
        data1 = { ...data1, password: data.target[1].value || '' };
        const loginApi = await fetch(`${url}auth`, {
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
      console.log(result)
      if (result.success ) {
              message.success(
                'Sign complete. Taking you to your dashboard!'
            )
                localStorage.setItem('signin','true');
    

       
      } else {
        message.error(result.error)
      }
      setLoading(false);
    
    }

  const [count, setCount] = React.useState(0);
  const [loading,setLoading] = useState(false);
    return (
        <>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>

            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>

            {profile ? (
            <Router>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/about" component={AboutPage} />
      </Router> ) :
      (  
        <Row
        type="flex"
        align="middle"
        justify="center"
        className="px-3 bg-white mh-page"
        style={{minHeight: '100vh'}}
    >
        <Form  layout="vertical"
                onSubmit={e => {
                    e.preventDefault();

                            login(e)

                }}
                >
  
        <div style={{ justify: "center"}}>
             <Card>
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
                        />
                </FormItem>
              <Button loading={loading} class="tect-center" type="primary" htmlType="submit">Login</Button>
             </Card>
            </div>
        

          </Form>
          </Row>
    )  }
        </>
            
    );
}
//export default Form.create()(App);
//export default Form.create()(MyForm);
export default App;

export async function getServerSideProps(context) {
    const { req } = context;

   // const { token } = getAppCookies(req);
   const  token  = getAppCookies(req).auth;
   console.log("Inoken")
    //const profile = token ? verifyToken(token.split(' ')[0]) : '';
    
    const profile = token ? verifyToken(token) : '';
  

    return {
      props: {
        profile,
          },
    };
  }
