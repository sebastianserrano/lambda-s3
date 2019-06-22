const createFileFromBuffer = require('./createFile.js');

module.exports = (bucket, buffer) => {
  const file = createFileFromBuffer(buffer);

  const parameters = {
    Bucket: bucket,
    Key: file.path,
    Body: buffer,
    ACL: "public-read"
  };

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
