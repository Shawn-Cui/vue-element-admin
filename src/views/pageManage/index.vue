<template>
  <div class="pageManage-container">
    <h2>首页</h2>
    <div class="home" style="margin-bottom: 20px;">
      <el-row :gutter="60">
        <el-col :span="12">
          <label for="home1">首页1</label>
          <el-upload
            class="home-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :on-success="handleHomeSuccess"
            :before-upload="beforeHomeUpload"
            :http-request="uploadHome1">
            <img :src="home1" class="homeImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="home1En">首页1英文</label>
          <el-upload
            class="home-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :on-success="handleHomeSuccess"
            :before-upload="beforeHomeUpload"
            :http-request="uploadHome1En">
            <img :src="home1En" class="homeImg">
          </el-upload>
        </el-col>
      </el-row>
    </div>

    <div class="home" style="margin-bottom: 20px;">
      <el-row :gutter="60">
        <el-col :span="12">
          <label for="home2">首页2</label>
          <el-upload
            class="home-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :on-success="handleHomeSuccess"
            :before-upload="beforeHomeUpload"
            :http-request="uploadHome2">
            <img :src="home2" class="homeImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="home2En">首页2英文</label>
          <el-upload
            class="home-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :on-success="handleHomeSuccess"
            :before-upload="beforeHomeUpload"
            :http-request="uploadHome2En">
            <img :src="home2En" class="homeImg">
          </el-upload>
        </el-col>
      </el-row>

      <el-row style="margin: 30px 50px">
        <el-form :inline="true" :model="homeForm" class="demo-form-inline">
          <el-form-item label="中文">
            <el-input v-model="homeForm.nameCN" placeholder="中文"></el-input>
          </el-form-item>
          <el-form-item label="英文">
            <el-input v-model="homeForm.nameEN" placeholder="英文"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveHome">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="newsForm" class="demo-form-inline">
          <el-form-item label="中文">
            <el-input v-model="newsForm.nameCN" placeholder="中文"></el-input>
          </el-form-item>
          <el-form-item label="英文">
            <el-input v-model="newsForm.nameEN" placeholder="英文"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveNews">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="aboutForm" class="demo-form-inline">
          <el-form-item label="中文">
            <el-input v-model="aboutForm.nameCN" placeholder="中文"></el-input>
          </el-form-item>
          <el-form-item label="英文">
            <el-input v-model="aboutForm.nameEN" placeholder="英文"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveAbout">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="joinForm" class="demo-form-inline">
          <el-form-item label="中文">
            <el-input v-model="joinForm.nameCN" placeholder="中文"></el-input>
          </el-form-item>
          <el-form-item label="英文">
            <el-input v-model="joinForm.nameEN" placeholder="英文"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveJoin">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="wechatForm" class="demo-form-inline">
          <el-form-item label="中文">
            <el-input v-model="wechatForm.nameCN" placeholder="中文"></el-input>
          </el-form-item>
          <el-form-item label="英文">
            <el-input v-model="wechatForm.nameEN" placeholder="英文"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveWechat">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="contactForm" class="demo-form-inline">
          <el-form-item label="中文">
            <el-input v-model="contactForm.nameCN" placeholder="中文"></el-input>
          </el-form-item>
          <el-form-item label="英文">
            <el-input v-model="contactForm.nameEN" placeholder="英文"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveContact">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="mapForm" class="demo-form-inline">
          <el-form-item label="中文">
            <el-input v-model="mapForm.nameCN" placeholder="中文"></el-input>
          </el-form-item>
          <el-form-item label="英文">
            <el-input v-model="mapForm.nameEN" placeholder="英文"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveMap">保存</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>

    <h2>新闻中心</h2>
    <div class="news" style="margin-bottom: 20px;">
      <el-row :gutter="60">
        <el-col :span="12">
          <label for="news">新闻</label>
          <el-upload
            class="news-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadNews">
            <img :src="news" class="newsImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="newsEn">新闻英文</label>
          <el-upload
            class="news-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadNewsEn">
            <img :src="newsEn" class="newsImg">
          </el-upload>
        </el-col>
      </el-row>
    </div>

    <h2>关于我们</h2>
    <div class="about" style="margin-bottom: 20px;">
      <el-row :gutter="60">
        <el-col :span="12">
          <label for="about">关于我们</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout">
            <img :src="about" class="aboutImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="aboutEn">关于我们英文</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAboutEn">
            <img :src="aboutEn" class="aboutImg">
          </el-upload>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="12">
          <label for="about1">一号图</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout1">
            <img :src="about1" class="aboutImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="about1En">一号图英文</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout1En">
            <img :src="about1En" class="aboutImg">
          </el-upload>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="12">
          <label for="about2">二号图</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout2">
            <img :src="about2" class="aboutImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="about2En">二号图英文</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout2En">
            <img :src="about2En" class="aboutImg">
          </el-upload>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="12">
          <label for="about3">三号图</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout3">
            <img :src="about3" class="aboutImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="about3En">三号图英文</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout3En">
            <img :src="about3En" class="aboutImg">
          </el-upload>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="12">
          <label for="about4">四号图</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout4">
            <img :src="about4" class="aboutImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="about4En">四号图英文</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout4En">
            <img :src="about4En" class="aboutImg">
          </el-upload>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="12">
          <label for="about5">五号图</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout5">
            <img :src="about5" class="aboutImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="about5En">五号图英文</label>
          <el-upload
            class="about-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadAbout5En">
            <img :src="about5En" class="aboutImg">
          </el-upload>
        </el-col>
      </el-row>
    </div>

    <h2>加入我们</h2>
    <div class="join" style="margin-bottom: 20px;">
      <el-row :gutter="60">
        <el-col :span="12">
          <label for="join">加入我们</label>
          <el-upload
            class="join-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadJoin">
            <img :src="join" class="joinImg">
          </el-upload>
        </el-col>

        <el-col :span="12">
          <label for="joinEn">加入我们英文</label>
          <el-upload
            class="join-uploader"
            action="https://example.com/"
            :show-file-list="false"
            :http-request="uploadJoinEn">
            <img :src="joinEn" class="joinImg">
          </el-upload>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import upload from '@/utils/upload2'
import axios from 'axios'

export default {
  name: 'PageManager',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      home1: 'http://bordrin-1252042681.cossh.myqcloud.com/home1.png',
      home1En: 'http://bordrin-1252042681.cossh.myqcloud.com/home1En.png',
      home2: 'http://bordrin-1252042681.cossh.myqcloud.com/home2.png',
      home2En: 'http://bordrin-1252042681.cossh.myqcloud.com/home2En.png',
      news: 'http://bordrin-1252042681.cossh.myqcloud.com/news.png',
      newsEn: 'http://bordrin-1252042681.cossh.myqcloud.com/newsEn.png',
      about: 'http://bordrin-1252042681.cossh.myqcloud.com/about-us.png',
      aboutEn: 'http://bordrin-1252042681.cossh.myqcloud.com/about-usEn.png',
      about1: 'http://bordrin-1252042681.cossh.myqcloud.com/about1.png',
      about1En: 'http://bordrin-1252042681.cossh.myqcloud.com/about1En.png',
      about2: 'http://bordrin-1252042681.cossh.myqcloud.com/about2.png',
      about2En: 'http://bordrin-1252042681.cossh.myqcloud.com/about2En.png',
      about3: 'http://bordrin-1252042681.cossh.myqcloud.com/about3.png',
      about3En: 'http://bordrin-1252042681.cossh.myqcloud.com/about3En.png',
      about4: 'http://bordrin-1252042681.cossh.myqcloud.com/about4.png',
      about4En: 'http://bordrin-1252042681.cossh.myqcloud.com/about4En.png',
      about5: 'http://bordrin-1252042681.cossh.myqcloud.com/about5.png',
      about5En: 'http://bordrin-1252042681.cossh.myqcloud.com/about5En.png',
      join: 'http://bordrin-1252042681.cossh.myqcloud.com/join-us.png',
      joinEn: 'http://bordrin-1252042681.cossh.myqcloud.com/join-usEn.png',
      loading: false,
      homeForm: {
        nameEN: '',
        nameCN: ''
      },
      newsForm: {
        nameEN: '',
        nameCN: ''
      },
      aboutForm: {
        nameEN: '',
        nameCN: ''
      },
      joinForm: {
        nameEN: '',
        nameCN: ''
      },
      wechatForm: {
        nameEN: '',
        nameCN: ''
      },
      contactForm: {
        nameEN: '',
        nameCN: ''
      },
      mapForm: {
        nameEN: '',
        nameCN: ''
      }
    }
  },
  created() {
    this.getHome()
  },
  methods: {
    getHome() {
      axios.get('/api/Menus').then(response => {
        this.homeForm = response.data[0]
        this.newsForm = response.data[1]
        this.aboutForm = response.data[2]
        this.joinForm = response.data[3]
        this.wechatForm = response.data[4]
        this.contactForm = response.data[5]
        this.mapForm = response.data[6]
      })
    },
    saveHome() {
      console.log(this.homeForm)
      axios.put('/api/Menus/' + this.homeForm.id, {
        nameCN: this.homeForm.nameCN,
        nameEN: this.homeForm.nameEN,
        index: this.homeForm.index
      }).then(response => {
        this.$message({ showClose: true, message: '编辑成功！', type: 'success' })
      }).catch(() => {
        this.$message({ showClose: true, message: '编辑失败！', type: 'error' })
      })
    },
    saveNews() {
      axios.put('/api/Menus/' + this.newsForm.id, {
        nameCN: this.newsForm.nameCN,
        nameEN: this.newsForm.nameEN,
        index: this.newsForm.index
      }).then(response => {
        this.$message({ showClose: true, message: '编辑成功！', type: 'success' })
      }).catch(() => {
        this.$message({ showClose: true, message: '编辑失败！', type: 'error' })
      })
    },
    saveAbout() {
      axios.put('/api/Menus/' + this.aboutForm.id, {
        nameCN: this.aboutForm.nameCN,
        nameEN: this.aboutForm.nameEN,
        index: this.aboutForm.index
      }).then(response => {
        this.$message({ showClose: true, message: '编辑成功！', type: 'success' })
      }).catch(() => {
        this.$message({ showClose: true, message: '编辑失败！', type: 'error' })
      })
    },
    saveJoin() {
      axios.put('/api/Menus/' + this.joinForm.id, {
        nameCN: this.joinForm.nameCN,
        nameEN: this.joinForm.nameEN,
        index: this.joinForm.index
      }).then(response => {
        this.$message({ showClose: true, message: '编辑成功！', type: 'success' })
      }).catch(() => {
        this.$message({ showClose: true, message: '编辑失败！', type: 'error' })
      })
    },
    saveWechat() {
      axios.put('/api/Menus/' + this.wechatForm.id, {
        nameCN: this.wechatForm.nameCN,
        nameEN: this.wechatForm.nameEN,
        index: this.wechatForm.index
      }).then(response => {
        this.$message({ showClose: true, message: '编辑成功！', type: 'success' })
      }).catch(() => {
        this.$message({ showClose: true, message: '编辑失败！', type: 'error' })
      })
    },
    saveContact() {
      axios.put('/api/Menus/' + this.contactForm.id, {
        nameCN: this.contactForm.nameCN,
        nameEN: this.contactForm.nameEN,
        index: this.contactForm.index
      }).then(response => {
        this.$message({ showClose: true, message: '编辑成功！', type: 'success' })
      }).catch(() => {
        this.$message({ showClose: true, message: '编辑失败！', type: 'error' })
      })
    },
    saveMap() {
      axios.put('/api/Menus/' + this.mapForm.id, {
        nameCN: this.mapForm.nameCN,
        nameEN: this.mapForm.nameEN,
        index: this.mapForm.index
      }).then(response => {
        this.$message({ showClose: true, message: '编辑成功！', type: 'success' })
      }).catch(() => {
        this.$message({ showClose: true, message: '编辑失败！', type: 'error' })
      })
    },
    handleHomeSuccess() {
    },
    beforeHomeUpload() {
    },
    uploadHome1(file) {
      this.uploadHome(file, 'home1')
    },
    uploadHome1En(file) {
      this.uploadHome(file, 'home1En')
    },
    uploadHome2(file) {
      this.uploadHome(file, 'home2')
    },
    uploadHome2En(file) {
      this.uploadHome(file, 'home2En')
    },
    uploadHome(file, fileName) {
      console.log(file, fileName)
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (fileName) {
            upload.uploadHandle(file, fileName + '.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me[fileName] = url
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
    // 上传新闻图片
    uploadNews(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1440 && this.height === 390) {
            upload.uploadHandle(file, 'news.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.news = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1440*390！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    // 上传新闻图片英文版
    uploadNewsEn(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1440 && this.height === 390) {
            upload.uploadHandle(file, 'newsEn.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.newsEn = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1440*390！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    // 上传关于我们图片
    uploadAbout(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1709 && this.height === 390) {
            upload.uploadHandle(file, 'about-us.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1709*390！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    // 上传关于我们英文版
    uploadAboutEn(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1709 && this.height === 390) {
            upload.uploadHandle(file, 'about-usEn.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.aboutEn = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1709*390！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout1(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about1.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about1 = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout1En(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about1En.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about1En = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout2(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about2.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about2 = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout2En(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about2En.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about2En = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout3(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about3.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about3 = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout3En(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about3En.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about3En = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout4(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about4.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about4 = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout4En(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about4En.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about4En = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout5(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about5.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about5 = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    uploadAbout5En(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1606 && this.height === 572) {
            upload.uploadHandle(file, 'about5En.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.about5En = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1606*572！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    // 上传加入我们图片
    uploadJoin(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1440 && this.height === 390) {
            upload.uploadHandle(file, 'join-us.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.join = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1440*390！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
    },
    // 上传加入我们英文版
    uploadJoinEn(file) {
      const me = this
      const reader = new FileReader()
      reader.onload = function(evt) {
        const image = new Image()
        image.onload = function() {
          if (this.width === 1440 && this.height === 390) {
            upload.uploadHandle(file, 'join-usEn.png', function(err, url) {
              console.log(err, url)
              if (err) {
                console.log(err, '上传失败！')
              }
              me.joinEn = url
            })
          } else {
            me.$message({ showClose: true, message: '图片尺寸必须为1440*390！', type: 'warning' })
          }
        }
        image.src = evt.target.result
      }
      console.log(file)
      reader.readAsDataURL(file.file)
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
  .pageManage-container {
    position: relative;
    padding: 20px;
  }
  .home-uploader .homeImg:hover, .home-uploader-icon:hover {
    border-color: #409EFF;
  }
  .home-uploader .homeImg {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    height: auto;
    display: block;
  }

  .news-uploader .newsImg:hover, .news-uploader-icon:hover {
    border-color: #409EFF;
  }
  .news-uploader .newsImg {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    height: auto;
    display: block;
  }

  .about-uploader .aboutImg:hover, .about-uploader-icon:hover {
    border-color: #409EFF;
  }
  .about-uploader .aboutImg {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    height: auto;
    display: block;
  }

  .join-uploader .joinImg:hover, .join-uploader-icon:hover {
    border-color: #409EFF;
  }
  .join-uploader .joinImg {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    height: auto;
    display: block;
  }
  // .el-form-item__label {
  //   width: 100%;
  // }
  label {
    margin-bottom: 10px;
  }
</style>

