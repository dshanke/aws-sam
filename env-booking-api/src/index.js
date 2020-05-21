'use strict';

const service = require('./service.js');

exports.getAllEnv = async (event) => {
  const Env = await service.getAllEnv();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(Env, null, 2)
  };
};

exports.addEnv = async (event) => {
  console.log(event);

  console.log("");
  var userdata = JSON.parse(event.body);
  await service.addEnv(userdata);
  return {
    statusCode: 201,
    'headers': {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify("Env has been added", null, 2)
  };
};