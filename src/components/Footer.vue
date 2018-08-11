<template>
  <div class="footer copyright">
    <span>
      Copyright &copy; HarborZeng
      <a href="https://tellyouwhat.cn/">tellyouwhat.cn</a>
    </span> <br/>
    <span>
      项目源代码：
      <a href="https://github.com/HarborZeng/grade.tellyouwhat.cn" target="_blank">
        https://github.com/HarborZeng/grade.tellyouwhat.cn
      </a>
    </span> <br/>
    <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
  </div>
</template>

<script>
  import '../assets/busuanzi.pure.mini'

  export default {
    name: 'Footer'
  }
</script>

<style scoped>
  .copyright {
    margin-top: 45px;
    background: #ffffff;
    font-size: 13px;
    text-align: center;
    color: #555555;
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: dashed seashell 3px;
    position: relative;
    width: 100%;
    bottom: 0;
  }

  .copyright span {
    margin: 0 .5em;
  }

  .copyright a {
    color: #555555;
  }
</style>
