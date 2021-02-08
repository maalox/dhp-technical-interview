import { APIGatewayEvent, Context } from 'aws-lambda';
import { DynamoDbDriver } from './repository/dynamodb';
import { v4 as uuidv4 } from 'uuid';


// Simple client for talking to offline dynamoDB.
const ddb = new DynamoDbDriver().client;

export interface ApiResponse {
  statusCode: number,
  body: string
}

export interface AccountResponse {
  account: {
    userID: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    locale: string
  }
}

export interface ProfileCreation {
  userID: string
}

//  Example of using the DynamoDbDriver client.

exports.interview = async function (event: APIGatewayEvent, context: Context, callback) {

  let userId: string = uuidv4();

  // Creating data

  await ddb.put({
    TableName: "profiles",
    Item: {
      'pkey': userId,
      'firstName': "Sanity",
      'lastName': "Test"
    },
    ConditionExpression: "attribute_not_exists(pkey)"
  }).promise();

  // Find data example

  let query = {
    TableName: "profiles",
    KeyConditionExpression: "pkey = :pkey",
    ExpressionAttributeValues: {
      ':pkey': userId
    }
  };

  let results = await ddb.query(query).promise();

  // update data example

  let updateQuery = {
    TableName: "profiles",
    Key: {
      "pkey": userId
    },
    UpdateExpression: "set email = :email",
    ExpressionAttributeValues: {
      ":email": userId + "@example.com",
    }
  };

  await ddb.update(updateQuery).promise();

  // delete data example

  let deleteQuery = {
    TableName: "profiles",
    Key: {
      'pkey': userId
    }
  }

  await ddb.delete(deleteQuery).promise();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(results),
  });

}

exports.account = async function (event: APIGatewayEvent, context: Context, callback) {

  let accountStub: AccountResponse = {
    "account": {
      "userID": "6ab2c811-858f-43bb-8b85-9a98c7091880",
      "firstName": "Tony",
      "lastName": "Pizza",
      "dateOfBirth": "1990-01-01",
      "email": "tony.pizza@example.com",
      "locale": "en-US"
    }
  };

  let apiResponse: ApiResponse = {
    statusCode: 200,
    body: JSON.stringify(accountStub)
  }

  callback(null, apiResponse);
}

exports.profile = async function (event: APIGatewayEvent, context: Context, callback) {

  let profileCreationStub = { "userID": uuidv4() }

  let apiResponse: ApiResponse = {
    statusCode: 200,
    body: JSON.stringify(profileCreationStub)
  }

  callback(null, apiResponse);
}