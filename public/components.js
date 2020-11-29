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
        active: "",
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
                <a href="index.html">Your Site Logo Here
                </a>
            </div>
            <nav class="header-nav" role="navigation">
                <div>
                    <ul class="header-nav">
                        <li>
                            <a href="index.html" v-bind:class="active == 'index' ? 'header_a_selected' : 'header_a' ">About</a>
                        </li>
                        <li>
                            <a href="agenda.html"  v-bind:class="active == 'agenda' ? 'header_a_selected' : 'header_a' ">Schedule</a>
                        </li>
                        <li>
                            <a href="speakers.html" v-bind:class="active == 'speakers' ? 'header_a_selected' : 'header_a' ">Speakers</a>
                        </li>
                        <li>
                            <a href="news.html"  v-bind:class="active == 'news' ? 'header_a_selected' : 'header_a' ">News</a>
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
        <div align="center">© 2020 You · <a href="https://twitter.com/richanderson" class="footer_a" target="_social">Twitter</a></div>
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
            name: "bob anderson",
            sessions: []
        }
      }
    },
    methods: {

        getSpeakerSessions: function() {
            // find all of the sessions for the current speaker
            var speakerSessions = [];

            if (this.current.speakerInfo === null)
                return;

            app.agenda.day1.sessions.forEach(session => {
                if (session.speaker === this.current.speakerInfo.name) {
                    speakerSessions.push(session);    
                    session.day = "Day 1";
                }
            });

            this.current.sessions = speakerSessions;
        },
        show: function() {
            this.hidden = false;
            this.getSpeakerSessions();
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
            
            <div v-if="current.sessions.length >0"> 
                <div v-for="(session,index) in current.sessions" >
                    <div style="padding-top:30px; padding-left:20px; max-width:800px">
                       <div style="color:grey; font-size:.8em; display:block;">{{session.day}}</div>
                      <div style="color:white; font-size:1.5em; display:block;">{{session.title }}</div>
                      <div style="color:grey; font-size:.8em; display:block;">track: {{session.track}}</div>
                      <div v-if="session.description1" style="color:#bbbbbb; padding-top:20px; font-weight:400;">{{session.description1}}</div>
                      <div v-if="session.description2" style="color:#bbbbbb; padding-top:20px;">{{session.description2}}</div>
                      <div v-if="session.description3" style="color:#bbbbbb; ;padding-top:20px;">{{session.description3}}</div>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </header>
          `
});