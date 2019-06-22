const sha1 = require('js-sha1')
const moment = require('moment')
const fileType = require('file-type')
const File = require('./File.js')

function createFileFromBuffer (buffer) {
  const filePath = createFilePath()
  const fileName = createFileNameFromCurrentDate()
  const fileMime = fileType(buffer)
  const fileExtension = createFileExtensionFromMime(fileMime)

  const fileFullName = filePath + fileName + fileExtension
  const file = new File(fileName, fileFullName, fileMime.mime)

  return file
}

function createFileExtensionFromMime (mime) {
  return '.' + mime.ext
}

function createFilePath () {
  const hash = createHash()

  return hash + '/'
}

function createHash () {
  return sha1(new Date().toString())
}

function createFileNameFromCurrentDate () {
  return moment().format('YYYY-MM-DD-HH:mm:ss')
}

module.exports = createFileFromBuffer
