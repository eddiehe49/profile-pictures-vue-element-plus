<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <el-container style="margin-top: 3%">
      <div style="width: 30%; height: 50%; float: left">
        <p className="leftWords">
          {{ localAvatars ? localAvatars[index].words : null }}
        </p>
      </div>
      <div style="width: 40%; height: 50%; float: left">
        <el-carousel
          :interval="4000"
          type="card"
          :autoplay="false"
          :initial-index="0"
          @change="changeItem"
          ref="carousel"
        >
          <el-carousel-item
            v-for="localAvatar in localAvatars"
            :key="localAvatar.id"
          >
            <el-image :src="localAvatar.src" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="width: 30%; height: 50%; float: left">
        <p className="rightWords">
          <code style="color: #409eff; font-size: x-large">
            {{ localAvatars ? localAvatars[index].likes : null }}
          </code>
          folks like this avatar.
        </p>
      </div>
    </el-container>
    <div className="container-fluid" style="margin-top: 2%; clear: both">
      <el-tooltip
        content="Click Me!"
        effect="customized"
        v-if="iconName === 'camera'"
      >
        <el-icon
          style="cursor: pointer"
          :size="iconSize"
          @click="dialogVisible = true"
          ><camera
        /></el-icon>
      </el-tooltip>
      <el-icon
        class="is-loading"
        :size="iconSize"
        v-if="iconName === 'loading'"
      >
        <loading />
      </el-icon>
      <el-icon :size="iconSize" v-if="iconName === 'camera-filled'"
        ><camera-filled
      /></el-icon>
    </div>
    <el-dialog v-model="dialogVisible" title="Varification" width="30%">
      <p style="margin-bottom: 5%; font-size: medium">lg10 = ?</p>
      <el-input-number v-model="inputNumber" :min="1" :max="10" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmVarification"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  ElContainer,
  ElCarousel,
  ElImage,
  ElButton,
  ElDialog,
  ElInputNumber,
  ElNotification,
  ElMessage,
  ElTooltip,
} from "element-plus";
import { Camera, Loading, CameraFilled } from "@element-plus/icons-vue";
import Service from "@/services/Service.js";
import { ref } from "vue";
export default {
  components: {
    ElContainer,
    ElCarousel,
    ElImage,
    ElButton,
    ElDialog,
    ElInputNumber,
    ElTooltip,
    Camera,
    Loading,
    CameraFilled,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      localAvatars: null,
      index: null,
      iconName: "camera",
      iconSize: null,
      iconScale: 0.04,
      screenWidth: null,
      screenHeight: null,
      dialogVisible: ref(false),
      inputNumber: ref(1),
    };
  },
  watch: {
    screenWidth: {
      handler: function (param) {
        this.screenWidth = param;
        if (this.screenWidth > this.screenHeight) {
          this.iconSize = Math.round(this.screenWidth * 0.05);
          // console.log("width > height, this.iconSize: ", this.iconSize);
        } else {
          this.iconSize = Math.round(this.screenHeight * 0.05);
          // console.log("width < height, this.iconSize: ", this.iconSize);
        }
      },
      setImmediate: true,
    },
    screenHeight: {
      handler: function (param) {
        this.screenHeight = param;
        if (this.screenWidth > this.screenHeight) {
          this.iconSize = Math.round(this.screenWidth * this.iconScale);
          // console.log("width > height, this.iconSize: ", this.iconSize);
        } else {
          this.iconSize = Math.round(this.screenHeight * this.iconScale);
          // console.log("width < height, this.iconSize: ", this.iconSize);
        }
      },
      setImmediate: true,
    },
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;
    if (this.screenWidth > this.screenHeight) {
      this.iconSize = Math.round(this.screenWidth * this.iconScale);
      // console.log("width > height, this.iconSize: ", this.iconSize);
    } else {
      this.iconSize = Math.round(this.screenHeight * this.iconScale);
      // console.log("width < height, this.iconSize: ", this.iconSize);
    }
    window.onresize = () => {
      return (() => {
        this.screenWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        this.screenHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
      })();
    };
  },
  methods: {
    changeItem(e) {
      this.index = e;
    },
    showSuccessNotification() {
      ElNotification({
        showClose: true,
        title: "Success",
        message: "Thank you for your like!",
        type: "success",
        position: "top-right",
      });
    },
    showErrorNotification() {
      ElMessage({
        showClose: true,
        title: "Error",
        message: "Oops, something goes wrong!",
        type: "error",
        position: "top-right",
      });
    },
    getJsonplaceholderAvatars() {
      const getAvatars = async () => {
        let result = await Service.getJsonplaceholderAvatarsJson();
        console.log("get jsonplaceholder result =", result);
        this.localAvatars = result.data;
        this.$refs.carousel.setActiveItem(0);
        this.index = 0;
        this.iconName = "camera";
        console.log("this.localAvatars =", this.localAvatars);
      };
      getAvatars().catch((error) => {
        this.showErrorNotification();
        console.log("get jsonplaceholder error =", error);
      });
    },
    patchJsonplaceholderAvatars() {
      const patchAvatars = async () => {
        let result = await Service.patchJsonplaceholderAvatarsJson(this.index, {
          likes: this.localAvatars[this.index].likes + 1,
        });
        console.log("patch jsonplaceholder result =", result);
        this.localAvatars[this.index].likes += 1;
        this.iconName = "camera-filled";
        this.showSuccessNotification();
        setTimeout(() => {
          this.iconName = "camera";
          console.log("2.5 s passed. Change camera-fill to camera.");
        }, 2500);
      };
      patchAvatars().catch((error) => {
        this.showErrorNotification();
        console.log("patch jsonplaceholder error =", error);
      });
    },
    getJsonbinAvatars() {
      const getAvatars = async () => {
        let result = await Service.getJsonbinAvatarsJson();
        console.log("get jsonbin result =", result);
        this.localAvatars = result.data.record.avatars;
        this.$refs.carousel.setActiveItem(0);
        this.index = 0;
        this.iconName = "camera";
        console.log("this.localAvatars =", this.localAvatars);
      };
      getAvatars().catch((error) => {
        this.showErrorNotification();
        console.log("get jsonbin error =", error);
      });
    },
    putJsonbinAvatars() {
      // Coould not do (let tempAvatars=this.localAvatars), as tempAvatars will sync with this.localAvatars
      let tempAvatars = JSON.stringify(this.localAvatars);
      let avatars = JSON.parse(tempAvatars);
      avatars[this.index].likes += 1;
      const putAvatars = async () => {
        let result = await Service.putJsonbinAvatarsJson({ avatars });
        console.log("put jsonbin result =", result);
        this.localAvatars[this.index].likes += 1;
        this.iconName = "camera-filled";
        this.showSuccessNotification();
        setTimeout(() => {
          this.iconName = "camera";
          console.log("3 s passed. Change camera-fill to camera.");
        }, 2500);
      };
      putAvatars().catch((error) => {
        this.showErrorNotification();
        console.log("put jsonbin error =", error);
      });
    },
    getKratesAvatars() {
      const getAvatars = async () => {
        let result = await Service.getKratesAvatarsJson();
        console.log("get krates result =", result);
        this.localAvatars = result.data[0].avatars;
        this.$refs.carousel.setActiveItem(0);
        this.index = 0;
        this.iconName = "camera";
        console.log("this.localAvatars =", this.localAvatars);
      };
      getAvatars().catch((error) => {
        this.showErrorNotification();
        console.log("get krates error =", error);
      });
    },
    putKratesAvatars() {
      let tempAvatars = JSON.stringify(this.localAvatars);
      let avatars = JSON.parse(tempAvatars);
      avatars[this.index].likes += 1;
      const putAvatars = async () => {
        let result = await Service.putKratesAvatarsJson({ avatars });
        console.log("put krates result =", result);
        this.localAvatars[this.index].likes += 1;
        this.iconName = "camera-filled";
        this.showSuccessNotification();
        setTimeout(() => {
          this.iconName = "camera";
          console.log("3 s passed. Change camera-fill to camera.");
        }, 2500);
      };
      putAvatars().catch((error) => {
        this.showErrorNotification();
        console.log("put krates error =", error);
      });
    },
    confirmVarification() {
      if (this.inputNumber === 1) {
        this.dialogVisible = false;
        this.iconName = "loading";
        // this.patchJsonplaceholderAvatars();
        // this.putJsonbinAvatars();
        this.putKratesAvatars();
      } else {
        ElMessage({
          showClose: true,
          title: "Warning",
          message: "Wrong varification code!",
          type: "warning",
          position: "top-right",
        });
      }
    },
  },
  created() {
    this.iconName = "loading";
    // this.getJsonplaceholderAvatars();
    // this.getJsonbinAvatars();
    this.getKratesAvatars();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.leftWords {
  font-size: large;
  padding-left: 15%;
  padding-right: 5%;
  justify-content: right;
  text-align: right;
  margin: 0 auto;
  margin-top: 20%;
  vertical-align: middle;
}

.rightWords {
  font-size: large;
  padding-left: 5%;
  justify-content: left;
  text-align: left;
  margin: 0 auto;
  margin-top: 40%;
  vertical-align: middle;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  /* padding: 6px 12px; */
  padding: 0.6% 0.12%;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
