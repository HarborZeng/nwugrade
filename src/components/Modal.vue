<template>
  <div>
    <b-button @click="showModal">
      Open Modal
    </b-button>
    <b-modal ref="msgModal" hide-footer :title="msgTitle">
      <div class="d-block text-center">
        <h3 v-html="msg"></h3>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">我知道了</b-btn>
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
        msg: this.$store.state.dialog.msg
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
      bus.$on("showDialog", () => {
        this.showModal()
      })
    }
  }
</script>

<style scoped>

</style>
