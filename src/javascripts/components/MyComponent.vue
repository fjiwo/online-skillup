<template>
  <div>
    <ul>
      <template v-for="item in $props.messages">
        <li :key="item.id">{{item}}</li>
      </template>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    messages: VueTypes.array.isRequired
  }
};
</script>

<style lang="scss" scoped>
//
</style>
