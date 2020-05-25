<template>
    <div class="page-container">
        <Toolbar />
    <md-app md-waterfall md-mode="fixed">
      <md-app-drawer md-permanent="full" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>
        <Drawer />
      </md-app-drawer>

      <md-app-content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.</p>
        <div id="container">
          <DrawingArea />
        </div>

      </md-app-content>
    </md-app>

    </div>

</template>

<script lang="ts">
    import Toolbar from "./components/Toolbar.vue";
    import DrawingArea from "./components/DrawingArea.vue";
    import Drawer from "./components/Drawer.vue";
    import { Component, Vue } from "vue-property-decorator";
    import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
    import 'vue-material/dist/vue-material.min.css'
    import 'vue-material/dist/theme/default.css'
    import VueMaterial from 'vue-material'
    Vue.use(MdButton)
    Vue.use(MdContent)
    Vue.use(MdTabs)
    Vue.use(VueMaterial)

    @Component({
      components: {
        Toolbar,
        DrawingArea,
        Drawer
      }
    })

    class App extends Vue {
      private name: string = "TEST";
      mounted() {
        console.log("I was mounted");
      }
    }
    export default App;
</script>
