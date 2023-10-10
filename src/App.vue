<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { defineComponent } from 'vue';
import { useRouter } from "vue-router";



export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },

  setup() {

  const router = useRouter();


  App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
 
  const slug = event.url.split('.app').pop();

  // We only push to the route if there is a slug present
  if (slug) {
    router.push({
      path: slug,
    });
  }
  
});

  } 
  })
</script>