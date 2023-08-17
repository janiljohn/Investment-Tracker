async function addUser(e, name , customers) {

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

  // async function addUser(e) {

  //   console.log(name);

  //   try {
  //     const lambdaResponse = await API.post('Lambda', '/postUserStocks', {
  //       body: {
  //         username: name,
  //         stocks: customers
  //       },
  //     });
  //     console.log('Lambda function invoked:', lambdaResponse);
  //     // Handle the response from the Lambda function as per your application's requirements
  //   } catch (error) {
  //     console.error('Error invoking Lambda function:', error);
  //     // Handle any errors that occurred during the invocation
  //   }
  // }

  // async function addUser(e) {

  //   console.log(name);

  //   const myInit = {
  //     body: {
  //       username: name,
  //       stocks: customers
  //     }, // replace this with attributes you need
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "*",
  //       "Access-Control-Allow-Methods": "*"
  //     } // OPTIONAL
  //   };
    
  //   API.put(myAPI, '/postUserStocks', myInit)
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //   });
  // }

  // async function addUser(e) {

  //   console.log(name);

  //   const myInit = {
  //     body: {
  //       username: name,
  //       stocks: customers
  //     }, // replace this with attributes you need
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "*",
  //       "Access-Control-Allow-Methods": "*"
  //     },
  //     mode: 'no-cors'
  //   };
    
  //   return await API.post(myAPI, '/postUserStocks/' + name, myInit);
  // }