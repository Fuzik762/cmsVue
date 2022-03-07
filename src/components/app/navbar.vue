<template lang="pug">
.navbar-fixed
  nav
    .nav-wrapper.light-blue.darken-4
      .date-time {{dateFilter(date, 'datetime')}}
      span.balance Ваш баланс: {{userBalance}} Р
      a.sidenav-trigger(href='#' data-target='mobile-demo')
        i.material-icons menu
      ul.right.hide-on-med-and-down
        li
          router-link(to="/tasks") Задачи
        li
          router-link(to="/finance") Финансы
  ul#mobile-demo.sidenav(ref='mobilenav')
    li
      router-link(to="/tasks") Задачи
    li
    router-link(to="/finance") Финансы
</template>

<script> 
export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      mobilenav: null,
    }
  },
  computed: {
    userBalance() {
      return this.$store.getters.info.balance
    }
  },
  methods: {
    dateFilter(value, format = 'date') {
      const options = {}
    if(format.includes('date')) {
      options.weekday = 'short'
      options.day = '2-digit'
      options.month = 'long'
      options.year = 'numeric'
    }

    if(format.includes('time')) {
      options.hour = '2-digit'
      options.minute = '2-digit'
      options.second = '2-digit' 
    }

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    },
  },
  mounted() {
    this.mobilenav = M.Sidenav.init(this.$refs.mobilenav, {

    })
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style lang='scss' scoped> 
  .date-time {
    display: inline;
  }
  .balance {
    margin-left: 50px;
  }
  .nav-wrapper {
    padding: 0px 60px;
  }
</style>