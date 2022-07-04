<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <el-dialog v-model="tipsDialogVisible" title="Tips" width="30%">
      <ul style="text-align: left">
        <li>
          <span style="font-size: medium; font-weight: bold"
            >There is a like button.</span
          ><br />Give your preferred picture a thumb up!
        </li>
        <el-divider />
        <li>
          <span style="font-size: medium; font-weight: bold">Scroll down!</span
          ><br />Have fun in the comment section.
        </li>
      </ul>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="tipsDialogVisible = false"
            >OK</el-button
          >
        </span>
      </template>
    </el-dialog> -->
    <el-container style="padding-top: 3%">
      <div style="width: 30%; float: left">
        <p class="leftWords" v-html="
          localProfilePictures
            ? localProfilePictures[index].words
            : 'Hold on please.'
        "></p>
      </div>
      <div style="width: 40%; float: left">
        <el-carousel :interval="4000" type="card" :autoplay="false" :initial-index="0" @change="changeItem"
          ref="carousel">
          <el-carousel-item v-for="localProfilePicture in localProfilePictures" :key="localProfilePicture.id">
            <el-image :src="localProfilePicture.src" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="width: 30%; float: left">
        <p class="rightWords" v-if="localProfilePictures">
          <code style="color: #337ecc; font-size: larger">
            {{
                localProfilePictures ? localProfilePictures[index].likes : null
            }}
          </code>
          folks like this avatar.
        </p>
        <p class="rightWords" v-else style="font-weight: bold">...</p>
      </div>
    </el-container>
    <div className="container-fluid" style="padding-top: 2%; clear: both">
      <el-tooltip content="Click Me!" effect="customized" v-if="iconName === 'camera'">
        <el-icon style="cursor: pointer" :size="iconSize" @click="verificationDialogVisible = true">
          <camera />
        </el-icon>
      </el-tooltip>
      <el-icon class="is-loading" :size="iconSize" v-if="iconName === 'loading'">
        <loading />
      </el-icon>
      <el-icon :size="iconSize" v-if="iconName === 'camera-filled'">
        <camera-filled />
      </el-icon>
    </div>
    <el-dialog v-model="verificationDialogVisible" title="Varification" width="30%">
      <p style="margin-bottom: 5%; font-size: medium">lg10 = ?</p>
      <el-input-number v-model="inputNumber" :min="1" :max="10" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="verificationDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmVarification">Confirm</el-button>
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
      localProfilePictures: null,
      index: null,
      iconName: "camera",
      iconSize: null,
      iconScale: 0.04,
      screenWidth: null,
      screenHeight: null,
      verificationDialogVisible: ref(false),
      // tipsDialogVisible: ref(true),
      inputNumber: ref(1),
    };
  },
  watch: {
    screenWidth: {
      handler: function (param) {
        this.screenWidth = param;
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
    // screenHeight: {
    //   handler: function (param) {
    //     this.screenHeight = param;
    //     if (this.screenWidth > this.screenHeight) {
    //       this.iconSize = Math.round(this.screenWidth * this.iconScale);
    //       // console.log("width > height, this.iconSize: ", this.iconSize);
    //     } else {
    //       this.iconSize = Math.round(this.screenHeight * this.iconScale);
    //       // console.log("width < height, this.iconSize: ", this.iconSize);
    //     }
    //   },
    //   setImmediate: true,
    // },
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
        message: "Thanks for your thumbs up!",
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
    getJsonplaceholderProfilePictures() {
      const getProfilePictures = async () => {
        let result = await Service.getJsonplaceholderProfilePicturesJson();
        console.log("get jsonplaceholder result: ", result);
        this.localProfilePictures = result.data;
        this.$refs.carousel.setActiveItem(0);
        this.index = 0;
        this.iconName = "camera";
        console.log("this.localProfilePictures: ", this.localProfilePictures);
      };
      getProfilePictures().catch((error) => {
        this.showErrorNotification();
        console.log("get jsonplaceholder error: ", error);
      });
    },
    patchJsonplaceholderProfilePictures() {
      const patchProfilePictures = async () => {
        let result = await Service.patchJsonplaceholderProfilePicturesJson(
          this.index,
          {
            likes: this.localProfilePictures[this.index].likes + 1,
          }
        );
        console.log("patch jsonplaceholder result: ", result);
        this.localProfilePictures[this.index].likes += 1;
        this.iconName = "camera-filled";
        this.showSuccessNotification();
        setTimeout(() => {
          this.iconName = "camera";
          console.log("2.5 s passed. Change camera-fill to camera.");
        }, 2500);
      };
      patchProfilePictures().catch((error) => {
        this.showErrorNotification();
        console.log("patch jsonplaceholder error: ", error);
      });
    },
    getKratesProfilePictures() {
      const getProfilePictures = async () => {
        let result = await Service.getKratesProfilePicturesJson();
        console.log("get krates result: ", result);
        this.localProfilePictures = result.data[0].profilePictures;
        this.$refs.carousel.setActiveItem(0);
        this.index = 0;
        this.iconName = "camera";
        console.log("this.localProfilePictures: ", this.localProfilePictures);
      };
      getProfilePictures().catch((error) => {
        this.showErrorNotification();
        console.log("get krates error: ", error);
      });
    },
    putKratesProfilePictures() {
      let tempProfilePictures = JSON.stringify(this.localProfilePictures);
      let profilePictures = JSON.parse(tempProfilePictures);
      profilePictures[this.index].likes += 1;
      const putProfilePictures = async () => {
        let result = await Service.putKratesProfilePicturesJson({
          profilePictures,
        });
        console.log("put krates result: ", result);
        this.localProfilePictures[this.index].likes += 1;
        this.iconName = "camera-filled";
        this.showSuccessNotification();
        setTimeout(() => {
          this.iconName = "camera";
          console.log("3 s passed. Change camera-fill to camera.");
        }, 2500);
      };
      putProfilePictures().catch((error) => {
        this.showErrorNotification();
        console.log("put krates error: ", error);
      });
    },
    confirmVarification() {
      if (this.inputNumber === 1) {
        this.verificationDialogVisible = false;
        this.iconName = "loading";
        // this.patchJsonplaceholderProfilePictures();
        this.putKratesProfilePictures();
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
    // this.getJsonplaceholderProfilePictures();
    this.getKratesProfilePictures();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.leftWords {
  font-size: large;
  justify-content: left;
  text-align: left;
  margin: 20% 5% 0 15%;
  vertical-align: middle;
}

.rightWords {
  font-size: large;
  justify-content: left;
  text-align: left;
  margin: 40% 0 0 5%;
  vertical-align: middle;
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
