const sha1 = require('js-sha1');
const moment = require('moment');

function createFileFromMime(mime) {
  const fileExtension = '.' + mime.ext;
  const hash = sha1(new Date().toString());

  const filePath = hash + '/';
  const fileName = moment().format('YYYY-MM-DD-HH:mm:ss');
  const fileFullName = filePath + fileName + fileExtension;

  return {
    name: fileName,
    path: fileFullName,
    mime: mime.mime
  }
}

module.exports = (bucket, fileMime, buffer) => {
  const file = createFileFromMime(fileMime);

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
