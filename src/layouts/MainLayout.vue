<template lang='pug'>
.main-layout
  nav
    .nav-wrapper
      a.brand-logo(href='#!') Logo
      a.sidenav-trigger(href='#' data-target='mobile-demo')
        i.material-icons menu
      ul.right.hide-on-med-and-down
        li
          a.sidenav-trigger(href='#' data-target='slide-out') Hello
        li
          a(href='badges.html') Components
        li
          a(href='collapsible.html') Javascript
        li
          a(href='mobile.html') Mobile
  ul#mobile-demo.sidenav(ref='mobilenav')
    li
      a.sidenav-trigger(href='#' data-target='slide-out') Hello
    li
      a(href='badges.html') Components
    li
      a(href='collapsible.html') Javascript
    li
      a(href='mobile.html') Mobile
  ul#slide-out.sidenav.sidebar(ref='sidenav')
    li
      .user-view
        .background
          img(src='images/office.jpg')
        a(href='#user')
          img.circle()
        a(href='#name')
          span.white-text.name John Doe
        a(href='#email')
          span.white-text.email jdandturk@gmail.com
    li
      a(href='#!')
        i.material-icons cloud
        | First Link With Icon
    li
      a(href='#!') Second Link
    li
      .divider
    li
      a.subheader Subheader
    li
      a.waves-effect(href='#!') Third Link With Waves
  router-view
</template>

<script>
export default {
  name: 'mainLayout',
  mounted() {
    M.Sidenav.init(this.$refs.sidenav, {

    });
    M.Sidenav.init(this.$refs.mobilenav, {

    });
  }
}
</script>

<style lang="scss">
  .sidebar {
    display: block;
  }
</style>