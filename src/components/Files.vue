<template>
  <div>
    <wait class="wait-logo"/>
    <h3 class="text-center">Setting up your Jupyter Hub storage</h3>
    <ul class="list-unstyled multi-steps">
      <li :class="{ 'is-active': step == 0 }">Login</li>
      <li :class="{ 'is-active': step == 1 }">Create Storage</li>
      <li :class="{ 'is-active': step == 2 || step == 3 }">Select Location</li>
      <li :class="{ 'is-active': step == 4 || step == 5 }">Copy Files</li>
    </ul>
    <div v-if="step == 0">
      <h5>You are being logged in into the storage provider right now.</h5>
    </div>
    <div v-if="step == 1">
      <h5>Waiting for your storage space to be created.</h5>
    </div>
    <div v-if="step == 2 || step == 3">
      <h5>Please select a location where all files should be copied to.</h5>
      <transition appear v-on:after-leave="leftSelect" name="fade">
        <file-list v-if="step == 2" class="files-display"></file-list>
      </transition>
    </div>
    <div v-if="step == 4 || step == 5">
      <h5>The selected files are being copied to your storage space.</h5>
      <transition appear name="fade" v-on:after-leave="leftOverview">
        <overview v-if="step == 4" class="files-display"></overview>
      </transition>
    </div>
    <div v-if="step == 6" class="text-center">
      <h5>All selected files have been successfully copied to your storage space.</h5>
      <transition appear name="fade">
        <div v-if="step == 6" class="files-display">
          <b-button href="/bookmark" variant="link" @click="ok()">Go Back to Bookmark</b-button>
          <b-button variant="outline-primary" @click="openJupyter()">Open your Jupyter Notebook</b-button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import usercookie from '../util/usercookie.js'

export default {
  name: 'Files',
  data () {
    return {
      windowRef: {},
      overlay: false,
      retries: 0
    }
  },
  computed: {
    path: function() {
      if (this.$route.query.dir) {
        let arr = this.$route.query.dir.split("/").filter(it => it.length > 0)
        return arr
      }
      return []
    },
    sortedFiles: function() {
      return this.$store.getters.getFilesList
    },
    files: function() {
      return this.$store.getters.getFilesList
    },
    loading: function() {
        return this.$store.getters.isLoading
    },
    error: function() {
        return this.$store.getters.hasError
    },
    step: function() {
        return this.$store.getters.getCurrentStep
    }
  },
  watch: {
    '$route.query': "load"
  },
  methods: {
    load() {
      let id = this.$route.params.sessionId
      let dir = this.$route.query.dir
      this.$store.dispatch('load', {
        sessionId: id,
        dir: dir
      })
    },
    login() {
      let self = this
      let id = this.$route.params.sessionId
      this.$store.dispatch('load', {
        sessionId: id
      })
    },
    leftSelect: function() {
      this.$store.commit('leftSelect')
    },
    leftOverview: function() {
      this.$store.commit('leftOverview')
    },
    ok() {
      window.location='/bookmark'
    },
    openJupyter() {
      window.location='/analyze/user/' + usercookie.getUsername() + '/tree'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$brand-primary: #083f64;
$white: #fff;
$grey-light: #ededed;
%remain-steps{
  &:before {
    content: counter(stepNum);
    font-family: inherit;
    font-weight: 700;
  }
  &:after{
    background-color: $grey-light;
  }
}
.multi-steps{
  display: table;
  table-layout: fixed;
  width: 100%;
  margin: 2rem auto 2rem;
  > li{
    counter-increment: stepNum;
    text-align: center;
    display: table-cell;
    position: relative;
    color: $brand-primary;

    &:before{
      content: '\f00c';
      content: '\2713;';
      content: '\10003';
      content: '\10004';
      content: '\2713';
      display: block;
      margin: 0 auto 4px;
      background-color: $white;
      width: 36px;
      height: 36px;
      line-height: 32px;
      text-align: center;
      font-weight: bold;
      border:{
        width: 2px;
        style: solid;
        color: $brand-primary;
        radius: 50%;
      }
    }
    &:after{
      content: '';
      height: 2px;
      width: 100%;
      background-color: $brand-primary;
      position: absolute;
      top: 16px;
      left: 50%;
      z-index: -1;
    }
    &:last-child{
      &:after{
        display: none;
      }
    }

    &.is-active{
      @extend %remain-steps;
      &:before{
        background-color: $white;
        border-color: $brand-primary;
      }

      ~ li{
        color: #808080;
        @extend %remain-steps;
        &:before{
          background-color: $grey-light;
          border-color: $grey-light;
        }
      }
    }
  }
}

.breadcrumb > li + li.ml-auto:before {
  content: none;
}

.files-display {
  margin-top: 1rem;
  margin-bottom: 2rem;
  overflow: hidden;
  max-height: 3000px;
  opacity: 1;
}

.bc-item {
  vertical-align: sub;
}

h5 {
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: max-height 2s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  max-height: 0px;
  opacity: 1;
}

.wait-logo {
    margin: auto;
    width: 100%;
    height: 200px;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

#overlay {
    position: fixed; /* Sit on top of the page content */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
}

#text{
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    text-align: center;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
}
</style>
