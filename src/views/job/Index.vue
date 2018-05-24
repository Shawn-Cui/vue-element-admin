<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.job')" v-model="search">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="addBox = true" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.download')}}</el-button> -->
    </div>

    <el-table :data="jobList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column width="250px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.created | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="250px" :label="$t('table.job')">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="250px" align="center" :label="$t('table.recruitNumber')">
        <template slot-scope="scope">
          <span>{{scope.row.count}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">
        <template slot-scope="scope">
          <span style='color:red;'>{{scope.row.reviewer}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" :label="$t('table.readings')" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews">{{scope.row.pageviews}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}
          </el-button>
          <el-button size="mini" type="success" @click="handleResume(scope.row)">{{$t('table.resume')}}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <v-paging :pag-msg="msg" @send="getPage" :msg="localPage"></v-paging>
      <!-- <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination> -->
    </div>

    <!--新增新闻-->
    <el-dialog title="新增招聘" :visible.sync="addBox" width="50%" class="limit-table" id="addForm" :close-on-click-modal="false">
      <el-form ref="job" :model="job" size="medium" label-position="top" :rules="createJobRules">
        <el-form-item label="招聘岗位" prop="name">
          <el-input class="name" auto-complete="off" v-model="job.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleAdd('job')">取 消</el-button>
        <el-button type="primary" @click="subBtn('job')">提 交</el-button>
      </span>
    </el-dialog>

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
  data() {
    return {
      // 搜索关键字
      search: '',
      head: null,
      // 招聘列表
      jobList: [],
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
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const filter = {
        skip: (this.localPage - 1) * this.msg.pagNumber,
        limit: this.msg.pagNumber,
        order: 'created DESC'
      }
      const res = await axios.get('/api/Jobs?filter=' + encodeURI(JSON.stringify(filter)))
      this.jobList = res.data
      const totalRes = await axios.get('/api/Jobs/count')
      this.listLoading = false
      this.msg.pagTotal = totalRes.data.count
    },
    getPage(localPage) {
      this.localPage = localPage
    },
    handleFilter() {
      const filter = {
        where: {
          name: {
            like: this.search
          }
        }
      }
      this.searchJobs(filter)
    },
    async searchJobs(search) {
      const filter = {
        skip: (this.localPage - 1) * this.msg.pagNumber,
        limit: this.msg.pagNumber,
        order: 'created DESC'
      }
      filter.where = search.where

      const res = await axios.get('/api/Jobs?filter=' + encodeURI(JSON.stringify(filter)))
      console.log(res)
      this.jobList = res.data
      const totalRes = await axios.get('/api/Jobs/count', {
        params: {
          order: 'dateOfRelease DESC',
          name: search
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
          axios.post('/api/Jobs', {
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
    handleResume(row) {
      this.$router.replace({
        name: 'job.resume',
        params: {
          id: row.id
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
        axios.delete('/api/Jobs/' + delId).then((response) => {
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
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

