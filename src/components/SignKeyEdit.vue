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
      <span>token</span>
      <a-input v-model="token" :read-only="updateMode" />
      <span>密钥</span>
      <a-input v-model="signKey" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class SignKeyEdit extends Vue {
  @Prop({ default: false })
  visible!: boolean;

  @Prop({ default: false })
  updateMode!: boolean;

  @Prop({ default: null })
  data!: { [key: string]: string };

  @Action updateSignkey!: (sk: { [key: string]: string }) => void;
  @Action addSignkey!: (sk: { [key: string]: string }) => void;

  private confirmLoading = false;
  private token = '';
  private signKey = '';

  @Watch('visible')
  onVisibleChange(val: boolean) {
    if (val) {
      if (this.updateMode) {
        this.token = this.data.token;
      }
      this.confirmLoading = false;
      this.signKey = '';
    }
  }

  get disableOK(): boolean {
    return !this.verify();
  }

  async update() {
    if (this.signKey != this.data.signKey) {
      this.confirmLoading = true;
      await this.updateSignkey({ token: this.token, signKey: this.signKey });
      this.confirmLoading = false;
    }
  }

  async add() {
    const sk = {
      token: this.token,
      signKey: this.signKey,
    };
    this.confirmLoading = true;
    await this.addSignkey(sk);
    this.confirmLoading = false;
  }

  verify() {
    return this.simpleVerify([this.token, this.signKey]);
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
