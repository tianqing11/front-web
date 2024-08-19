<template>
  <Top />
  <div class="carousel">
    <div @click="prevSlide" class="carousel-prev-icon-left"></div>
    <div class="carousel-slides">
      <img v-for="(image, index) in images" :key="index" :src="image"
        :style="{ left: index * 100 + '%', 'transform': dynamicstyle }" alt="暂无图片" />
    </div>
    <div @click="nextSlide" class="carousel-prev-icon-right"></div>

  </div>
  <HomeLeft />
  <HomeRight />
  <div class="main box_center cf">
    <span class="searchBar fl" style="position: absolute;top: 320px;left: 200px;">
      <span class="search cf">
        <select v-model="searchParam.projectClass" style="border-radius: 30px 0 0 30px;height: 45px;width: 110px;font-size: 15px;" >
          <option v-for="option in projrctOptions" :value="option.value" :key="option.value">
            &nbsp;&nbsp;&nbsp;&nbsp;{{ option.text }}
          </option>
        </select>
        <input v-model="searchParam.name" type="text" placeholder="搜索项目" class="s_int" v-on:keyup.enter="searchByK" />
        <label class="search_btn" id="btnSearch" @click="searchByK()"><i class="icon"></i><span
            style="position: absolute; margin-top: -23px; font-size: 16px; color: white;">搜索</span></label>
      </span>
    </span>

    <div class="channelWrap channelPic cf">
      <div class="title">

        <div class="wrap">
          <!-- 标签导航 -->
          <div class="searchBox navBox">
            <div class="good_city" :style="'transform: translateX(' + tabIndex + 'px);'">
              <div class="tabBox" :id="'tab' + item.id" v-for="(item, index) in tabList" :key='index'
                :class="tabChose == item.id ? 'tabChose' : ''" @click="choseTab(item)">
                <div>{{ item.name }}</div>
              </div>
            </div>
            <div class="contrlBox flexcenter">
              <i class="el-icon-arrow-left" :style="tabChose == tabList[0].id ? 'color:#CCCCCC' : 'color:#999999'"
                @click="tabLeft">《</i>
              <div style="width:20px;height:1px"></div>
              <i class="el-icon-arrow-right"
                :style="tabChose == tabList[tabList.length - 1].id ? 'color:#CCCCCC' : 'color:#999999'"
                @click="tabRight">》</i>
            </div>
          </div>
        </div>

      </div>
      <div class="picRecommend cf" id="hotRecBooks">
        <div class="itemsList" v-for="(item, index) in projectList" :key="index">
          <div class="items_img" href="javascript:void(0)" @click="projectDetail(item.id)" style="border-radius: 20px 20px 20px 20px;">
            <div href="javascript:void(0)"><img :src="`${item.picUrl}`" onerror="this.src='default.gif';this.onerror=null" :alt="item.name" style="border-radius: 20px 20px 0 0;"/></div>
            <div href="javascript:void(0)" style="font-size: 21px;margin-top: 10px;">&nbsp;&nbsp;{{ item.name }}</div>
            <div href="javascript:void(0)" style="font-size: 15px;">&nbsp;&nbsp;次数：{{ item.viewCount }}</div>
            <div href="javascript:void(0)" style="font-size: 15px;">&nbsp;&nbsp;推荐等级：{{ item.recommendedLevel }}</div>
            <br />
          </div>
        </div>
      </div>

      <div>
        <el-pagination layout="prev, pager, next" :background="backgroud" :page-size="pageSize" :total="total"
          prev-text='上一页' next-text='下一页' @current-change="handleCurrentChange" />
      </div>

    </div>
  </div>
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
    HomeLeft,
    HomeRight
  },

  data() {
    return {
      images: ['https://wx3.sinaimg.cn/mw690/005zRWxTly1hsk7jwvt9yj30f70ji77u.jpg',
        'https://wx1.sinaimg.cn/mw690/d2f2fa7agy1hrtflxfr0fj20j615hn1k.jpg',
        'https://wx1.sinaimg.cn/mw690/693ad074gy1hrudk744uoj20zu1lw4c7.jpg'],
      dynamicstyle: "", //动态样式
      currentSlide: 0, //播放序号
      interval: Object
    }
  },
  mounted() {
    // 自动播放动画
    this.startSlideshow()
  },
  methods: {
    nextSlide() {
      // 每次指针加一
      this.currentSlide = (this.currentSlide + 1) % this.images.length
      this.setStyle();
    },
    prevSlide() {
      // 每次减一，为负数时循环
      this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
      this.setStyle();
    },
    // 图片动画
    setStyle() {
      this.dynamicstyle = `translatex(-${this.currentSlide * 100}%)`
    },
    // 定时器
    startSlideshow() {
      this.interval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
        this.setStyle();
      }, 3000)
    },
    stopSlideshow() {
      clearInterval(this.interval)
    },


  },
  setup() {
    const router = useRouter();
    const state = reactive({
      //项目
      projectList: [],
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      //项目分类
      tabChose: 0,//选择的tab
      tabIndex: 0,//tab需要移动的宽
      tabList: [
        {
          id: 0,
          name: '全部'
        }
      ],
      //分页
      backgroud: true,
      total: 0,
      pageSize: 5,
      searchCondition: {},
      //查询
      searchParam: {
        name: "",
        projectClass: "0"
      },
      projrctOptions: []
    });

    onMounted(async () => {
      //项目分类
      state.tabList = await request.post('/project/public/getClassify', {})
      for (let i = 0; i < state.tabList.length; i++) {
        if (state.tabList[i]['id'] != '0') {
          state.projrctOptions[i] = {
            'value': state.tabList[i]['id'],
            'text': state.tabList[i]['name']
          }
        }else{
          state.projrctOptions[i] = {
            'value': state.tabList[i]['id'],
            'text': state.tabList[i]['name']+'分类'
          }
        }
      }

      request.post('/project/public/getProject', {}).then(response => {
        state.projectList = response
        if (response.length > 0) {
          state.total = response[0]['total']
        } else {
          state.total = 0
        }
      })
    });

    const selected = ref('');

    const handleCurrentChange = (pageNum) => {
      request.post('/project/public/getProject', { "pageNum": pageNum }).then(response => {
        state.projectList = response
        if (response.length > 0) {
          state.total = response[0]['total']
        } else {
          state.total = 0
        }
      })
    };

    const searchByK = () => {
      request.post('/project/public/getProject', state.searchParam).then(response => {
        state.projectList = response
        if (response.length > 0) {
          state.total = response[0]['total']
        } else {
          state.total = 0
        }
      })
    };



    const projectDetail = (id) => {
      router.push({ path: `/projectDetail/${id}` });
    };

    const prev = () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    }

    const next = () => {
      if (state.currentIndex < state.buttons.length - state.visibleCount) {
        state.currentIndex++;
      }
    }


    const choseTab = (e) => {
      //点击tab
      var indexBefore = 0, indexNow = 0,
        tabidnow = 0;//需要移动的宽
      state.tabList.forEach((item, index) => {
        if (item.id == state.tabChose) {
          indexBefore = index//之前的下标
        }
        if (e.id == item.id) {
          indexNow = index
        }
      })
      state.tabChose = e.id//赋值当前选中的值
      for (let i = indexBefore; i < indexNow; i++) {//循环中间间隔了多少
        tabidnow += (document.getElementById('tab' + state.tabList[i].id).clientWidth + 30)
        if (i == indexNow - 1) {
          state.tabIndex -= tabidnow
        }
      }
      getProject(state.tabChose);
    }
    const tabLeft = () => {//左箭头切换
      if (state.tabChose != 0) {//判断是否是初始位置
        var tabid = '';
        state.tabList.forEach((item, index) => {
          if (item.id == state.tabChose) {
            tabid = 'tab' + state.tabList[index - 1].id
          }
        })
        state.tabChose = tabid.replace(/tab/g, '')
        state.tabIndex += (document.getElementById(tabid).clientWidth + 30)
        //内容往左边移动上一个div的宽
      }
      getProject(state.tabChose);
    }
    const tabRight = () => {//右箭头切换
      var tabid = '',
        tabidnow = 'tab' + state.tabChose;
      state.tabList.forEach((item, index) => {
        if (item.id == state.tabChose) {
          tabid = 'tab' + state.tabList[index + 1].id
        }
      })
      state.tabChose = tabid.replace(/tab/g, '')
      state.tabIndex -= (document.getElementById(tabidnow).clientWidth + 30)
      getProject(state.tabChose);
    }
    const getProject = (projectClass) => {
      request.post('/project/public/getProject', { "projectClass": projectClass }).then(response => {
        state.projectList = response
        if (response.length > 0) {
          state.total = response[0]['total']
        } else {
          state.total = 0
        }
      })
    }

    return {
      ...toRefs(state),
      projectDetail,
      prev,
      next,
      choseTab,
      tabLeft,
      tabRight,
      getProject,
      handleCurrentChange,
      searchByK,
      selected
    };
  }
};





</script>

<style scoped>
.carousel {
  position: relative;
}

.carousel-slides {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.carousel-slides img {
  display: inline-block;
  position: absolute;
  width: inherit;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  height: 100%;
  transition: 0.5s transform ease-in-out;
}

.carousel-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
}

.carousel-prev-icon-left {
  position: absolute;
  left: 10px;
  top: 55px;
  height: 50px;
  width: 40px;
  border: none;
  /* background-image: url(../../../assets/img/arrow-l.png); */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 999;
}

.carousel-prev-icon-right {
  position: absolute;
  right: 10px;
  top: 55px;
  height: 50px;
  width: 40px;
  border: none;
  /* background-image: url('../../../assets/img/arrow-r.png/'); */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 999;
}

.flexcenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navBox {
  background: #ffffff;
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 30px;
}

.navBox .tabBox {
  padding: 9px 16px;
  border-radius: 10px;
  color: #333333;
  font-size: 15px;
  margin-right: 15px;
  float: left;
  background-color: #e6e8efd0;
  width: 104px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  /* 边框仅为了展示效果 */
}

.navBox .tabBox:hover {
  cursor: pointer;
}


.navBox .tabChose {
  background: #f7e6a3;
  color: #fbac24;
  border: 1px solid #fbac24;
  /* 边框仅为了展示效果 */
}

.navBox .good_city {
  width: 9999px;
  height: 40px;
  transition: all .5s;
}

.navBox .contrlBox {
  position: absolute;
  right: 0;
  bottom: 12px;
  font-size: 17px;
  font-weight: bold;
}

.navBox .contrlBox .i {
  font-size: 18px;
  flex-wrap: bold;
}

.navBox .contrlBox i:hover {
  cursor: pointer;
}

.el-pagination {
  justify-content: center;
}

.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #f80 !important;
}

.el-pagination {
  --el-pagination-hover-color: #f80 !important;
}

input::placeholder {
  position: absolute;
  color: #909090;
  font-size: 17px;
  margin-left: 10px;
}</style>
