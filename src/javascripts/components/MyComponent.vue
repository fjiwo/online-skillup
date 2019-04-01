<template>
  <div>
    <ul class="list-group">
      <template v-for="item in $props.messages">
        <li class="list-group-item" :key="item.id">{{item.text}}</li>
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
