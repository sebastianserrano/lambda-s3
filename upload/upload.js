const getFileConfiguration = require('./getFileConfiguration.js')
var AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-2' })
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

exports.handler = async (event, context, callback) => {
  const request = JSON.parse(event.body)
  const base64String = request.base64String

  const buffer = Buffer.from(base64String, 'base64')

  const fileConfig = getFileConfiguration(buffer)
  const parameters = fileConfig.parameters

  try {
    await s3.putObject(parameters)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        ...fileConfig.description
      })
    })
  } catch (error) {
    callback(error)
  }
}
