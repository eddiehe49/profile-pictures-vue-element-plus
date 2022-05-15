<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png" style="padding-top: 3%" />
    <!-- <h1>This is an about page</h1> -->
    <div class="hello">
      <el-button type="primary" style="margin: 2% 0 0% 0" @click="showTips">
        Tips
      </el-button>
      <h3>Powered by</h3>
      <ul>
        <li>
          <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue</a>
        </li>
        <li>
          <a href="https://element-plus.org/" target="_blank" rel="noopener noreferrer">Element-Plus</a>
        </li>
        <li>
          <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer">JSONPLaceholder</a>
        </li>
        <li>
          <a href="https://app.krat.es/" target="_blank" rel="noopener noreferrer">Krates</a>
        </li>
        <li>
          <a href="https://render-web.onrender.com/" target="_blank" rel="noopener noreferrer">Render</a>
        </li>
      </ul>
      <h3>Coded by</h3>
      <ul>
        <li>
          <a href="https://eddiehe.super.site/" target="_blank" rel="noopener noreferrer">Eddie He</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import { ref } from "vue";
export default {
  data() {
    return {
      drawer: ref(false),
      tipsDialogVisible: false,
    };
  },
  methods: {
    showTips() {
      this.$emit("showTips");
    },
  },
  mounted() {
    const internalInstance = getCurrentInstance();
    let global = internalInstance.appContext.config.globalProperties;
    global.$waline.update();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>