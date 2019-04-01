<template>
  <div>
    <div class="container" style="overflow:auto; height:93vh;">
      <p>
        <img class="logo" src="../images/logo.jpg" alt="ロゴ">
        <span class="sample">チャット</span>
      </p>
      <MyComponent :messages="$data.messages" />
    </div>
    <footer class="footer">
      <div class="container">
        <form  class="form-inline" @submit="onSubmit">
          <input class="form-control" v-model="$data.text" type="text" >
          <button class="btn btn-primary" type="submit" >送信</button>
        </form>
      </div>
    </footer>
  </div>
</template>

<script>
import socket from './utils/socket';

// components
import MyComponent from './components/MyComponent.vue';

export default {
  components: {
    MyComponent
  },
  data() {
    return {
      messages: [],
      text: ''
    };
  },
  created() {
    socket.on('connect', () => {
      console.log('connected!');
    });
    socket.on('send', (message) => {
      console.log(message);
      this.$data.messages.push(message);
    });
    socket.on('init', (messageList) => {
      this.$data.messages = messageList;
    });
  },
  methods: {
    /**
     * Enterボタンを押したとき
     */
    onSubmit(e) {
      e.preventDefault();
      socket.emit('send', { text: this.$data.text, user: 'aaa' });
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
}

.sample {
  color: $red;
}
</style>
