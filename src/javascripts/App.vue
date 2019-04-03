<template>
  <div>
    <div class="header">
      <p>
        <img class="logo" src="../images/logo.jpg" alt="ロゴ">
        <span class="sample">チャット</span>
      </p>
    </div>
    <div class="container" style="overflow:auto; height:87vh;">
      <MyComponent :messages="$data.messages" :username="$data.username" />
    </div>
    <footer class="footer">
      <div class="container">
        <form  class="form-container" @submit="onSubmit">
          <input class="message" v-model="$data.text" type="text" >
          <button class="btn btn-primary submit" type="submit" >送信</button>
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
      text: '',
      username: 'aaaa'
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

    // ユーザ名の設定
    const inputedUserName = window.prompt('ユーザ名を入力してください。', '');
    if (inputedUserName.length === 0) {
      this.username = '名無し';
    } else {
      this.username = inputedUserName;
    }
  },

  methods: {
    /**
     * Enterボタンを押したとき
     */
    onSubmit(e) {
      e.preventDefault();
      socket.emit('send', { text: this.$data.text, user: this.$data.username });
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
