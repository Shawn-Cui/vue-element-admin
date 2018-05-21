<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
    </div>
    <el-table :data="feedbackList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column width="250px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.created | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" :label="$t('table.content')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.content}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <v-paging :pag-msg="msg" @send="getPage" :msg="localPage"></v-paging>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import paging from '@/components/Paging/paging'

export default {
  name: 'Feedback',
  directives: {
    waves
  },
  data() {
    return {
      head: null,
      // 信息列表
      feedbackList: [],
      msg: {
        // 每页数据
        pagNumber: 10,
        // 总数据
        pagTotal: null
      },
      // 当前第几页
      localPage: 1,
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
      const res = await axios.get('/api/Feedbacks?filter=' + encodeURI(JSON.stringify(filter)))
      this.feedbackList = res.data
      const totalRes = await axios.get('/api/Feedbacks/count')
      this.listLoading = false
      this.msg.pagTotal = totalRes.data.count
    },
    getPage(localPage) {
      this.localPage = localPage
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

