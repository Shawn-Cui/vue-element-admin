<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">
          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布
          </el-button>

        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
        </template>

      </sticky>

      <div class="createPost-main-container">

        <el-form-item label-width="120px" label="岗位:" class="postInfo-container-item" prop="name">
          <el-input placeholder="请填写岗位" style='min-width:150px;' v-model="postForm.name">
          </el-input>
        </el-form-item>

        <el-form-item label-width="120px" label="招聘人数:" class="postInfo-container-item" prop="count">
          <el-input-number v-model.number="postForm.count" label="人"></el-input-number>
        </el-form-item>

        <el-form-item label-width="120px" label="区域:" class="postInfo-container-item" prop="zone">
          <el-input placeholder="请填写区域" style='min-width:150px;' v-model="postForm.zone">
          </el-input>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="120px" label="岗位职责:" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            placeholder="请输入内容"
            v-model="postForm.content">
          </el-input>
          <span class="word-counter" v-show="contentLength">{{contentLength}}字</span>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="120px" label="岗位需求:" prop="demand">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            placeholder="请输入内容"
            v-model="postForm.demand">
          </el-input>
          <span class="word-counter" v-show="demandLength">{{demandLength}}字</span>
        </el-form-item>                        
      </div>
    </el-form>

  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
// import { fetchArticle } from '@/api/article'
// import { userSearch } from '@/api/remoteSearch'
import axios from 'axios'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  abstract: '', // 文章摘要
  content: '', // 文章内容
  coverURL: '', // 文章图片
  cn: undefined,
  en: undefined,
  topCoverURL: '',
  author: '', // 文章作者
  origin: '', // 文章来源
  dateOfRelease: undefined, // 前台展示时间
  id: undefined,
  comment_disabled: false
}

export default {
  name: 'articleDetail',
  components: { Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // const validateRequire = (rule, value, callback) => {
    //   if (value === '') {
    //     this.$message({
    //       message: rule.field + '为必传项',
    //       type: 'error'
    //     })
    //     callback(null)
    //   } else {
    //     callback()
    //   }
    // }
    return {
      coverURL: '',
      topCoverShow: false,
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      userLIstOptions: [],
      rules: {
        name: [
          { required: true, message: '岗位名称不能为空', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '岗位职责不能为空', trigger: 'blur' },
          { min: 5, message: '岗位职责应不少于五个字符', trigger: 'blur' }
        ],
        demand: [
          { required: true, message: '岗位需求不能为空', trigger: 'blur' },
          { min: 5, message: '岗位需求应不少于五个字符', trigger: 'blur' }
        ],
        count: [
          { required: true, message: '招聘人数不能为空', trigger: 'blur' },
          { type: 'number', min: 1, max: 10000, message: '范围：1 到 10000 人' }
        ],
        zone: [
          { required: true, message: '区域不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    contentLength() {
      return this.postForm.content ? this.postForm.content.length : 0
    },
    demandLength() {
      return this.postForm.demand ? this.postForm.content.demand : 0
    }
  },
  created() {
    console.log(this.$route.params)
    this.id = this.$route.params.id
    if (this.id || this.id === 0) {
      localStorage.setItem('bordrin-jobId', this.id)
    }
    this.getJobById()
  },
  methods: {
    async getJobById() {
      const storageId = await localStorage.getItem('bordrin-jobId')
      console.log(storageId)
      this.id = this.id || storageId
      const data = await axios.get('/api/Jobs/' + this.id)
      console.log(data.data)
      this.postForm = data.data
    },
    submitForm() {
      // this.postForm.dateOfRelease = parseInt(this.dateOfRelease / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          axios.put('/api/Jobs/' + this.id, {
            name: this.postForm.name,
            count: this.postForm.count,
            content: this.postForm.content,
            demand: this.postForm.demand,
            zone: this.postForm.zone,
            created: this.postForm.created
          }).then(response => {
            console.log(response)
            if (response.status >= 200 && response.status < 300) {
              this.$message({ showClose: true, message: '编辑成功！', type: 'success' })
              this.$router.push('/job')
            } else {
              this.$message({ showClose: true, message: response.status, type: 'warning' })
            }
          }).catch(() => {
            this.$message({ showClose: true, message: '编辑新闻失败！', type: 'error' })
          })
        } else {
          this.$message({ showClose: true, message: '您所填写的信息不完整，无法提交！', type: 'warning' })
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }
  .coverURL-uploader .coverURL:hover, .coverURL-uploader-icon:hover {
    border-color: #409EFF;
  }
  .coverURL-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    font-size: 28px;
    color: #8c939d;
    width: 225px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .coverURL-uploader .coverURL {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width: 225px;
    height: 200px;
    display: block;
  }
  .topCoverURL-uploader .topCoverURL:hover, .topCoverURL-uploader-icon:hover {
    border-color: #409EFF;
  }
  .topCoverURL-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    font-size: 28px;
    color: #8c939d;
    width: 640px;
    height: 400px;
    line-height: 400px;
    text-align: center;
  }
  .topCoverURL-uploader .topCoverURL {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width: 640px;
    height: 400px;
    display: block;
  }
  // .el-form-item__label {
  //   width: 100%;
  // }
  .coverDiv label, .topCoverDiv label {
    width: 100% !important;
  }
</style>

