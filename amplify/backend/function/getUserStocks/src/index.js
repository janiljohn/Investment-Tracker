// /* Amplify Params - DO NOT EDIT
// 	ENV
// 	REGION
// Amplify Params - DO NOT EDIT */

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     return {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  },
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };

// const AWS = require('aws-sdk');
// const docClient = new AWS.DynamoDB.DocumentClient();



// exports.handler = async (event, context) => {

//     const params = {
//         TableName : 'portfolio-dev',
//         /* Item properties will depend on your application concerns */
//         Key: {
//           username: event.pathParameters.username
//         }
//     }

//     try {
//         const data = await docClient.get(params).promise()
//         return { body: JSON.stringify(data) }
//     } catch (err) {
//         return { error: err }
//     }
// }

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();



exports.handler = async (event, context) => {

    const params = {
        TableName : 'portfolio-dev',
        /* Item properties will depend on your application concerns */
        Key: {
          username: event.pathParameters.username
        }
    }

    try {
        const data = await docClient.get(params).promise()
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(data)
        };
        return response;

    } catch (err) {
        return { error: err }
    }
}

