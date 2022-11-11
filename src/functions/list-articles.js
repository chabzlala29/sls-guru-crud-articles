require('dotenv').config()

const { getSuccessResponse } = require("../helper/success");
const { getErrorResponse } = require("../helper/error");

const uuid = require("uuid");
const AWS = require("aws-sdk");
const dynamoose = require("dynamoose")

AWS.config.setPromisesDependency(require("bluebird"));

const ddb = new dynamoose.aws.ddb.DynamoDB();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { ArticlesModel } = require("../models/articles-model")

module.exports.main = async (event) => {
  try {
    const result = await ArticlesModel.scan().exec();

    return getSuccessResponse(result);
  } catch (error) {
    return getErrorResponse(result);
  }
};
