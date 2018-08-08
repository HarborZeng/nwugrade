<template>
  <div>
    <b-modal ref="msgModal" hide-footer :title="msgTitle">
      <div class="d-block text-center">
        <h3 v-html="msg"></h3>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal" v-html="closeMsg"></b-btn>
    </b-modal>
  </div>
</template>

<script>
  import bModal from 'bootstrap-vue/es/components/modal/modal'
  import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
  import bus from '../bus/bus'

  export default {
    name: 'Modal',
    data() {
      return {
        msgTitle: this.$store.state.dialog.msgTitle,
        msg: this.$store.state.dialog.msg,
        closeMsg: this.$store.state.dialog.closeMsg,
      }
    },
    comments: {
      'b-modal': bModal
    },
    directives: {
      'b-modal': bModalDirective
    },
    methods: {
      showModal () {
        this.$refs.msgModal.show()
      },
      hideModal () {
        this.$refs.msgModal.hide()
      }
    },
    created() {
      bus.$on("showDialog", (msg, title) => {
        this.msg = msg;
        this.msgTitle = title;
        this.showModal()
      })
    }
  }
</script>

<style scoped>

</style>
