require('dotenv').config()

const { getSuccessResponse } = require("../helper/success");
const { getErrorResponse } = require("../helper/error");

const uuid = require("uuid");
const AWS = require("aws-sdk");
const dynamoose = require("dynamoose")
const ddb = new dynamoose.aws.ddb.DynamoDB();

const { ArticlesModel } = require("../models/articles-model")

module.exports.main = async (event) => {
  try {
    const pathParameters = event.pathParameters;
    const { id } = pathParameters;

    const request = JSON.parse(event.body);
    const { ...data } = request;

    const result = await ArticlesModel.update({ id }, { ...data });

    return getSuccessResponse(result)
  } catch(err) {
    return getErrorResponse(err)
  }
}
