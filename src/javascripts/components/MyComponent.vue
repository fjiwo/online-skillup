<template>
  <div id="message-contents">
      <template v-for="item in $props.messages">
        <div class="message-wrapper">
          <div class="box" v-bind:class="{'mymessage' : item.user == username}">
            <div class="content">
              <p>
                <strong>{{item.user}}</strong>
                <br />
                {{item.text}}
              </p>
             </div>
          </div>
        </div>
      </template>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    messages: VueTypes.array.isRequired,
    username: VueTypes.string.isRequired
  },
  watch: {
    // メッセージ更新時にスクロール
    messages: function() {
      this.$nextTick(() => this.scroll());
    }
  },
  methods: {
    scroll() {
      const container = document.querySelector('#message-contents');
      container.scrollIntoView(false);
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>
