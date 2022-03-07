<template lang='pug'>
<Navbar />
.main-content
  <Sidebar />
  .render-page
    router-view
  <FloatButton />
  
</template>

<script>
import messages from '@/utils/messageList'
import Navbar from '@/components/app/navbar.vue'
import Sidebar from '@/components/app/sidebar.vue'
import FloatButton from '@/components/app/floatbtn.vue'

export default {
  name: 'mainLayout',
  components: {Navbar, Sidebar, FloatButton},
  computed: {
    error() { 
      return this.$store.getters.error
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
}
</script>

<style lang="scss">
  .render-page { 
    padding: 0 50px;
    width: calc(100% - 100px);
    margin-left: 300px;
  }
  .main-content {
    display: flex;
  }
</style>