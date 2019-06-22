var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const fileType = require('file-type');
const getFile = require('./getFile.js');

const BUCKET = 'lambda-s3-0';

exports.lambdaHandler = async (event, context, callback) => {
  const request = JSON.parse(event.body);
  const base64String = request.base64String;

  const buffer = Buffer.from(base64String, 'base64');
  const fileMime = fileType(buffer);

  const file = getFile(BUCKET, fileMime, buffer);
  const parameters = file.parameters;

  try {
    await s3.putObject(parameters);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        ...file.description
      })
    });
  } catch(error) {
    callback(error)
  }
};
