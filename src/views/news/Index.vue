<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="search">
      </el-input>
      <!-- <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select> -->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="addBox = true" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      <!-- <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox> -->
    </div>

    <el-table :data="newsList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <!-- <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" :label="$t('table.head')">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="head" :label="scope.row.id" @change="changeHead(scope.row)"></el-radio>
          </template>
        </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.dateOfRelease | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" :label="$t('table.title')">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
          <!-- <el-tag>{{scope.row.type | typeFilter}}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.author')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">
        <template slot-scope="scope">
          <span style='color:red;'>{{scope.row.reviewer}}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="150px" align="center" :label="$t('table.cover')">
        <template slot-scope="scope">
          <img :src="scope.row.coverURL" style="width: 112px; height: 100px">
          <!-- <svg-icon v-for="n in +scope.row.coverURL" icon-class="star" class="meta-item__icon" :key="n"></svg-icon> -->
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" :label="$t('table.readings')" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews">{{scope.row.pageviews}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column class-name="status-col" :label="$t('table.status')" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}
          </el-button>
          <el-button size="mini" type="success">{{$t('table.view')}}
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
    <el-dialog title="新增新闻" :visible.sync="addBox" width="50%" class="limit-table" id="addForm" :close-on-click-modal="false">
      <el-form ref="news" :model="news" size="medium" label-position="top" :rules="createNewsRules">
        <el-form-item label="新闻标题" prop="title">
          <el-input class="title" auto-complete="off" v-model="news.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleAdd('news')">取 消</el-button>
        <el-button type="primary" @click="subBtn('news')">提 交</el-button>
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

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

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
      // 新闻列表
      newsList: [],
      msg: {
        // 每页数据
        pagNumber: 10,
        // 总数据
        pagTotal: null
      },
      // 当前第几页
      localPage: 1,
      addBox: false,
      // 新增新闻信息
      news: {
        title: ''
      },
      // 新建新闻的字段限制规则
      createNewsRules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
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
        order: 'dateOfRelease DESC'
      }
      const res = await axios.get('/api/News?filter=' + encodeURI(JSON.stringify(filter)), {
        params: {
          skip: this.localPage * this.msg.pagNumber,
          limit: this.msg.pagNumber,
          order: 'dateOfRelease DESC'
        }
      })
      const headRes = await axios.get('/api/News?filter[where][tag]=head')
      if (headRes.data && headRes.data.length > 0) {
        this.head = headRes.data[0].id
      }
      this.newsList = res.data
      const totalRes = await axios.get('/api/News/count')
      this.listLoading = false
      this.msg.pagTotal = totalRes.data.count
    },
    getPage(localPage) {
      this.localPage = localPage
    },
    handleFilter() {
      const filter = {
        where: {
          title: {
            like: '%' + this.search + '%'
          }
        }
      }
      this.searchNews(filter)
    },
    async searchNews(search) {
      const filter = {
        skip: (this.localPage - 1) * this.msg.pagNumber,
        limit: this.msg.pagNumber,
        order: 'dateOfRelease DESC'
      }
      filter.where = search.where

      const res = await axios.get('/api/News?filter=' + encodeURI(JSON.stringify(filter)), {
        params: {
          skip: this.localPage * this.msg.pagNumber,
          limit: this.msg.pagNumber,
          order: 'dateOfRelease DESC',
          title: search
        }
      })
      console.log(res)
      this.newsList = res.data
      const totalRes = await axios.get('/api/News/count', {
        params: {
          order: 'dateOfRelease DESC',
          title: search
        }
      })
      this.msg.pagTotal = totalRes.count
    },
    cancleAdd(formName) {
      this.addBox = false
      this.$refs[formName].resetFields()
    },
    // 新增新闻
    subBtn: async function(formName) {
      // let formData = new FormData()
      // formData.append("title", this.news.title)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/News', {
            title: this.news.title,
            dateOfRelease: new Date().getTime().toString()
          }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
              const news = response.data
              axios.post('/api/News/' + news.id + '/newsContents', {}).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                  this.msg.pagTotal += 1
                  this.$refs[formName].resetFields()
                  this.addBox = false
                  this.getList()
                  this.$message({ showClose: true, message: '新增新闻成功！', type: 'success' })
                  this.$router.replace({
                    name: 'news.edit',
                    params: {
                      id: news.id
                    }
                  })
                } else {
                  this.$message({ showClose: true, message: '新增新闻失败！', type: 'error' })
                }
              })
            } else {
              this.$message({ showClose: true, message: '新增新闻失败！', type: 'error' })
            }
          })
        } else {
          this.$message({ showClose: true, message: '您所填写的信息不完整，无法提交', type: 'warning' })
          return false
        }
      })
    },
    changeHead(news) {
      this.$confirm('将此新闻设为置顶新闻？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get('/api/News?filter[where][tag]=head').then((response) => {
          if (response.status >= 200 && response.status < 300) {
            if (!response.data || response.data.length === 0) {
              axios.put('/api/News/' + news.id, {
                title: news.title || '',
                dateOfRelease: news.dateOfRelease || '',
                author: news.author || '',
                coverURL: news.coverURL || '',
                topCoverURL: news.topCoverURL || '',
                tag: 'head'
              }).then((response) => {
                this.$router.push({
                  name: 'news.edit',
                  params: {
                    id: news.id,
                    tag: 'head'
                  }
                })
              })
            } else {
              const newData = response.data[0]
              newData.tag = ''
              axios.put('/api/News/' + response.data[0].id, newData).then((response) => {
                axios.put('/api/News/' + news.id, {
                  title: news.title || '',
                  dateOfRelease: news.dateOfRelease || '',
                  author: news.author || '',
                  coverURL: news.coverURL || '',
                  topCoverURL: news.topCoverURL || '',
                  tag: 'head'
                }).then((response) => {
                  this.$router.push({
                    name: 'news.edit',
                    params: {
                      id: news.id,
                      tag: 'head'
                    }
                  })
                })
              })
            }
          }
        })
      })
    },
    // 删除新闻
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该新闻，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const delId = row.id
        axios.delete('/api/News/' + delId + '/newsContents').then((response) => {
          if (response.status >= 200 && response.status < 300) {
            axios.delete('/api/News/' + delId).then((response) => {
              if (response.status >= 200 && response.status < 300) {
                this.msg.pagTotal -= 1
                this.getList()
                this.$message({ showClose: true, message: '删除新闻成功！', type: 'success' })
              } else {
                this.$message({ showClose: true, message: '删除新闻失败！', type: 'error' })
              }
            })
          } else {
            this.$message({ showClose: true, message: '删除新闻失败！', type: 'error' })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    handleUpdate(row) {
      this.$router.replace({
        name: 'news.edit',
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

