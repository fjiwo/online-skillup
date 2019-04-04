<template>
  <div @mouseleave="$data.isShown = false" class="menu">
    <p @mouseover="$data.isShown = true">
      <span>参加人数： {{ $props.userNum }}▼</span>
    </p>
    <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    :css="false"
    >
      <ul v-if="$data.isShown">
        <li v-for="item in $props.userList" :key="item">
          <a href="#" class="menu-item"> {{ item }} </a>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import VueTypes from 'vue-types';
import anime from 'animejs';
export default {
  props: {
    userNum: VueTypes.integer.isRequired,
    userList: VueTypes.array.isRequired
  },
  data() {
    return {
      isShown: false
    };
  },
  methods: {
    beforeEnter: function(el) {
      el.style.height = '0px';
      el.style.pacity = '0';
    },
    enter: function(el, done) {
      anime({
        targets: el,
        opacity: 1,
        height: el.scrollHeight + 'px',
        duration: 3000,
        complete: done
      });
    },
    leave: function(el, done) {
      anime({
        targets: el,
        opacity: 0,
        height: '0px',
        duration: 300,
        complete: done
      });
    }

  }
};
</script>
<style lang="scss" scoped>
//
</style>
