


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


Vue.component('my-header', {
    props: ['active'],
    data: function () {
      return {
        active: 0
      }
    },
    template: `
    <header class="header">
        <div class="header-content">
            <div class="header-logo">
                <a href="/">
                    <img src="images/logo.jpeg">
                </a>
            </div>
            <nav class="header-nav" role="navigation">
                <div>
                    <ul class="header-nav">
                        <li>
                            <a href="/index.html" v-bind:class="active == 0 ? 'header_a_selected' : 'header_a' ">Welcome</a>
                        </li>
                        <li>
                            <a href="/agenda.html"  v-bind:class="active == 1 ? 'header_a_selected' : 'header_a' ">Agenda</a>
                        </li>
                        <li>
                            <a href="/news.html"  v-bind:class="active == 2 ? 'header_a_selected' : 'header_a' ">News</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="header-updates">
                <a class="header_a" href="/#subscribe" data-ga-click="Top nav, click, cta_text: open Subscribe modal">
                    <span>Subscribe for Updates</span>
                </a>
		    </div>
        </div>
    </header>
          `
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



