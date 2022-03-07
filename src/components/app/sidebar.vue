<template lang="pug">
ul.sidebar()
    li
      .user-view
        .background
          img(src='@/assets/images/default-bg-profile.jpeg')
        .user
          img.circle(src='@/assets/icons/user.png')
        p.white-text.name {{userName}}
        p.white-text.email {{userEmail}}
    //- li
    //-   a(href='#!')
    //-     i.material-icons build
    //-     | Настройки
    li.sidebar-btn
      a(@click.prevent='logout')  
        i.material-icons power_settings_new
        | Выйти
</template>

<script>
export default {
  computed: {
    userName() {
      const firstName = this.$store.getters.info.firstName
      const lastName = this.$store.getters.info.lastName
      return `${firstName} ${lastName}`
    },
    userEmail() {
      return this.$store.getters.info.email
    },
    
  },
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
    await this.$store.dispatch('getUserInfo') 
    }
  },
  beforeDestroy() {
    if(this.sidebar && this.sidebar.destroy) {
      this.sidebar.destroy()
    }
  },
  methods: {
     async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
  }
}
</script>

<style lang="scss">
  @import '~materialize-css/sass/materialize.scss';
  .sidebar {
    width: 300px;
    margin: 0;
    background-color: rgb(55, 55, 55);
    bottom: 0;
    position: fixed;
    top: 64px;
      
    &-btn {
      cursor: pointer;
    }
    
    @extend .z-depth-1;

    // Right Align
    &.right-aligned {
      right: 0;
      transform: translateX(105%);
      left: auto;
      transform: translateX(100%);
    }

    .collapsible {
      margin: 0;
    }


    li {
      float: none;
      line-height: $sidenav-line-height;

      &.active { background-color: rgba(0,0,0,.05); }
    }

    li > a {
      color: #fff;
      display: block;
      font-size: $sidenav-font-size;
      font-weight: 500;
      height: $sidenav-item-height;
      line-height: $sidenav-line-height;
      padding: 0 ($sidenav-padding * 2);

      &:hover { background-color: rgba(175, 170, 170, 0.397);}

      &.btn, &.btn-large, &.btn-flat, &.btn-floating {
        margin: 10px 15px;
      }

      &.btn,
      &.btn-large,
      &.btn-floating { color: $button-raised-color; }
      &.btn-flat { color: $button-flat-color; }

      &.btn:hover,
      &.btn-large:hover { background-color: lighten($button-raised-background, 5%); }
      &.btn-floating:hover { background-color: $button-raised-background; }

      & > i,
      & > [class^="mdi-"], li > a > [class*="mdi-"],
      & > i.material-icons {
        float: left;
        height: $sidenav-item-height;
        line-height: $sidenav-line-height;
        margin: 0 ($sidenav-padding * 2) 0 0;
        width: $sidenav-item-height / 2;
        color: rgb(255, 255, 255);
      }
    }


    .divider {
      margin: ($sidenav-padding / 2) 0 0 0;
    }

    .subheader {
      &:hover {
        background-color: transparent;
      }

      cursor: initial;
      pointer-events: none;
      color: rgba(0,0,0,.54);
      font-size: $sidenav-font-size;
      font-weight: 500;
      line-height: $sidenav-line-height;
    }

    .user-view {
      position: relative;
      padding: ($sidenav-padding * 2) ($sidenav-padding * 2) 0;
      margin-bottom: $sidenav-padding / 2;

      & > a {
        &:hover { background-color: transparent; }
        height: auto;
        padding: 0;
      }

      .background {
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        img {
          max-height: 100%;
          filter: brightness(0.6);
        }
      }

      .circle, .name, .email {
        display: block;
      }

      .circle {
        height: 64px;
        width: 64px;
      }

      .name,
      .email {
        font-size: $sidenav-font-size;
        line-height: $sidenav-line-height / 2;
      }

      .name {
        margin-top: 16px;
        font-weight: 500;
      }

      .email {
        padding-bottom: 16px;
        font-weight: 400;
      }
    }
  }


  // Touch interaction
  .drag-target {
    // Right Align
    &.right-aligned {
      right: 0;
    }

    height: 100%;
    width: 10px;
    position: fixed;
    top: 0;
    z-index: 998;
  }


  // Fixed Sidenav shown
  .sidenav.sidenav-fixed {
    // Right Align
    &.right-aligned {
      right: 0;
      left: auto;
    }

    left: 0;
    transform: translateX(0);
    position: fixed;
  }

  // Fixed Sidenav hide on smaller
  @media #{$medium-and-down} {
    .sidenav {
      &.sidenav-fixed {
        transform: translateX(-105%);

        &.right-aligned {
          transform: translateX(105%);
        }
      }

      > a {
        padding: 0 $sidenav-padding;
      }

      .user-view {
        padding: $sidenav-padding $sidenav-padding 0;
      }
    }
  }


  .sidenav .collapsible-body > ul:not(.collapsible) > li.active,
  .sidenav.sidenav-fixed .collapsible-body > ul:not(.collapsible) > li.active {
    background-color: $primary-color;
    a {
      color: $sidenav-bg-color;
    }
  }
  .sidenav .collapsible-body {
    padding: 0;
  }


  .sidenav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    height: 120vh;
    background-color: rgba(0,0,0,.5);
    z-index: 997;
    display: none;
  }
</style>
