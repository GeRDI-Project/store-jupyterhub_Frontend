<template>
  <div class="hello">
    <h2>Store - GeRDI Jupyter Hub</h2>
    <div class="progress-display">
      <h4>Copying Datasets...</h4>
      <b-list-group>
        <download-item v-for="data in progressData" :title="data.fileName" :progress="data.progressInPercent" :state="data.state" :key="data.fileName"/>
      </b-list-group>
    </div>
    <b-modal ref="errStore" hide-footer title="Error">
      <div class="d-block text-center">
        <h3>Something went wrong...</h3>
        Please go back and try again.
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="back">Go back.</b-btn>
    </b-modal>
    <b-modal ref="finishedStore" title="Store process finished" :ok-only="true" ok-title="Go back to Bookmark" @ok="ok">
      Following data sets were stored on the WebDAV storage:
      <ul>
        <li v-for="data in progressData">{{ data.fileName.split('/').pop() }}</li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Overview',
  data () {
    return {
      progressData: [],
      interval: {}
    }
  },
  created() {
    var id = this.$route.params.sessionId
    let url = '/api/v1/store-jhub/copy/' + id
    if(this.$route.query.dir) url += ('?dir=' + this.$route.query.dir)
    axios.get(url)
      .catch(function(error) {
        console.error(error)
      });
    this.interval = window.setInterval(this.load, 1000)
  },
  watch: {
    '$route.params.sessionId': 'load',
  },
  methods: {
    load() {
      const self = this
      var id = this.$route.params.sessionId
      axios.get('/api/v1/store-jhub/progress/' + id)
      .then(function(response) {
        self.progressData = response.data
        if (response.data.reduce((a, b) => a && (b.state == 'FINISHED' || b.state == 'ERROR') ,true) == true) {
          self.stopInterval()
          self.$refs.finishedStore.show()
        }
      })
      .catch(function(error) {
        //self.errMsg = error.response;
        console.error(error)
        self.stopInterval()
        self.$refs.errStore.show()
      });
    },
    back() {
      this.$refs.errStore.hide()
      window.history.back()
    },
    stopInterval() {
      window.clearInterval(this.interval)
    },
    ok() {
      window.location='/bookmark'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello {
  margin-top: 1rem;
}

.progress-display {
  margin-top: 2rem;
}

</style>
