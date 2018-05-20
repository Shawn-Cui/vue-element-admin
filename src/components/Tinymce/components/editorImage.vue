<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload" action="https://httpbin.org/post" :multiple="false" :file-list="fileList" :show-file-list="false"
        list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload" :http-request="handleUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import upload from '@/utils/upload'

export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      imgURL: '',
      uploadStatus: false,
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleUpload(file) {
      const me = this
      const img = new Image()
      const url = URL.createObjectURL(file.file)
      img.src = url
      img.onload = function() {
        console.log(this, this.width, this.height)
        upload.uploadHandle(file, function(err, url) {
          console.log(err, url)
          if (err) {
            console.log(err, '上传失败！')
          }
          me.imgURL = url
          me.uploadStatus = true
        })
      }
    },
    handleSubmit() {
      if (!this.uploadStatus) {
        this.$message('请等待图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      console.log(this.imgURL)
      this.$emit('successCBK', this.imgURL)
      this.uploadStatus = false
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      // const uid = file.uid
      // const objKeyArr = Object.keys(this.listObj)
      // for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //   if (this.listObj[objKeyArr[i]].uid === uid) {
      //     this.listObj[objKeyArr[i]].url = response.files.file
      //     this.listObj[objKeyArr[i]].hasSuccess = true
      //     return
      //   }
      // }
    },
    handleRemove(file) {
      // const uid = file.uid
      // const objKeyArr = Object.keys(this.listObj)
      // for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //   if (this.listObj[objKeyArr[i]].uid === uid) {
      //     delete this.listObj[objKeyArr[i]]
      //     return
      //   }
      // }
    },
    beforeUpload(file) {
      // const _self = this
      // const _URL = window.URL || window.webkitURL
      // const fileName = file.uid
      // this.listObj[fileName] = {}
      // return new Promise((resolve, reject) => {
      //   const img = new Image()
      //   img.src = _URL.createObjectURL(file)
      //   img.onload = function() {
      //     _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
      //   }
      //   resolve(true)
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
  }
}
</style>
