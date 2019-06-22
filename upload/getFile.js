const sha1 = require('js-sha1');
const moment = require('moment');

module.exports = (bucket, fileMime, buffer) => {
  const fileExtension = '.' + fileMime.ext;
  const hash = sha1(new Buffer(new Date().toString()));

  const filePath = hash + '/';
  const fileName = moment().format('YYYY-MM-DD-HH:mm:ss');
  const fileFullName = filePath + fileName;
  const fileFullPath = bucket + fileFullName;

  const parameters = {
    Bucket: bucket,
    Key: fileFullName + fileExtension,
    Body: buffer
  };

  const description = {
    size: buffer.toString('ascii').length,
    type: fileMime.mime,
    name: fileName,
    path: fileFullName
  }

  return {
    parameters: parameters,
    description: description
  }
}
