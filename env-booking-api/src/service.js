'use strict';

const aws = require('aws-sdk');
const uuid = require('uuid/v4');

const EnvBookingTableName = process.env.TABLE_NAME;

exports.addEnv = async (env) => {
  const params = {
    TableName: EnvBookingTableName,
    Item: env
  };

  const dynamoDB = new aws.DynamoDB.DocumentClient();
  try {
    await dynamoDB.put(params).promise();
  } catch (error) {
    console.log(`Failed to add env: ${error}`);
    throw error;
  }
};

exports.getAllEnv = async () => {
  const params = {
    TableName: EnvBookingTableName
  };

  const dynamoDB = new aws.DynamoDB.DocumentClient();
  try {
    const results = await dynamoDB.scan(params).promise();
    return results.Items;
  } catch (error) {
    console.log(`Failed to fetch Env: ${error}`);
    throw error;
  }
};
