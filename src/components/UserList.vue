<template>
  <a-table :columns="columns" :dataSource="allEmployee">
    <template v-slot:action>
      <a>编辑</a>
      <a-divider type="vertical" />
      <a>删除</a>
    </template>
  </a-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';
const USER_COLUMNS = [
  {
    title: '姓名',
    dataIndex: 'realName'
  },
  {
    title: 'gitlab帐号名',
    dataIndex: 'authorName'
  },
  {
    title: 'gitlab邮箱',
    dataIndex: 'authorEmail'
  },
  {
    title: 'git.user',
    dataIndex: 'userName'
  },
  {
    title: 'git.email',
    dataIndex: 'userEmail'
  },
  {
    title: '电话',
    dataIndex: 'phone'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
];

@Component({
  computed: { ...mapGetters(['allEmployee']) },
  methods: { ...mapActions(['getAllEmployee']) }
})
export default class UserList extends Vue {
  private data = [];
  private columns = USER_COLUMNS;

  created() {
    console.log('haha');
    this.getAllEmployee();
  }
}
</script>
