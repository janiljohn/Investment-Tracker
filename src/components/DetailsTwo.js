import React, {useContext, useState, useEffect} from "react";
import Card from "./Card";
import { mockSearchResults } from "../constants/mock";
import StockContext from "../context/StockContext";
import { fetchStocks, addStocks } from "../api/stock-api";

const DetailsTwo = (props) => {

  const {setStockSymbol} = useContext(StockContext);
  const {stockSymbol} = new useContext(StockContext);
  const [wholePortfolio, setWholePortfolio] = useState([])
  var change = true;

  useEffect(() => {
    const updatePortfolio = async () => {
        try {
            const stock = await fetchStocks(props.userName)
            setWholePortfolio(stock)
        } catch (error) {
            setWholePortfolio([]);
            console.log(error)
        }
    }
    updatePortfolio();
    change = false;
  }, []);

  const containsStock = (stock) => {
    var found = false;
    wholePortfolio.forEach((currStock) => {
        if(stock==currStock){
            found = true;
        }
    });
    return found;
  }

  async function handleAdd() {
    let currStock = [...wholePortfolio]
    currStock.push(stockSymbol)
    setWholePortfolio(currStock)
    change = true;
    console.log(change)
  }

  async function handleRemove() {
    let currStock = []
    wholePortfolio.forEach((stock) => {
      if(stock!=stockSymbol){
        currStock.push(stock)
      }
    })
    setWholePortfolio(currStock)
    change = true;
    console.log(change)
  }

  async function handleSave() {
    try {
        addStocks(wholePortfolio, props.userName);
        change = false;
        
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Card>
      {containsStock(stockSymbol) ? <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleRemove}>Remove Stock</button> : <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleAdd}>Add Stock</button>}
      {change ? <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 content-end" onClick={handleSave}>Save Changes</button> : <div></div>}
      {console.log(change)}
      <ul className="w-full h-full flex flex-col justify-between divide-y-1 overflow-y-scroll">
        {(wholePortfolio).map((stock, index) => {
          return (
            <li 
              key={stock} 
              className="flex-1 flex justify-between items-center"
              onClick={() => {
                setStockSymbol(stock)
              }}  
            >
              <button>{stock}</button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default DetailsTwo;