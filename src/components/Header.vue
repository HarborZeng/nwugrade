<template>
  <b-navbar :sticky="sticky" toggleable type="dark" variant="info" @click="changeUrlActiveState()">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <router-link class="navbar-brand" to="/">m西北大学网页版</router-link>

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
  import bus from '../bus/bus'

  export default {
    name: 'header',
    data() {
      return {
        relativeAddress: window.location.pathname,
        studentName: '未登录',
        studentNumber: '',
        sticky: true
      }
    },
    methods: {
      changeUrlActiveState() {
        this.relativeAddress = window.location.pathname
      },
      exit() {
        this.$store.commit("resetAllNwuData")
        bus.$emit("loginExit")
        this.studentName = '未登录'
        this.studentNumber = ''
      }
    },
    created() {
      bus.$on("loginFinished", () => {
        this.studentName = this.$store.state.nwugrade.usrData.name
        this.studentNumber = this.$store.state.nwugrade.usrData.xh
      })
    }
  }
</script>

<style scoped>

</style>
