<template>
  <div style="background-color: rgb(240, 240, 240)">
    <div>
      <el-breadcrumb separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }"
        >回到首页
        </el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/coming' }">即将上映</el-breadcrumb-item>
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
          <h2>即将上映</h2>
        </div>
        <div class="image">
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <img
                  style="width: 160px"
                  :src="require(`../assets/img/${item.name}.webp`)"
                  alt="轮播图"
                  :title="`${item.name}`"
              />
              <p>{{ item.name }}</p>

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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Coming",
  components: {},
  data() {
    return {
      list: [
        {name: "速度与激情10"},
        {name: "消失的她"},
        {name: "小美人鱼"},
        {name: "蜘蛛侠：纵横宇宙"},
        {name: "变形金刚：超能勇士崛起"},
        {name: "超能一家人"},

      ],
    };
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