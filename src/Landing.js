import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify'
import awsExports from "./aws-exports";
import React, { useEffect, useState } from 'react'
import {Authenticator} from '@aws-amplify/ui-react'
import { Auth } from "aws-amplify";
import '@aws-amplify/ui-react/styles.css'

const Landing = (props) => {

  const [name, setName] = useState(props.name)
  const [input, setInput] = useState("")
  let addedStocks = []
  const [wholePortfolio, setwholePortfolio] = useState([])

  async function getStocks() {

      const URL = "https://xcldpffhqi.execute-api.us-east-1.amazonaws.com/dev/getUserStocks/" + name;

      try {
        const response = await fetch(URL);
        const data = await response.json();
        const currStockArr = data.Item.stocks
        setwholePortfolio(currStockArr)
        console.log(wholePortfolio)
        
      } catch (error) {
        console.error('Error:', error);
      }


  }

  async function addUser(e) {

    const body = {
      username: name,
      stocks: wholePortfolio
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
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  

  function addStocks(e){
    let currStock = [...wholePortfolio]
    currStock.push(e.input)
    setwholePortfolio(currStock)
    console.log(wholePortfolio)
  }

  function deleteStock(e){

    console.log(e)
    let currStock = []
    wholePortfolio.forEach((stock) => {
      if(stock!=e.thisStock){
        currStock.push(stock)
      }
    })
    console.log(currStock)
    setwholePortfolio(currStock)

  }

  useEffect(() => {
    addedStocks = getStocks()
      console.log(addedStocks)
  }, []);

  return (
    <div className="App">
      <Authenticator>
        {({signOut}) => (
            <div>
                <button onClick={signOut}>Sign Out</button>
                <br></br>
                <br></br>
                
                <div>
                    <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                    <button onClick={() => addStocks({input})}>Add</button>
                </div>
                
                <br/>
                <button onClick={() => addUser({input})}>Save User Info</button>

                <h2 style={{visibility: wholePortfolio.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
                {
                wholePortfolio.map((thisStock, index) => {
                    return (
                    <div key={thisStock}>
                    <span><b>Name:</b> {thisStock}</span>
                    <button onClick={() => deleteStock({thisStock})}>X</button>
                    </div>)
                })
                }
            </div>
        )}
      </Authenticator>
      
    </div>
  )
}

export default Landing;