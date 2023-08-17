import logo from '../logo.svg';
import '../App.css';
import Amplify, { API } from 'aws-amplify'
import awsExports from "../aws-exports";
import React, { useEffect, useState } from 'react'
import {Authenticator} from '@aws-amplify/ui-react'
import { Auth } from "aws-amplify";
import '@aws-amplify/ui-react/styles.css'

// Amplify.configure({
//     Auth: {
//       region: awsExports.REGION,
//       userPoolId: awsExports.USER_POOL_ID,
//       userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
//     }
//   })

// Amplify.configure({
//     Auth: {
//       region: "us-east-1",
//       userPoolId: "us-east-1_xvQFSV6dz",
//       userPoolWebClientId: "4emb8tm73brlrv7dpn4l0o6ig8"
//     }
//   })
  

const axios = require('axios');
const myAPI = "api60f93694"
const path = '/get'; 
// const user = await Auth.currentAuthenticatedUser();
// const user = 'Joel'

const PremiumPage = () => {

  const [name, setName] = useState("")
  const [input, setInput] = useState("")
  const [customers, setCustomers] = useState([])

  //Function to fetch from our backend and update customers array
  function getCustomer(e) {
    let customerId = e.input
    API.get(myAPI, path + "/" + customerId)
       .then(response => {
         console.log(response)
         let newCustomers = [...customers]
         newCustomers.push(response)
         setCustomers(newCustomers)

       })
       .catch(error => {
         console.log(error)
       })
  }

  async function addUser(e) {

    const body = {
      username: name,
      stocks: customers
    }

    fetch('https://xcldpffhqi.execute-api.us-east-1.amazonaws.com/dev/postUserStocks/user7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      mode: 'no-cors'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data);
        // Handle the response data as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      });
  }
  

  function addStocks(e){
    let newCustomers = [...customers]
    newCustomers.push(e.input)
    setCustomers(newCustomers)
  }

  return (
    <div className="App">
      <Authenticator>
        {({signOut}) => (
            <div>
                <h1>Super Simple React App</h1>
                <h2>Welcome </h2>
                <button onClick={signOut}>Sign Out</button>
                <div>
                    <input placeholder="username" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    <br/>
                    <br/>
                    <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                    <button onClick={() => addStocks({input})}>Add</button>
                </div>
                
                <br/>
                <button onClick={() => addUser({input})}>Get Customer From Backend</button>

                <h2 style={{visibility: customers.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
                {
                customers.map((thisCustomer, index) => {
                    return (
                    <div key={thisCustomer}>
                    <span><b>Name:</b> {thisCustomer}</span>
                    </div>)
                })
                }
            </div>
        )}
      </Authenticator>
      
    </div>
  )
}

export default PremiumPage;