<template>
  <el-pagination v-show="showPage"
      @current-change="changePage"
      :current-page.sync="currentPage"
      :page-size="pagMsg.pagNumber"
      layout="total,prev, pager, next, jumper"
      :total=pagMsg.pagTotal>
  </el-pagination>
</template>
<script>
  export default {
    data: function() {
      return {
        showPage: true,
        currentPage: 1, // 前往第几页
        loadNumber: this.pagMsg.pagNumber, // 每页数据
        loadTotal: this.pagMsg.pagTotal // 总数据
      }
    },
    props: ['pagMsg'], // 接收父组件传值
    methods: {
      changePage: function(val) {
        this.$emit('send', val)
      }
    },
    updated: function() {
      this.loadNumber = this.pagMsg.pagNumber
      this.loadTotal = this.pagMsg.pagTotal
      this.showPage = this.loadTotal > this.loadNumber
    }
  }

</script>

<style>
  .el-pagination button, .el-pagination span:not([class*=suffix]) {
    color: #5182E4;
  }

  .el-pagination {
    margin: 15px 0;
  }
</style>