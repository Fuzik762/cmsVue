<template lang='pug'>
.grey.darken-1.auth-layout
  router-view
</template>

<script>
import messages from '@/utils/messageList'

export default {
  computed: {
    error() { 
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>

<style lang="scss" scoped>
  .auth-layout {
    background: #000; 
    height: 100vh;
  }
</style>