<template>
  <div class="footer copyright">
    <span @click="showMoreInfo" v-html="copyrightMessage">

    </span> <br/>
    <span>
      <a href="https://github.com/HarborZeng/grade.tellyouwhat.cn" target="_blank" class="a-show-underline">
        项目源代码
      </a>
    </span> <br/>
    <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
  </div>
</template>

<script>
  import '../assets/busuanzi.pure.mini'

  export default {
    name: 'Footer',
    data() {
      return {
        copyrightMessage: "Copyright &copy; HarborZeng\n" +
        "      <a href=\"https://tellyouwhat.cn/\">tellyouwhat.cn</a>",
        counter: 0,
      }
    },
    methods: {
      showMoreInfo() {
        if (this.counter % 2 === 0) {
          this.copyrightMessage = "Copyright &copy; HarborZeng\n" +
            "      <a href=\"https://tellyouwhat.cn/\">tellyouwhat.cn</a>" + "<br/>这个webapp是纯前端项目，存储成绩和信息用localStorage，gradeapi是透明代理，点击退出、清除浏览器缓存和隐身模式均可保护自己的信息安全"
        } else {
          this.copyrightMessage = "Copyright &copy; HarborZeng\n" +
            "      <a href=\"https://tellyouwhat.cn/\">tellyouwhat.cn</a>"
        }
        this.counter++
      }
    }
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

  .footer {
    max-width: 100%;
  }

  .a-show-underline {
    text-decoration: underline;
  }
</style>
