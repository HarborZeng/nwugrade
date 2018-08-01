<template>
  <div class="col-md-6 card harbor-padding">
    <h4>学习状态</h4>
    <hr/>
    <table class="table table-bordered table-hover table-study">
      <tr :key="state.k" v-for="state in studyState">
        <td><span v-html="state.k"></span></td>
        <td v-if="state.v instanceof Object">
          <table class="table table-responsive table-bordered table-hover">
            <tr v-if="state.v.length === 0">
              <td><span>无</span></td>
            </tr>
            <tr v-else :key="item.k" v-for="item in state.v">
              <td><span v-html="item.k"></span></td>
              <td><span v-html="item.v"></span></td>
            </tr>
          </table>
        </td>
        <td v-else-if="state.v === ''"><span>尚未填写</span></td>
        <td v-else><span v-html="state.v"></span></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StudyState'
}
</script>

<style scoped>

</style>
