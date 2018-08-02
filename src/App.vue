<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
    <Modal></Modal>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import Modal from "./components/Modal";

  export default {
    name: 'App',
    components: {Modal, Footer, Header}
  }
</script>

<style>

</style>
