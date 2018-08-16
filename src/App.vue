<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
    <Modal></Modal>
    <Loading></Loading>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import Modal from "./components/Modal";
  import Loading from "./components/Loading";

  export default {
    name: 'App',
    components: {Loading, Modal, Footer, Header}
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
    margin: 10px 1px 1px 1px;
  }
</style>
