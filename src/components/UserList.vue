<template>
  <div>
    <UserEdit
      :visible="editVisible"
      @ok="editOK"
      @cancel="editCancel"
      :data="editItem"
      :updateMode="updateMode"
    />
    <div class="add-div">
      <a class="add-icon" @click="onAddClick">
        <a-icon type="user-add" />
        添加用户
      </a>
    </div>
    <a-table :columns="columns" :dataSource="allEmployee">
      <template v-slot:customTitle>
        <a-icon type="key" />
        <span>gitlab帐号</span>
      </template>
      <span slot="action" slot-scope="record">
        <a @click="editClick(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="removeClick(record.key)">删除</a>
      </span>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import UserEdit from './UserEdit.vue';
import { Modal } from 'ant-design-vue';

const USER_COLUMNS = [
  {
    dataIndex: 'userName',
    slots: { title: 'customTitle' }
  },
  {
    title: 'gitlab邮箱',
    dataIndex: 'userEmail'
  },
  {
    title: '姓名',
    dataIndex: 'realName'
  },
  {
    title: 'git.user',
    dataIndex: 'authorName'
  },
  {
    title: 'git.email',
    dataIndex: 'authorEmail'
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

@Component({ components: { UserEdit } })
export default class UserList extends Vue {
  @Getter allEmployee: unknown;
  @Action getAllEmployee!: () => void;
  @Action removeEmployee!: (userName: string) => void;

  private data = [];
  private columns = USER_COLUMNS;
  private editVisible = false;
  private removeConfirm = false;
  private editItem?: unknown = null;
  private updateMode = false;

  created() {
    this.getAllEmployee();
  }

  editClick(record: unknown) {
    this.editItem = record;
    this.updateMode = true;
    this.showEdit();
  }

  onAddClick() {
    this.updateMode = false;
    this.showEdit();
  }

  removeClick(key: string) {
    const removeEmployee = this.removeEmployee.bind(this);
    Modal.confirm({
      title: `确定删除 ${key} 吗？`,
      content: null, //'确定删除用户：xxx吗？',
      onOk() {
        return removeEmployee(key);
      },
      onCancel() {
        //
      }
    });
  }

  showEdit() {
    this.editVisible = true;
  }

  hideEdit() {
    this.editVisible = false;
  }

  editOK() {
    this.hideEdit();
  }

  editCancel() {
    this.hideEdit();
  }
}
</script>

<style scoped>
.add-div {
  text-align: right;
  margin-bottom: 5px;
  /* font-size: 16px; */
}
</style>
