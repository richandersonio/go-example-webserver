Vue.component('my-counter', {
    data: function () {
        return {
        count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});


Vue.component('my-header', {
    props: ['active'],
    data: function () {
      return {
        active: 0,
        editMode: false,
        editForm: {
            name: '',
            email: ''
        }
      }
    },
    methods: {

        onSave: function() {
          //  alert('on save');
            this.editMode = false;
            alert('Thanks for subscribing!')
        },
        onSubscribe: function() {
            this.editMode = true;
  
            // wait for the edit form to be visible then select the first
            Vue.nextTick(() => {
                var editName = document.getElementById("edit_name");
                editName.focus();
            });
        },
        onCancel: function() {
          this.editMode = false;
        }
    },
    template: `
    <header class="header">
        <div class="header-content">
            <div class="header-logo">
                <a href="index.html">
                    <img src="images/gptconnect.jpeg" width="96%" >
                </a>
            </div>
            <nav class="header-nav" role="navigation">
                <div>
                    <ul class="header-nav">
                        <li>
                            <a href="index.html" v-bind:class="active == 0 ? 'header_a_selected' : 'header_a' ">Welcome</a>
                        </li>
                        <li>
                            <a href="agenda.html"  v-bind:class="active == 1 ? 'header_a_selected' : 'header_a' ">Agenda</a>
                        </li>
                        <li>
                            <a href="news.html"  v-bind:class="active == 2 ? 'header_a_selected' : 'header_a' ">News</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="header-updates">
                <a class="header_a" v-on:click="onSubscribe">
                    <span style="font-size:.8em">Subscribe</span>
                </a>
		    </div>
        </div>
        <div class="modal" v-if="editMode">
        <div class="modal-content fade-in">
            <h1>Get notifications</h1>
            <form name="editForm" type="none">
                <div style="padding-bottom: 10px;"><span style="float:left; width: 80px;">Name:</span><span><input style="width:80%;" type="text" id="edit_name" name="name" v-model="editForm.name"  required /></span></div>
                <div style="padding-bottom: 10px;"><span style="float:left; width: 80px;">Email:</span><span><input style="width:80%;" type="text" id="edit_email" name="email" v-model="editForm.email"  required /></span></div>
                <button class="richbutton" v-on:click="onSave">Save</button>
                <button class="richbutton2nd" v-on:click="onCancel">Cancel</button>
            </form>
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

Vue.component('my-speakerinfo', {
    props: ['active'],
    data: function () {
      return {
        hidden: true,
        current: {
            speakerInfo: null,
            name: "bob anderson"
        }
      }
    },
    methods: {

        show: function() {
            this.hidden = false;
        },
        hide: function() {
          this.hidden = true;
        },
        next: function() {

        },
        prev: function() {

        }
    },
    template: `
        <div class="modal_solid std_background_color" v-if="!hidden">
        <div >
            <nav class="modal-controls" style="padding-top:0px; padding-left:20px;">
                <div style="display: flex; justify-content: flex-end">
                    <div v-on:click="hide" style="color:grey; display:inline; font-size:2em; font-weight:100; padding-right:10px; cursor: pointer;">X</div>
                </div>
            </nav>
        
            <div style="padding-top:10px; padding-left:20px;">
                <img  v-if="current.speakerInfo != null && current.speakerInfo.image != null" v-bind:src="current.speakerInfo.image" class="circleLarge"/>
                <div v-if="current.speakerInfo != null && current.speakerInfo.name != null" style="color:white; font-size:1.8em;">{{current.speakerInfo.name}}</div>
                <div v-if="current.speakerInfo != null && current.speakerInfo.title != null" style="color:grey;font-size:.8em;">{{current.speakerInfo.title}}</div>
                <div v-if="current.speakerInfo != null && current.speakerInfo.bio != null" style="padding-top:10px; color:white;">{{current.speakerInfo.bio}}</div>
            </div>
        </div>
      </div>
    </header>
          `
});
