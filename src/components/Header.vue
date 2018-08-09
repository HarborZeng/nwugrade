<template>
  <b-navbar sticky=true toggleable type="dark" variant="info" @click="changeUrlActiveState()">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <router-link class="navbar-brand" to="/">m西北大学网页版</router-link>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <li :class="relativeAddress === '/' ? 'nav-item active' : 'nav-item'">
          <router-link class="nav-link" to="/">学习状态</router-link>
        </li>
        <li :class="relativeAddress === '/grade' ? 'nav-item active' : 'nav-item'">
          <router-link class="nav-link" to="/grade">成绩查询</router-link>
        </li>
        <li :class="relativeAddress === '/nextTermLessons' ? 'nav-item active' : 'nav-item'">
          <router-link class="nav-link" to="/nextTermLessons">下学期课</router-link>
        </li>
        <li :class="relativeAddress === '/myLessons' ? 'nav-item active' : 'nav-item'">
          <router-link class="nav-link" to="/myLessons">我的课程</router-link>
        </li>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>

  export default {
    name: 'header',
    data() {
      return {
        relativeAddress: window.location.pathname,
      }
    },
    methods: {
      changeUrlActiveState() {
        this.relativeAddress = window.location.pathname
      }
    }
  }
</script>

<style scoped>

</style>
