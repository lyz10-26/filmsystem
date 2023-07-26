<template>
  <div>
    <h1>基于电影协同过滤算法推荐结果如下</h1>
    <div >
      <el-input v-model="input" style="width: 200px ;margin-left: 500px"  placeholder="请输入ID,根据id进行推荐"></el-input>
      <el-button type="primary"   @click="submit">点击推荐</el-button>
    </div>

    <div style="margin-top: 20px; margin-left: 20px">
      <el-table
          :data="tableData"
          style="width: 900px"
          stripe>
        <el-table-column
            prop="id"
            align="center"
            label="电影id"
            width="70">
        </el-table-column>
        <el-table-column
            prop="name"
            label="名称"
            align="center"
            width="200">
        </el-table-column>
        <el-table-column
            prop="date"
            align="center"
            label="上映日期"
            width="150">
        </el-table-column>
        <el-table-column
            prop="link"
            align="center"
            label="地址链接"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
import request from "@/utils/request";

export default {
  name: "UserRec",
  data() {
    return {
      tableData: [],
      input: '',
    }
  },
  methods: {
    submit() {
      request.get("http://localhost:9090/recommend/film/"+this.input).then((res) => {
        console.log(res);
        if (res.code === "200") {
          this.tableData=res.data
          this.$message({
            type: "success",
            message: res.msg,
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
      })
    },

  }
}
</script>

<style scoped>

h1 {
  text-align: center;
  margin-top: 20px;;
}

</style>