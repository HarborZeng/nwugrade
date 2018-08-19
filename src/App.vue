<template>
  <div id="app">
    <!--使用一堆自定义的组件-->
    <!--把Modal和Loading放在前面的原因是，
    modal就是弹窗，loading就是加载框
    他俩需要初始化一些监听事件，
    监听有没有其他组件想弹窗或显示加载框-->
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

  // 向外暴露一个对象
  export default {
    name: 'App',
    components: {Loading, Modal, Footer, MyHeader},
    // 在初始化这个父组件的时候，加入一段代码
    created() {
      document.onkeydown = e => {
        // 拦截对浏览器发出的刷新请求
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r' || e.key === 'R')) {
          // 如果是刷新请求，那么久发送一个事件，由具体的子组件进行处理
          bus.$emit("refreshRequested")
          // false代表不让浏览器重新加载整个页面
          return false;
        }
      }
    }
  }
</script>

<style>
  /*全局css，子组件都可以用*/

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
