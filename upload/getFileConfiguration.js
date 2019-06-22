const createFileFromBuffer = require('./createFile.js')
const BUCKET = 'lambda-s3-0'

module.exports = (buffer) => {
  const file = createFileFromBuffer(buffer)

  const parameters = {
    Bucket: BUCKET,
    Key: file.path,
    Body: buffer,
    ACL: 'public-read'
  }

  const description = {
    size: buffer.toString('ascii').length,
    type: file.mime,
    name: file.name,
    path: file.path
  }

  return {
    parameters: parameters,
    description: description
  }
}
