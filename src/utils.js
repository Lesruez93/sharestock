//import Router from 'next/router';
//import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from "axios";

const SECRET_KEY = "This is a Random Key";
export const baseUrl =  `https://www.sharestock.co.zw/api/`;
/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */

export const centerStyle = {
    position: 'relative',
    display: 'flex',
    padding:'20px',
    justifyContent: 'center',


};
export function verifyToken(jwtToken) {
  try {

    
    return jwt.verify(jwtToken, SECRET_KEY)["payload"];
   
  } catch (e) {
   // console.log('e:', e);
    return null;
  }
}

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export function getAppCookies(req) {
  const parsedItems = {};
  //console.log(req.headers.cookie)
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split('; ');
    cookiesItems.forEach(cookies => {
      const parsedItem = cookies.split('=');
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });
  }
  return parsedItems;
}


export  function  Post(data){
  return axios.post(`${baseUrl}sql`,data,
      {
        method: 'POST',
        headers: {

          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
      )
}

export  function  Post2(url, data){
  return axios.post(url,data,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
  )
}

/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */
export function absoluteUrl(req, setLocalhost) {
  var protocol = 'https:';
  var host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : window.location.host;
  if (host.indexOf('localhost') > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = 'http:';
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
    url: req,
  };
}

/*
 * @params {none} set action for logout and remove cookie
 * @return {function} router function to redirect
 */
export async function setLogout(e, req) {
  //e.preventDefault();
  Cookies.remove('token');
  Cookies.remove('auth');
 //Cookies.headers('auth').remove;
 // delete req.headers['header-name'];
 //delete e.headers['auth'];

 const loginApi = await fetch(`/api/Logout`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },

          }).catch(error => {
            console.error('Error:', error);
          });
          let result = await loginApi.json();
 // Router.push('/');
}
