/**
 * 对腾讯云上传文件进行封装
 */

export default {
  handleImageAdded: function(options, callback) {
    // const Bucket = 'bordrin'
    // const Appid = '1252042681'
    // const Region = 'ap-shanghai'
    // const prefix = 'http://' + Bucket + '-' + Appid + '.cos.' + Region + '.myqcloud.com/'
    const method = (options.Method || 'get').toLowerCase()
    const key = options.Key || ''
    console.log(options)
    const pathname = key.indexOf('/') === 0 ? key : '/' + key
    const url = 'http://115.159.86.224:8282/auth'
    const xhr = new XMLHttpRequest()
    const data = {
      method: method,
      pathname: pathname
    }
    xhr.open('POST', url, true)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function(e) {
      console.log(e)
      if (e.target.responseText === 'action deny') {
        alert('action deny')
      } else {
        console.log(e.target)
        callback(e.target.responseText)
      }
    }
    xhr.send(JSON.stringify(data))
  },

  uploadHandle: function(file, fileName, callback) {
    // An example of using FormData
    // NOTE: Your key could be different such as:
    // let formData = new FormData()
    // formData.append('image', file)

    const Bucket = 'bordrin'
    const Appid = '1252042681'
    const Region = 'ap-shanghai'
    const prefix = 'http://' + Bucket + '-' + Appid + '.cos.' + Region + '.myqcloud.com/'
    if (!file.name) {
      file = file.file
    }
    const index = file.name.lastIndexOf('.')
    const key = fileName || '' + new Date().getTime() + file.name.substr(index)

    console.log(file, key)

    this.handleImageAdded({ Method: 'PUT', Key: key }, function(auth) {
      console.log(auth)

      const url = prefix + key
      console.log(url)
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', url, true)
      xhr.setRequestHeader('Authorization', auth)
      xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 206) {
          const ETag = xhr.getResponseHeader('etag')
          console.log(xhr, xhr.responseURL, ETag)
          const url = xhr.responseURL // Get url from response
          callback(null, url)
        } else {
          console.log('文件 ' + key + ' 上传失败，状态码：' + xhr.status)
          callback(' 上传失败，状态码：' + xhr.status)
        }
      }
      xhr.onerror = function() {
        console.log('文件 ' + key + ' 上传失败，请检查是否没配置 CORS 跨域规则')
        callback('上传失败，请检查是否没配置 CORS 跨域规则')
      }
      xhr.send(file)
    })
  }
}
