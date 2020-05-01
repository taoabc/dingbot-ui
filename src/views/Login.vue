<template>
  <div class="login" id="login">
    <a href="javascript:;" class="log-close"></a>
    <div class="log-bg">
      <div class="log-cloud cloud1"></div>
      <div class="log-cloud cloud2"></div>
      <div class="log-cloud cloud3"></div>
      <div class="log-cloud cloud4"></div>

      <div class="log-logo">Welcome to dingbot!</div>
      <div class="log-text">@培优线下前端组</div>
    </div>
    <!-- <a-input placeholder="用户名" allowClear />
    <a-input-password placeholder="密码" allowClear />
    <a-button type="primary">登录</a-button>-->
    <div class="log-action">
      <a-input
        class="log-input"
        placeholder="用户名"
        allowClear
        v-model="username"
      />
      <a-input-password
        class="log-input"
        placeholder="密码"
        allowClear
        v-model="password"
        @keypress.enter="login"
      />
      <a-button class="log-btn" type="primary" @click="login">登录</a-button>
      <!-- <input type="text" placeholder="Email" :class="'log-input' + (account==''?' log-input-empty':'')" v-model="account">
        <input type="password" placeholder="Password" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
      <a href="javascript:;" class="log-btn" @click="login">Login</a>-->
    </div>
    <Loading v-if="isLoging" marginTop="-30%"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Loading from '@/components/Loading.vue';

@Component({
  components: { Loading }
})
export default class Login extends Vue {
  @Getter isLogged!: boolean;

  private isLoging = false;
  private username = '';
  private password = '';

  @Watch('isLogged')
  onLoggedChange(val: boolean) {
    console.log('logged changed', val);
    if (val) {
      this.$router.push('/');
    }
  }

  login() {
    if (this.username !== '' && this.password !== '') {
      this.$store.dispatch('login', {
        uid: this.username,
        password: this.password
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  position: fixed;
  overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -350px;
  width: 500px;
  min-height: 555px;
  z-index: 10;
  right: 140px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 3px 16px -5px #070707;
  box-shadow: 0px 3px 16px -5px #070707;
}
.log-action {
  text-align: center;
  margin-top: 20px;
}
.log-input {
  height: 48px;
  width: 370px;
  margin: 0 auto 15px;
}
.log-btn {
  display: block;
  margin: auto;
  height: 43px;
  width: 370px;
}
.log-close:hover .icons {
  transform: rotate(180deg);
}
.log-close .icons {
  opacity: 1;
  transition: all 0.3s;
}
.log-cloud {
  background-image: url(../assets/login-cloud.png);
  width: 63px;
  height: 40px;
  position: absolute;
  z-index: 1;
}
.login .cloud1 {
  top: 21px;
  left: -30px;
  transform: scale(0.6);
  animation: cloud1 20s linear infinite;
}
.login .cloud2 {
  top: 87px;
  right: 20px;
  animation: cloud2 19s linear infinite;
}
.login .cloud3 {
  top: 160px;
  left: 5px;
  transform: scale(0.8);
  animation: cloud3 21s linear infinite;
}
.login .cloud4 {
  top: 150px;
  left: -40px;
  transform: scale(0.4);
  animation: cloud4 19s linear infinite;
}
.log-bg {
  background: url(../assets/login-bg.jpg);
  width: 100%;
  height: 312px;
  overflow: hidden;
}
.log-logo {
  height: 80px;
  margin: 120px auto 25px;
  text-align: center;
  color: #1fcab3;
  font-weight: bold;
  font-size: 40px;
}
.log-text {
  color: #57d4c3;
  font-size: 13px;
  text-align: center;
  margin: 0 auto;
}
.log-logo,
.log-text {
  z-index: 2;
}
.close {
  height: 16px;
  width: 16px;
  background-position: -13px 0;
}
.isloading {
  background: #d6d6d6;
}

@-webkit-keyframes cloud1 {
  0% {
    left: 200px;
  }
  100% {
    left: -130px;
  }
}
@keyframes cloud1 {
  0% {
    left: 200px;
  }
  100% {
    left: -130px;
  }
}

@-webkit-keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}
@keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}

@-webkit-keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}
@keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}
@-webkit-keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}
@keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}
</style>
