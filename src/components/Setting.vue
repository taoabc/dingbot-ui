<template>
  <span>敬请期待</span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Setting extends Vue {
  created() {
    console.log('setting created');
  }
}
</script>
