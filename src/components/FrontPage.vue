<template>
  <div class="start_page">
    <div class="title">
      <transition name="animate__animated animate__bounce" appear enter-active-class="animate__backInDown">
        <h1 key="text">欢迎来到剧本杀平台,为剧本杀爱好者提供全面的一站式服务</h1>
      </transition>
    </div>
    <div class="image_container">
      <ul>
        <li><img src="../assets/images/drama1.jpeg" alt="图片加载失败" key="drama1"></li>
        <li><img src="../assets/images/drama2.jpeg" alt="图片加载失败" key="drama2"></li>
        <li><img src="../assets/images/drama3.jpeg" alt="图片加载失败" key="drama3"></li>
        <li><img src="../assets/images/drama1.jpeg" alt="图片加载失败" key="drama4"></li>
        <li><img src="../assets/images/drama2.jpeg" alt="图片加载失败" key="drama5"></li>
        <li><img src="../assets/images/drama3.jpeg" alt="图片加载失败" key="drama6"></li>
      </ul>
    </div>
    <div class="footer">
      <p>版权所有&nbsp;@高分项</p>
      <p>制作时间:&nbsp;2022年9月-2022年11月</p>
      <p>欢迎报考东南大学软件学院</p>
    </div>
  </div>
</template>

<script>
  import 'animate.css'
  export default {
    name: 'StartPage',
  }
</script>

<style scoped>
  ul {
    list-style: none;
  }

  ul li {
    float: left;
  }

  .start_page {
    height: 90%;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .image_container {
    width: 100%;
    height: 50%;
    text-align: center;
    overflow: hidden;
    margin-top: 1rem;
  }

  .image_container:hover ul {
    animation-play-state: paused;
  }

  .image_container img {
    width: 6rem;
    height: 6rem;
    margin-top: .625rem;
  }

  .image_container ul {
    width: 200%;
    animation: move 5s linear 1.5s infinite;
  }

  .title {
    width: 100%;
    flex: 2;
    text-align: center;
  }

  .title h1 {
    margin-top: 1.25rem;
    font-size: 36px;
    line-height: 1;
  }

  .footer {
    width: 100%;
    flex: 2;
    text-align: center;
    margin-top: 0.25rem;
    font-size: 14px;
    line-height: .625rem;
  }

  @keyframes move {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-18rem);
    }
  }
</style>