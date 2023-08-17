// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     const obj = JSON.parse(event.body);
//     return {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  },
//         body: JSON.stringify(obj.username),
//     };
// };

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    console.log(event)

    // const { key1, key2 } = event.body;
    const obj = JSON.parse(event.body);

    const key1 = obj.username;
    const key2 = obj.stocks;

    const params = {
        TableName : 'portfolio-dev',
        /* Item properties will depend on your application concerns */
        Item: {
            username: key1,
            stocks: key2
        }
    }

    try {
        await docClient.put(params).promise();
        return { body: 'Successfully created item!' }
    } catch (err) {
        return { error: err }
    }

};