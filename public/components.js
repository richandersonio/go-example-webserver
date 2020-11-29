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
                          <router-link to="/" exact=true class="header_a" active-class="header_a_selected">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/schedule" class="header_a" active-class="header_a_selected">Schedule</router-link>
                        </li>
                        <li>
                            <router-link to="/speakers" class="header_a" active-class="header_a_selected">Speakers</router-link>
                            </li>
                        <li>
                           <router-link to="/news" class="header_a" active-class="header_a_selected">News</router-link>
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
        <div align="center">© 2020-2021 You · <a href="https://twitter.com/richanderson" class="footer_a" target="_social">Twitter</a></div>
    </div>
          `
});