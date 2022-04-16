<template>
  <el-menu
    :default-active="this.$router.path"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    fixed="top"
    style="top: 0"
    :router="false"
  >
    <el-menu-item index="/" @click="routerPush('/')"
      >Eddie He's Avatars</el-menu-item
    >
    <el-sub-menu index="2">
      <template #title>Avatars</template>
      <el-menu-item
        index="2-1"
        @click="openSelfWebsite('https://eddiehe-avatars-darkmode.vercel.app/')"
        >DarkMode</el-menu-item
      >
      <el-menu-item
        index="2-2"
        :disabled="this.$route.path === '/' ? true : false"
        >LightMode</el-menu-item
      >
      <el-sub-menu index="2-3">
        <template #title>JSON</template>
        <el-menu-item
          index="2-3-1"
          @click="
            openBlankWebsite(
              'https://my-json-server.typicode.com/eddiehe49/avatars-json/'
            )
          "
          >JSONPLaceholder</el-menu-item
        >
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>Favicons</template>
      <el-menu-item
        index="3-0"
        @click="openSelfWebsite('https://eddiehe-favicons.vercel.app/')"
        >Auto</el-menu-item
      >
      <el-menu-item
        index="3-1"
        @click="
          openSelfWebsite('https://eddiehe-favicons-darkmode.vercel.app/')
        "
        >DarkMode</el-menu-item
      >
      <el-menu-item
        index="3-2"
        @click="
          openSelfWebsite('https://eddiehe-favicons-lightmode.onrender.com/')
        "
        >LightMode</el-menu-item
      >
      <el-sub-menu index="3-3">
        <template #title>JSON</template>
        <el-menu-item
          index="3-3-1"
          @click="
            openBlankWebsite(
              'https://my-json-server.typicode.com/eddiehe49/favicons-json/'
            )
          "
          >JSONPLaceholder</el-menu-item
        >
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item
      index="/about"
      @click="routerPush('/about')"
      :disabled="this.$route.path === '/about' ? true : false"
      >About</el-menu-item
    >
  </el-menu>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>


<script>
import { ElMenu, ElMenuItem, ElSubMenu, Resize } from "element-plus";
window.onresize = Resize;
export default {
  components: { ElMenu, ElMenuItem, ElSubMenu },
  data() {
    return {
      activeIndex2: "/",
      screenWidth: document.body.clientWidth,
      screeHeight: document.body.clientHeight,
    };
  },
  methods: {
    Resize() {
      console.log("Window resized");
    },
    routerPush(URL) {
      this.$router.push(URL);
    },
    openSelfWebsite(URL) {
      window.open(URL, "_self", "noopener=yes,noreferrer=yes");
    },
    openBlankWebsite(URL) {
      window.open(URL, "_blank", "noopener=yes,noreferrer=yes");
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

a {
  /* font-weight: bold; */
  color: #409eff;
}
</style>
