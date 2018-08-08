<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <router-link class="navbar-brand" to="/">西大成绩查询 - m西北大学网页版（非官方）</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" @click="changeUrlActiveState()">
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
        </ul>
      </div>
    </nav>
  </div>
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
