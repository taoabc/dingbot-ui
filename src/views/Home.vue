<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider collapsible>
      <div class="logo">BOT</div>
      <a-menu
        theme="dark"
        mode="inline"
        :defaultSelectedKeys="['/user']"
        @select="onMenuSelect"
      >
        <a-menu-item key="/user">
          <a-icon type="user" />
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="/signkey">
          <a-icon type="key" />
          <span>密钥管理</span>
        </a-menu-item>
        <a-menu-item key="/setting">
          <a-icon type="setting" />
          <span>帐号设置</span>
        </a-menu-item>
        <a-menu-item key="/login">
          <a-icon type="logout" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0"></a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '360px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Loading from '@/components/Loading.vue';

@Component({
  components: { Loading }
})
export default class Login extends Vue {
  created() {
    this.$router.push('/user');
  }

  onMenuSelect({ key }: { key: string }) {
    if (key === 'logout') {
      console.log('logout');
    }
    this.$router.push(key);
  }
}
</script>

<style scoped>
#components-layout-demo-custom-trigger {
  width: 100%;
  height: 100%;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: white;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  line-height: 32px;
}
</style>
