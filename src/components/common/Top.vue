<template>
  <div class="mainNav" id="mainNav">
    <div class="headerlogo">
      <router-link :to="{ name: 'home' }"><img :src="logo" alt="项目攀登网" style="width: 165px; height: 40px;margin-top: 8px;"/></router-link>
    </div>
    <div class="box_center cf" style="width: 760px;">
      <ul class="nav" id="navModule" style="margin-left: 70px;">
        <li><router-link :to="{ name: 'home' }">优质项目</router-link></li>
        <li><router-link :to="{ name: 'home' }"> 从0到1学项目 </router-link></li>
        <li><router-link :to="{ name: 'home' }">项目定制</router-link></li>
        <li><a @click="goAuthor" href="javascript:void(0)">学习币获取</a></li>
        <li><router-link :to="{ name: 'home' }">钻石VIP学习</router-link></li>
        <li><router-link :to="{ name: 'home' }">痛点解决</router-link></li>
      </ul>
    </div>
    <span class="weixinlogin">
      <span v-if="!token">
        <router-link :to="{ name: 'login' }">logo 微信登录</router-link>
      </span>
      <span v-if="token">
        <router-link :to="{ name: 'userSetup' }">{{ nickName }}</router-link>
        <a @click="logout" href="javascript:void(0)">退出</a>
      </span>
    </span>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getToken, getNickName, removeToken, removeNickName, removeUid } from "@/utils/auth";
export default {
  name: "Top",
  setup(props, context) {
    const state = reactive({
      keyword: "",
      nickName: getNickName(),
      token: getToken(),
    });
    state.nickName = getNickName();
    state.token = getToken();
    const route = useRoute();
    const router = useRouter();
    state.keyword = route.query.key;
    const searchByK = () => {
      router.push({ path: "/bookclass", query: { key: state.keyword } });
      context.emit("eventSerch", state.keyword);
    };
    const logout = () => {
      removeToken();
      removeNickName();
      removeUid()
      state.nickName = "";
      state.token = "";
    };
    return {
      ...toRefs(state),
      logo,
      searchByK,
      logout,
    };
  },
};
</script>