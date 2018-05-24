<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.resume')" v-model="search">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :data="resumeList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <!-- <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="350px" align="center" :label="$t('table.downloadURL')">
        <template slot-scope="scope">
          <span>{{scope.row.downloadUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column width="350px" align="center" :label="$t('table.tag')">
        <template slot-scope="scope">
          <span>{{scope.row.tag | tagFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" min-width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini">{{$t('table.edit')}}
          </el-button> -->
          <el-button size="mini" type="success" :loading="downloadLoading" @click="handleDownload(scope.row)">{{$t('table.download')}}
          </el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('table.delete')}}
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <v-paging :pag-msg="msg" @send="getPage" :msg="localPage"></v-paging>
    </div>
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import axios from 'axios'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import paging from '@/components/Paging/paging'

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  filters: {
    tagFilter: function(value) {
      if (value === '0') {
        return '未下载'
      } else {
        return '已下载'
      }
    }
  },
  data() {
    return {
      // 搜索关键字
      search: '',
      head: null,
      // 招聘列表
      resumeList: [],
      msg: {
        // 每页数据
        pagNumber: 10,
        // 总数据
        pagTotal: null
      },
      // 当前第几页
      localPage: 1,
      addBox: false,
      // 新增招聘信息
      job: {
        name: ''
      },
      // 新建招聘的字段限制规则
      createJobRules: {
        name: [
          { required: true, message: '岗位名称不能为空', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          // {pattern: /^[\u4E00-\u9FA5]+$/, message: '请填写中文'}
        ]
      },
      listLoading: true,
      downloadLoading: false
    }
  },
  components: {
    'v-paging': paging
  },
  watch: {
    localPage: function(newValue, oldValue) {
      this.localPage = newValue
      this.getList()
    }
  },
  created() {
    console.log(this.$route.params)
    this.id = this.$route.params.id
    if (this.id || this.id === 0) {
      localStorage.setItem('bordrin-jobId', this.id)
    }
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const filter = {
        skip: (this.localPage - 1) * this.msg.pagNumber,
        limit: this.msg.pagNumber,
        where: {
          jobId: this.id
        }
      }
      const res = await axios.get('/api/Resumes?filter=' + encodeURI(JSON.stringify(filter)))
      this.resumeList = res.data
      const totalRes = await axios.get('/api/Resumes/count')
      this.listLoading = false
      this.msg.pagTotal = totalRes.data.count
    },
    getPage(localPage) {
      this.localPage = localPage
    },
    handleFilter() {
      const filter = {
        where: {
          downloadUrl: {
            like: '%' + this.search + '%'
          }
        }
      }
      this.searchResumes(filter)
    },
    async searchResumes(search) {
      const filter = {
        skip: (this.localPage - 1) * this.msg.pagNumber,
        limit: this.msg.pagNumber
      }
      filter.where = search.where

      const res = await axios.get('/api/Resumes?filter=' + encodeURI(JSON.stringify(filter)))
      console.log(res)
      this.resumeList = res.data
      const totalRes = await axios.get('/api/Resumes/count', {
        params: {
          title: search
        }
      })
      this.msg.pagTotal = totalRes.count
    },
    cancleAdd(formName) {
      this.addBox = false
      this.$refs[formName].resetFields()
    },
    // 新增职位
    subBtn: async function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/Resumes', {
            name: this.job.name,
            created: new Date().getTime().toString()
          }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
              this.$message({ showClose: true, message: '新增职位成功！', type: 'success' })
              this.$router.replace({
                name: 'job.edit',
                params: {
                  id: response.data.id
                }
              })
            } else {
              this.$message({ showClose: true, message: '新增职位失败！', type: 'error' })
            }
          })
        } else {
          this.$message({ showClose: true, message: '您所填写的信息不完整，无法提交', type: 'warning' })
          return false
        }
      })
    },
    // 删除职位
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该职位，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const delId = row.id
        axios.delete('/api/Resumes/' + delId).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            this.msg.pagTotal -= 1
            this.getList()
            this.$message({ showClose: true, message: '删除职位成功！', type: 'success' })
          } else {
            this.$message({ showClose: true, message: '删除职位失败！', type: 'error' })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    handleUpdate(row) {
      this.$router.replace({
        name: 'job.edit',
        params: {
          id: row.id
        }
      })
    },
    handleDownload(row) {
      this.downloadLoading = true
      axios.put('/api/Resumes/' + row.id, {
        downloadUrl: row.downloadUrl,
        tag: '1',
        jobId: row.jobId
      }).then((response) => {
        window.open(row.downloadUrl)
        this.downloadLoading = false
        this.getList()
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style>
  span.el-radio__label {
    display: none;
  }
</style>