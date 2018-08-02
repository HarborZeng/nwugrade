<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <router-link class="navbar-brand" to="/">西大成绩查询 - m西北大学网页版（非官方）</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/grade">成绩查询</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/nextTermLessons">下学期课</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/myLessons">我的课程</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

  export default {
    name: 'header'
  }
</script>

<style scoped>

</style>
