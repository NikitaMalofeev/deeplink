<template>
        <input v-model="new_message" /> 
        <button class="button" @click="sendMsg">Send</button>
        <div v-for="amessage in messages" :key="amessage">
      {{ amessage }}
    </div>
  </template>
  
  <script lang="ts">
  import { IonPage} from '@ionic/vue';
  import { defineComponent } from 'vue';
  import {Centrifuge} from 'centrifuge'
import test from 'node:test';

  interface IConnection {
    centrifuge: any
  }

  export default defineComponent({
    name: 'socketButton',

    data({centrifuge}: IConnection) {
    return {
      new_message: "",
      messages: [],
      centrifuge
    }
    },
    methods: {
      sendMsg() {
        const vm = this;
        this.centrifuge.publish("channel", {"msg": this.new_message}).then(function(res: any) {
          vm.new_message = ""; 
          console.log('successfully sent', res);
        }, function(err: Error) {
          console.log('send error', err);
        });
        console.log('test')


      }
  }, 
  created() {
    const vm = this;
    this.centrifuge = new Centrifuge("ws://localhost:8080/connection/websocket");
    console.log(this.centrifuge)

    this.centrifuge.on('connect', function(ctx: any) {
        console.log("connected", ctx);
    });

    this.centrifuge.on('disconnect', function(ctx: any) {
        console.log("disconnected", ctx);
    });

    // this.centrifuge.subscribe("channel", function(ctx: any) {
    //   vm.$nextTick(function () {
    //     vm.messages.push( ctx.data.msg);
    //   });
    // });

    this.centrifuge.connect();
  }
  })
  </script>


<style>
.button {
  text-align: center;
  padding: 10px;
  border-radius: 20%;
  color: white;
  text-transform: uppercase;
  background-color: green;
}
</style>

  