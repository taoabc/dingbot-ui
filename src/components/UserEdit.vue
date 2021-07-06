<template>
  <div>
    <a-modal
      :visible="visible"
      title="用户信息"
      :ok-button-props="{ props: { disabled: disableOK } }"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <span>gitlab帐号</span>
      <a-input v-model="userName" :read-only="updateMode" />
      <span>gitlab邮箱</span>
      <a-input v-model="userEmail" />
      <span>姓名</span>
      <a-input v-model="realName" />
      <span>git.user</span>
      <a-input v-model="authorName" />
      <span>git.email</span>
      <a-input v-model="authorEmail" />
      <span>电话</span>
      <a-input v-model="phone" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class UserEdit extends Vue {
  @Prop({ default: false })
  visible!: boolean;

  @Prop({ default: false })
  updateMode!: boolean;

  @Prop({ default: null })
  data!: { [key: string]: string };

  @Action updateEmployee!: (emp: { [key: string]: string }) => void;
  @Action addEmployee!: (emp: { [key: string]: string }) => void;

  private ModalText = 'Content of the modal';
  private confirmLoading = false;
  private userName = '';
  private userEmail = '';
  private authorName = '';
  private authorEmail = '';
  private realName = '';
  private phone = '';

  @Watch('visible')
  onVisibleChange(val: boolean) {
    if (val) {
      if (this.updateMode) {
        this.userName = this.data.userName;
        this.userEmail = this.data.userEmail;
        this.authorName = this.data.authorName;
        this.authorEmail = this.data.authorEmail;
        this.realName = this.data.realName;
        this.phone = this.data.phone;
      } else {
        this.userName = '';
        this.userEmail = '';
        this.authorName = '';
        this.authorEmail = '';
        this.realName = '';
        this.phone = '';
      }
      this.confirmLoading = false;
    }
  }

  get disableOK(): boolean {
    return !this.verify();
  }

  async update() {
    const allField = [
      // 'userName',
      'userEmail',
      'authorName',
      'authorEmail',
      'realName',
      'phone',
    ];
    let changed = false;
    const info: { [key: string]: string } = { userName: this.userName };
    for (const field of allField) {
      if (this.$data[field] != this.data[field]) {
        info[field] = this.$data[field];
        changed = true;
      }
    }
    if (changed) {
      this.confirmLoading = true;
      await this.updateEmployee(info);
      this.confirmLoading = false;
    }
  }

  async add() {
    const emp = {
      userName: this.userName,
      userEmail: this.userEmail,
      authorName: this.authorName,
      authorEmail: this.authorEmail,
      realName: this.realName,
      phone: this.phone,
    };
    this.confirmLoading = true;
    await this.addEmployee(emp);
    this.confirmLoading = false;
  }

  verify() {
    return this.simpleVerify([
      this.userName,
      this.userEmail,
      this.authorName,
      this.authorEmail,
      this.realName,
      this.phone,
    ]);
  }

  simpleVerify(str: string[] | string) {
    let strArr = str;
    if (!Array.isArray(str)) {
      strArr = [str];
    }
    let ok = true;
    for (const s of strArr) {
      if (s.length === 0) {
        ok = false;
        break;
      }
    }
    return ok;
  }

  @Emit('ok')
  handleOk() {
    if (this.updateMode) {
      return this.update();
    }
    return this.add();
  }

  @Emit('cancel')
  handleCancel() {
    //
  }
}
</script>
