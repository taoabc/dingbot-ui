<template>
  <div>
    <SignKeyEdit
      :visible="editVisible"
      @ok="hideEdit"
      @cancel="hideEdit"
      :data="editItem"
      :updateMode="updateMode"
    />
    <div class="add-div">
      <a class="add-icon" @click="onAddClick">
        <a-icon type="file-add" />
        添加密钥
      </a>
    </div>
    <a-table :columns="columns" :dataSource="data">
      <span slot="action" slot-scope="record">
        <a @click="editClick(record)">更新签名密钥</a>
        <a-divider type="vertical" />
        <a @click="removeClick(record.token)">删除</a>
      </span>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { Signkey } from '../store/type';
import { Modal } from 'ant-design-vue';
import SignKeyEdit from './SignKeyEdit.vue';

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

@Component({
  components: { SignKeyEdit }
})
export default class SignKeyList extends Vue {
  @Getter('allSignkey') data!: Signkey[];
  @Action getAllSignKey!: () => void;
  @Action removeSignkey!: (token: string) => void;

  private columns = COLUMNS;
  private editVisible = false;
  private token = '';
  private signKey = '';
  private editItem?: unknown = null;
  private updateMode = false;

  created() {
    this.getAllSignKey();
  }

  showEdit() {
    this.editVisible = true;
  }

  hideEdit() {
    this.editVisible = false;
  }

  editClick(record: unknown) {
    this.updateMode = true;
    this.editItem = record;
    this.showEdit();
  }

  removeClick(key: string) {
    const removeSignkey = this.removeSignkey.bind(this);
    Modal.confirm({
      title: `确定删除 ${key} 吗？`,
      content: null, //'确定删除用户：xxx吗？',
      onOk() {
        return removeSignkey(key);
      },
      onCancel() {
        //
      }
    });
  }

  onAddClick() {
    this.updateMode = false;
    this.showEdit();
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
