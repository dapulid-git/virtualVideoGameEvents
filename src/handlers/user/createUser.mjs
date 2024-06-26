import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { required } from 'joi';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const middy = require("middy");
const Joi = require("joi");
const { errorHandler } = require("..../utils/errorHandler");
const { bodyValidator } = require("..../utils/validator");

const createUserSchema = Joi.object({
  userName: Joi.string().required(),
});

export const createUserLambdaHandler = middy(async (event) => {

  const { userName, userType } = JSON.parse(event.body);
  var response = {};

  const readData = await ddbDocClient.query({
    TableName: tableName,
    KeyConditionExpression: "pk = :a",
    ExpressionAttributeValues: { ":a": userName }
  });

  if (readData.Count === 0) {

    await ddbDocClient.put({
      TableName: tableName,
      Item: {
        pk: userName,
        sk: userType
      }
    });

    response = {
      statusCode: 201,
      body: JSON.stringify({
        requestDateTime: new Date(),
        detail: `User: ${userName} was created successfully`
      })
    };
  } else {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        requestDateTime: new Date(),
        detail: `User ${userName} is already registered.`
      })
    };
  }

  return response;

}).use(bodyValidator(createUserSchema))
  .use(errorHandler());