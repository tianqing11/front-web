<template>
  <Top />
  <HomeRight />
  <div class="main box_center cf"
    style="background-color: rgb(219, 216, 213);margin-top: 30px;padding: 20px;border-radius: 20px 20px 20px 20px;height: 1000px;">
    <div style="margin-top: 7px;margin-bottom: 15px;font-size: 18px;font-weight: bold;color: #f80">项目标题</div>
    <div style="margin-top: 7px;margin-bottom: 15px;font-size: 14px;">视频演示地址：</div>
    <div style="background-color: white;width: 100%;height: 60px;"></div>
    <br/>
    <br/>
    <div>
      <input type="checkbox" id="apple" value="Apple" v-model="selectedFruits" class="checkbox-input">
      <label for="apple"
        style="font-size: 12px;color: white;background-color: #f80;padding: 5px 10px 5px 10px;border-radius: 5px 5px 5px 5px;margin-left: 20px;">源码+详细教程（0到1）</label>

      <input type="checkbox" id="banana" value="Banana" v-model="selectedFruits" class="checkbox-input" style="margin-left: 60px;">
      <label for="banana"
        style="font-size: 12px;color: white;background-color: #f80;padding: 5px 10px 5px 10px;border-radius: 5px 5px 5px 5px;margin-left: 20px;">论文参考文档</label>

      <input type="checkbox" id="cherry" value="Cherry" v-model="selectedFruits" class="checkbox-input" style="margin-left: 60px;">
      <label for="cherry"
        style="font-size: 12px;color: white;background-color: rgb(86 177 127);padding: 5px 10px 5px 10px;border-radius: 5px 5px 5px 5px;margin-left: 20px;">远程部署</label>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <div style="text-align: center;font-size: 14px;">应付金额：<span
        style="font-weight: bold;color: #f80;font-size: 16px;">118</span>元</div>
    <br/>
    <div style="margin-left: 230px;">购买须知购买须知购买须知购买须知购买须知购买须知购买须知购买须知购买须知购买须知购买须知购买须知</div>
    <br/>
    <div>
      <input type="checkbox" id="apple" value="Apple" v-model="selectedFruits" style="margin-left: 230px;" class="checkbox-input">
      <label for="apple" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;支付即同意《项目攀登网》</label>
    </div>
    <br/>
    <br/>
    <div class="image-container">
      <div class="image-item">
        <img src="https://wx3.sinaimg.cn/mw690/005zRWxTly1hsk7jwvt9yj30f70ji77u.jpg" />
        <span style="margin-left: 250px;"></span>
        <img src="https://wx3.sinaimg.cn/mw690/005zRWxTly1hsk7jwvt9yj30f70ji77u.jpg" />
      </div>
    </div>
    <br />
    <br />
    <br />
    <div style="text-align: center;font-size: 18px;color: red;">付款后微信联系小孟，截图付款详情</div>
    <br />
    <br />
    <div>
        <img src="../assets/logo1.png">
    </div>
  </div>
  <br />
  <br />
  <br />
  <Footer />
</template>

<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElLoading } from "element-plus";
import Top from "@/components/common/Top";
import Footer from "@/components/common/Footer";
import request from '../utils/request'
import HomeLeft from '../components/home/HomeLeft';
import HomeRight from '../components/home/HomeRight';


export default {
  name: "home",
  components: {
    Top,
    Footer,
    HomeRight
  },

  data() {
    return {
      selectedFruits: []
    };
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL
    });

    onMounted(() => {
      // const bookId = route.params.id;
      // loadBook(bookId);
      // loadRecBooks(bookId);
      // loadLastChapterAbout(bookId);
      // loadNewestComments(bookId);
    });



    return {
      ...toRefs(state)
    };
  }
};





</script>

<style scoped>
.checkbox-input {
  /* 增加复选框的宽度和高度 */
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.image-container {
  display: flex;
  justify-content: space-between; /* 或者使用 'space-around', 'space-evenly' 等来调整间距 */
  align-items: center; /* 使图片在容器中垂直居中 */
}

.image-item {
  margin-left: 280px;
  /* 根据需要调整图片的样式 */
}

.image-item img {
  width: 100px; /* 设置图片的宽度 */
  height: auto; /* 保持图片的原始宽高比 */
}
</style>
