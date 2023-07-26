<template>
  <div style="background-color: rgb(240, 240, 240)">
    <div>
      <el-breadcrumb separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }"
        >回到首页
        </el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/air' }">正在热映</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="display: flex">
      <div>
        <div
            style="
            margin-left: 40px;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 160%;
            color: rgb(234, 78, 75);
          "
        >
          <h2>正在热映</h2>
        </div>
        <div class="image">
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <img
                  style="width: 160px"
                  :src="require(`../assets/img/${item.name}.jpg`)"
                  alt="轮播图"
                  :title="`${item.name}`"
              />
              <p>{{ item.name }}</p>
              <div>
                <el-button round type="danger" @click="pushShop(item)">购票</el-button>
                <el-popover placement="top" trigger="hover" :width="166">
                  <el-rate
                      show-score
                      text-color="#ff9900"
                      allow-half
                      @change="pop"
                  >
                  </el-rate>
                  <template #reference>
                    <el-button round type="success">评分</el-button>
                  </template>
                </el-popover>
              </div>
            </li>
            <li class="bt_classify_name_empty" style="visibility: hidden"></li>
          </ul>
        </div>
      </div>
      <div
          style="
          width: 600px;
          margin-top: 20px;
          margin-bottom: 10px;
          font-size: 160%;
          color: rgb(234, 78, 75);
        "
      >
        <h2>今日票房</h2>
        <div style="display: flex; margin-top: 25px;">
          <img src="../assets/img/流浪地球2.jpg" alt="" style="width: 90px"/>
          <div>
            <p
                style="
                font-size: 80%;
                color: black;
                margin-left: 15px;
                margin-top: 20px;
                
              "
            >
              流浪地球2
            </p>
            <p style="font-size: 60%; margin-left: 15px; margin-top: 40px">
              43亿5892万
            </p>
          </div>
        </div>
        <div style="margin-top: 30px;">
          <span style="font-style: italic">2</span>
          <span
              style="font-size:80%; color:black; margin-left:15px; "
          >长津湖</span
          >
          <span style="font-size: 60%; margin-left: 45px">6235.20万</span>
        </div>
        <div style="margin-top: 30px">
          <span style="font-style: italic">3</span>
          <span
              style="font-size:80%; color:black; margin-left:15px; "
          >战狼2</span
          >
          <span style="font-size: 60%; margin-left: 53px">3798.42万</span>
        </div>
        <div style="margin-top: 30px">
          <span style="color:rgb(153,153,153); font-style: italic">4</span>
          <span
              style="font-size:80%; color:black; margin-left:15px; "
          >小王子</span
          >
          <span style="font-size: 60%; margin-left: 45px">1941.11万</span>
        </div>
        <div style="margin-top: 30px">
          <span style="color:rgb(153,153,153); font-style: italic">5</span>
          <span
              style="font-size:80%; color:black; margin-left:15px; "
          >绿皮书</span
          >
          <span style="font-size: 60%; margin-left: 45px">1175.60万</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Air",
  components: {},
  data() {
    return {
      list: [

        {name: "流浪地球2"},
        {name: "铃芽之旅"},
        {name: "银河护卫队3"},
        {name: "长空之王"},
        {name: "人生路不熟"},
        {name: "你的名字。"},
      ],
    };
  },
  methods: {
    pop() {
      ElMessage({
        showClose: true,
        message: "评价成功！感谢您的参与！",
        type: "success",
      });
    },
    pushShop(item){
      this.$router.push({
        name:'Shop',
        params:{
          name:item.name
        }
      })
    }
  },
};
</script>

<style scoped>
ul {
  margin: 0;
  list-style: none;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

li {
  flex: 0 0 33%;
  height: 6rem;
  display: inline-block;
  /* background: rgb(240, 240, 240); */
  margin-bottom: 15rem;
  text-align: center;
}

li:hover p {
  opacity: 0.7;
  color: red;
}

.bt_classify_name_empty {
  width: 0;
  height: 0;
}


</style>