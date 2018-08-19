<template>
  <div id="app">
    <Modal></Modal>
    <Loading></Loading>
    <MyHeader></MyHeader>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import MyHeader from "./components/MyHeader";
  import Footer from "./components/Footer";
  import Modal from "./components/Modal";
  import Loading from "./components/Loading";
  import bus from './bus/bus'

  export default {
    name: 'App',
    components: {Loading, Modal, Footer, MyHeader},
    created() {
      document.onkeydown = e => {
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r' || e.key === 'R')) {
          bus.$emit("refreshRequested")
          return false;
        }
      }
    }
  }
</script>

<style>
  .a-little_space {
    margin: 10px;
  }

  .more-space {
    margin: 30px 5px 5px 5px;
  }

  .more-space-top {
    margin: 10px 0 0 0;
  }
</style>
