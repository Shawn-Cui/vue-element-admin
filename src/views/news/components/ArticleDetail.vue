<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">

          <!-- <router-link style="margin-right:15px;" v-show='isEdit' :to="{ path:'create-form'}">
            <el-button type="info">创建form</el-button>
          </router-link>

          <el-dropdown trigger="click">
            <el-button plain>{{!postForm.comment_disabled?'评论已打开':'评论已关闭'}}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="no-padding" slot="dropdown">
              <el-dropdown-item>
                <el-radio-group style="padding: 10px;" v-model="postForm.comment_disabled">
                  <el-radio :label="true">关闭评论</el-radio>
                  <el-radio :label="false">打开评论</el-radio>
                </el-radio-group>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->

          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布
          </el-button>

        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
        </template>

      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                标题
              </MDinput>
              <span v-show="postForm.title.length>=26" class='title-prompt'>app可能会显示不全</span>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="作者:" class="postInfo-container-item" prop="author">
                    <el-input placeholder="请填写作者" style='min-width:150px;' v-model="postForm.author">
                    </el-input>
                    <!-- <multiselect v-model="postForm.author" :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                      deselectLabel="删除" track-by="key" :internalSearch="false" label="key">
                      <span slot='noResult'>无结果</span>
                    </multiselect> -->
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="8">
                  <el-tooltip class="item" effect="dark" content="将替换作者" placement="top">
                    <el-form-item label-width="50px" label="来源:" class="postInfo-container-item">
                      <el-input placeholder="将替换作者" style='min-width:150px;' v-model="postForm.origin">
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col> -->

                <el-col :span="8">
                  <el-form-item label-width="80px" label="语言:" class="postInfo-container-item" prop="cn">
                    <el-checkbox v-model="postForm.cn">中文</el-checkbox>
                    <el-checkbox v-model="postForm.en">英文</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="60px" label="摘要:" v-if="topCoverShow" prop="abstract">
          <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="postForm.abstract">
          </el-input>
          <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
        </el-form-item>

        <div class="editor-container">
          <tinymce :height=400 ref="editor" v-model="postForm.content"></tinymce>
        </div>

        <div class="coverDiv" style="margin-bottom: 20px;">
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="封面大图" prop="coverURL">
                <el-upload
                  class="coverURL-uploader"
                  action="https://example.com/"
                  :show-file-list="false"
                  :on-success="handleCoverSuccess"
                  :before-upload="beforeCoverUpload"
                  :http-request="uploadCover">
                  <img v-if="coverURL" :src="coverURL" class="coverURL">
                  <i v-else class="el-icon-plus coverURL-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="topCoverDiv" style="margin-bottom: 20px;">
          <el-row :gutter="60" v-if="topCoverShow">
            <el-col :span="24">
              <el-form-item label="置顶图" prop="topCoverURL">
                <el-upload
                  class="topCoverURL-uploader"
                  action="https://example.com/"
                  :show-file-list="false"
                  :on-success="handleTopCoverSuccess"
                  :before-upload="beforeTopCoverUpload"
                  :http-request="uploadTopCover">
                  <img v-if="topCoverURL" :src="topCoverURL" class="topCoverURL">
                  <i v-else class="el-icon-plus topCoverURL-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import upload from '@/utils/upload'
// import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
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
  components: { Tinymce, MDinput, Multiselect, Sticky },
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
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '正文不能为空', trigger: 'blur' },
          { min: 5, message: '正文应不少于五个字符', trigger: 'blur' }
        ],
        coverURL: [
          { required: true, message: '封面图不能为空', trigger: 'blur' }
        ],
        topCoverURL: [
          { required: true, message: '置顶图不能为空', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '摘要不能为空', trigger: 'blur' }
        ],
        cn: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.abstract ? this.postForm.abstract.length : 0
    }
  },
  created() {
    console.log(this.$route.params)
    this.id = this.$route.params.id
    this.tag = this.$route.params.tag
    if (this.id || this.id === 0) {
      localStorage.setItem('bordrin-newsId', this.id)
    }
    if (this.tag && this.tag === 'head') {
      this.topCoverShow = true
    }
    this.getNewsById()
    this.getNewsContent()
    // if (this.isEdit) {
    //   this.fetchData()
    // } else {
    //   this.postForm = Object.assign({}, defaultForm)
    // }
  },
  methods: {
    async getNewsById() {
      const storageId = await localStorage.getItem('bordrin-newsId')
      console.log(storageId)
      this.id = this.id || storageId
      const data = await axios.get('/api/News/' + this.id)
      console.log(data.data)
      this.postForm = data.data
      this.coverURL = data.data.coverURL
      this.topCoverURL = data.data.topCoverURL
      if (data.data.tag === 'head') {
        this.topCoverShow = true
      }
    },
    async getNewsContent() {
      const storageId = await localStorage.getItem('bordrin-newsId')
      console.log(storageId)
      this.id = this.id || storageId
      const data = await axios.get('/api/News/' + this.id + '/newsContents')
      console.log(data.data)
      // this.newsContent = data.data.content
      this.postForm = Object.assign({}, this.postForm, { content: data.data.content })
    },
    // fetchData() {
    //   fetchArticle().then(response => {
    //     this.postForm = response.data
    //   }).catch(err => {
    //     this.fetchSuccess = false
    //     console.log(err)
    //   })
    // },
    submitForm() {
      // this.postForm.dateOfRelease = parseInt(this.dateOfRelease / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          axios.put('/api/News/' + this.id, {
            title: this.postForm.title,
            coverURL: this.postForm.coverURL,
            topCoverURL: this.postForm.topCoverURL || '',
            tag: this.postForm.tag || '',
            abstract: this.postForm.abstract || '',
            author: this.postForm.author,
            cn: this.postForm.cn,
            en: this.postForm.en,
            dateOfRelease: this.postForm.dateOfRelease
          }).then(response => {
            console.log(response)
            if (response.status >= 200 && response.status < 300) {
              axios.put('/api/News/' + this.id + '/newsContents', {
                content: this.postForm.content
              }).then(response => {
                console.log(response)
                if (response.status >= 200 && response.status < 300) {
                  this.$message({ showClose: true, message: '编辑成功！', type: 'success' })
                  this.$router.push('/news')
                } else {
                  this.$message({ showClose: true, message: response.status, type: 'warning' })
                }
              }).catch(() => {
                this.$message({ showClose: true, message: '编辑正文失败！', type: 'error' })
              })
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
        // if (valid) {
        //   this.loading = true
        //   this.$notify({
        //     title: '成功',
        //     message: '发布文章成功',
        //     type: 'success',
        //     duration: 2000
        //   })
        //   this.loading = false
        // } else {
        //   console.log('error submit!!')
        //   return false
        // }
      })
    },
    // getRemoteUserList(query) {
    //   userSearch(query).then(response => {
    //     if (!response.data.items) return
    //     console.log(response)
    //     this.userLIstOptions = response.data.items.map(v => ({
    //       key: v.name
    //     }))
    //   })
    // },
    handleCoverSuccess() {
    },
    beforeCoverUpload() {
    },
    // 上传封面大图
    uploadCover(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 580 && this.height === 515) {
            upload.uploadHandle(file, function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.coverURL = url
              me.postForm.coverURL = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为580*515！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    handleTopCoverSuccess() {
    },
    beforeTopCoverUpload() {
    },
    // 上传置顶大图
    uploadTopCover(file) {
      const me = this
      const img = new Image()
      const url = URL.createObjectURL(file.file)
      img.src = url
      img.onload = function() {
        console.log(this, this.width, this.height)
        if (this.width === 1420 && this.height === 890) {
          upload.uploadHandle(file, function(err, url) {
            console.log(err, url)
            if (err) {
              console.log(err, '上传失败！')
            }
            me.topCoverURL = url
            me.postForm.topCoverURL = url
          })
        } else {
          me.$message({ showClose: true, message: '图片尺寸必须为1420*890！', type: 'warning' })
        }
      }
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
      right: -10px;
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

