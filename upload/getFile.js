module.exports = (bucket, fileMime, buffer) => {
  const fileExtension = fileMime.ext;
  const hash = sha1(new Buffer(new Date().toString()));
  const now = moment().fomat('YYYY-MM-DD HH:mm:ss');

  const filePath = hash + '/';
  const fileName = unixTime(now) + '.' + fileExtension;
  const fileFullName = filePath + fileName;
  const fileFullPath = bucket + fileFullName;

  const parameters = {
    bucket: bucket,
    key: fileFullName + fileExtension,
    body: buffer
  };

  const file = {
    size: buffer.toString('ascii').length,
    type: fileMime.mime,
    name: fileName,
    fullPath: fileFullPath
  }

  return {
    params: params,
    file: file
  }
}
