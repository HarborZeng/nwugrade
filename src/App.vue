<template>
  <div id="app">
    <router-link to="/header"></router-link>
    <router-link to="/msg"></router-link>
    <router-link to="/login"></router-link>
    <router-link to="/studyState"></router-link>
    <router-link to="/grades"></router-link>
    <router-link to="/footer"></router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
