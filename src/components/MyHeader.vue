<template>
  <b-navbar :sticky="sticky" toggleable type="dark" variant="info" @click="changeUrlActiveState()">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand>
      <img src="/static/nav-img.png" class="nav-img">
      <router-link class="navbar-brand" to="/">告你成绩</router-link>
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <li :class="relativeAddress === '/' ? 'nav-item active' : 'nav-item'">
          <router-link class="nav-link" to="/">成绩查询</router-link>
        </li>
        <li :class="relativeAddress === '/studyState' ? 'nav-item active' : 'nav-item'">
          <router-link class="nav-link" to="/studyState">学习状态</router-link>
        </li>
        <li :class="relativeAddress === '/nextTermLessons' ? 'nav-item active' : 'nav-item'">
          <router-link class="nav-link" to="/nextTermLessons">下学期课</router-link>
        </li>
        <li :class="relativeAddress === '/myLessons' ? 'nav-item active' : 'nav-item'">
          <router-link class="nav-link" to="/myLessons">我的课程</router-link>
        </li>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em v-html="studentName"></em>
          </template>
          <b-dropdown-item v-if="studentName !== '未登录'">学号：{{studentNumber}}</b-dropdown-item>
          <b-dropdown-item v-if="studentName !== '未登录'" @click="exit">退出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'myheader',
    data() {
      return {
        relativeAddress: window.location.pathname,
        sticky: true
      }
    },
    computed: {
      /**
       * 学生姓名，根据veux里面存的实时变化
       */
      studentName: {
        get: function () {
          return this.$store.state.nwugrade.usrData.name
        },
        set: function (newValue) {

        }
      },
      /**
       * 学号，根据veux里面存的实时变化
       */
      studentNumber: {
        get: function () {
          return this.$store.state.nwugrade.usrData.xh
        },
        set: function (newValue) {

        }
      }
    },
    methods: {
      /**
       * url后面的相对路径变化了，更新relativeAddress值，
       * css会有相应变化，相应标签会被加上active样式
       */
      changeUrlActiveState() {
        this.relativeAddress = window.location.pathname
      },
      /**
       * 退出登录的注销事件，重置所有NwuDAta
       */
      exit() {
        this.$store.commit("resetAllNwuData")
      }
    },
  }
</script>

<style scoped>
  /*作用域有限，限定在本组件的css*/

  @media screen and (max-width: 479px) {
    /*屏幕小于479px的不显示logo图*/
    .nav-img {
      display: none;
    }
  }
  .nav-img {
    height: 45px;
  }
</style>
