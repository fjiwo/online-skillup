<template>
  <div>
    <div class="header">
      <p>
        <img class="logo" src="../images/logo.jpg" alt="ロゴ">
        <span class="sample">チャット</span>
      </p>
      <UserListComponent :userNum="$data.userNum" :userList="$data.userList"/>
    </div>
    <div class="container" style="overflow:auto;">
      <MyComponent :messages="$data.messages" :username="$data.username" />
    </div>
    <footer class="footer">
      <div class="container">
        <form  class="form-container" @submit="onSubmit">
          <input class="message" v-model="$data.text" type="text" >
          <button class="submit btn btn-primary" type="submit" >送信</button>
        </form>
      </div>
    </footer>
  </div>
</template>

<script>
import socket from './utils/socket';

// components
import MyComponent from './components/MyComponent.vue';
import UserListComponent from './components/UserListComponent.vue';

export default {
  components: {
    MyComponent,
    UserListComponent
  },
  data() {
    return {
      messages: [],
      text: '',
      username: 'aaaa',
      userNum: 0,
      userList: []
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
    // メッセージの初期化
    socket.on('init', (messageList) => {
      this.$data.messages = messageList;
    });
    // 参加人数の更新
    socket.on('userNum', (num) => {
      this.$data.userNum = num;
    });
    // 参加ユーザ名の取得
    socket.on('join', (name) => {
      console.log(name, 'さんが参加しました。');
      this.$data.userList.push(name);
    });
    // 退出ユーザ名の取得
    socket.on('leave', (name) => {
      console.log(name, 'さんが退出しました。');
      for (let i = 0; i < this.$data.userList.length; i++) {
        if (this.$data.userList[i] === name) {
          this.$data.userList.splice(i, 1);
          break;
        }
      }
    });

    // ユーザ名の設定
    const inputedUserName = window.prompt('ユーザ名を入力してください。', '');
    if (inputedUserName == null || inputedUserName.length === 0) {
      this.username = '名無し';
    } else {
      this.username = inputedUserName;
    }
    socket.emit('join', this.username);
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
