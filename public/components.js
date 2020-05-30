


Vue.component('my-counter', {
    data: function () {
        return {
        count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

Vue.component('my-header', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<h3>I am a header</h3>'
});

Vue.component('my-footer', {
    data: function () {
      return {
        count: 0
      }
    },
    template: `
    <div class="footer" id="f">
        <div align="center">© 2020 You · <a href="https://twitter.com/richanderson" class="footer_a" target="_social">Twitter</a> 
    </div>
          `
});



