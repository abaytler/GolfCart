// ------------ NodeJS runtime ---------------
// Add aws-sdk in package.json as a dependency
// Example:
// {
//     "dependencies": {
//         "aws-sdk": "^2.0.9",
//     }
// }

const AWS = require('aws-sdk');

// Create the DynamoDB Client with the region you want
const region = 'us-east-1';
const dynamoDbClient = createDynamoDbClient(region);

// Create the input for query call
const queryInput = createQueryInput();

 // Call DynamoDB's query API
executeQuery(dynamoDbClient, queryInput).then(() => {
    console.info('Query API call has been executed.')
  }
);

//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // Call DynamoDB's query API
  let lat = executeQuery(dynamoDbClient, queryInput);
  lat.then(function(result) {
	  //console.log("Latitude: "+result)
	  res.end("Received At: "+result[0]+"\nLatitude: "+result[1]+"\nLongitude: "+result[2])
  })
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function createDynamoDbClient(regionName) {
  // Set the region
  AWS.config.update({region: regionName});
  return new AWS.DynamoDB();
}

function createQueryInput() {
  return {
    "TableName": "golfgpsDB",
    "ScanIndexForward": true,
    "ConsistentRead": false,
    "KeyConditionExpression": "#88450 = :88450",
    "ExpressionAttributeValues": {
      ":88450": {
        "S": "1631301245036"
      }
    },
    "ExpressionAttributeNames": {
      "#88450": "end_device_ids"
    }
  }
}

async function executeQuery(dynamoDbClient, queryInput) {
  // Call DynamoDB's query API
  try {
    const queryOutput = await dynamoDbClient.query(queryInput).promise();
	console.info("SUCCESS");
	latitude = queryOutput.Items[0].test.M.uplink_message.M.decoded_payload.M.latitude.N
	longitude = queryOutput.Items[0].test.M.uplink_message.M.decoded_payload.M.longitude.N
	received_at = queryOutput.Items[0].test.M.uplink_message.M.received_at.S
	
    console.info(latitude);
	console.info(longitude);
	console.info(received_at);
	
	return [received_at, latitude, longitude];
    // Handle queryOutput
  } catch (err) {
    handleQueryError(err);
  }
}

// Handles errors during Query execution. Use recommendations in error messages below to
// add error handling specific to your application use-case.
function handleQueryError(err) {
  if (!err) {
    console.error('Encountered error object was empty');
    return;
  }
  if (!err.code) {
    console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
    return;
  }
  // here are no API specific errors to handle for Query, common DynamoDB API errors are handled below
  handleCommonErrors(err);
}

function handleCommonErrors(err) {
  switch (err.code) {
    case 'InternalServerError':
      console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;
    case 'ProvisionedThroughputExceededException':
      console.error(`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. `
        + `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`);
      return;
    case 'ResourceNotFoundException':
      console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`);
      return;
    case 'ServiceUnavailable':
      console.error(`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;
    case 'ThrottlingException':
      console.error(`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;
    case 'UnrecognizedClientException':
      console.error(`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. `
        + `Error: ${err.message}`);
      return;
    case 'ValidationException':
      console.error(`The input fails to satisfy the constraints specified by DynamoDB, `
        + `fix input before retrying. Error: ${err.message}`);
      return;
    case 'RequestLimitExceeded':
      console.error(`Throughput exceeds the current throughput limit for your account, `
        + `increase account level throughput before retrying. Error: ${err.message}`);
      return;
    default:
      console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`);
      return;
  }
}
