<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getCurrentInstance } from "vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  mounted() {
    const internalInstance = getCurrentInstance();
    //  全局变量
    let global = internalInstance.appContext.config.globalProperties;
    global.$waline.update();
  },
};
</script>
