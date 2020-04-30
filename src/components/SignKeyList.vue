<template>
  <a-table :columns="columns" :dataSource="data">
    <template v-slot:action>
      <a>更新签名密钥</a>
      <a-divider type="vertical" />
      <a>删除</a>
    </template>
  </a-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const COLUMNS = [
  {
    title: '机器人token',
    dataIndex: 'token'
  },

  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
];

const data3 = [
  {
    key: '1',
    token:
      'SVVva0p4MkFrK2xwYlZaYWVZR1V1TVN6cVpZNUlldmF6cDNiMGFrZ202aHVRdE5HdXJWcmErUk5WMkh5TzNvOQ'
  },
  {
    key: '2',
    token: 'da07eb9e89eb105bbd76b2512bc4d8ee8d629e80d3a942abc82fa937b4ba8c6b'
  }
];

@Component
export default class SignKeyList extends Vue {
  private data = data3;
  private columns = COLUMNS;
}
</script>
