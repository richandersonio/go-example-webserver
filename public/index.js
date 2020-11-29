var sourceOfTruth = {
    message: "",
    agenda: null
  }

const MainPage = {  
    mounted() {
        var xhr = createCORSRequest('GET', '/greeting');

        xhr.onload = (b) => {
            var resp  = JSON.parse(xhr.responseText)
            this.greeting = resp.Greeting;
         };
    
        xhr.onerror = () => {
            alert('Woops, there was an error call the greeting api.');
        };
    
        xhr.send();
    },    
    data() {

        return {
            greeting: "",
            message: "well hello",
            todos: [ "Enter a message and then hit Submit. ", "It will be sent to the server, stored on the messages list and then sent back with any previous messages" ]
        }

    },
    methods: {
        onSubmit() {
            var url = '/echo';
            var xhr = createCORSRequest('POST', url);
        
            xhr.onload = () => {
                var resp  = JSON.parse(xhr.responseText)
                if (resp.StatusCode == 0 ) {
                    // hide the form so you can't post again, but say thank you.
                    this.todos = resp.PreviousMessages;
                } else {
                    alert("ok dear, we hit a snag....StatusCode:" + resp.StatusCode + " error: " + resp.ErrorMessage);
                }
                };
        
            xhr.onerror = function() {
                alert('Woops, there was an error making the request.');
            };
        
            var jsonRequest = { 
                "Message": this.message,
            }
        
            xhr.send(JSON.stringify(jsonRequest))
        
            // clear the input
            this.message = "";
            
            return false;
        },
    },        
    template: `
      <div>
          <my-header active="index"></my-header>
          <div id="page_content" class="page_content">
          <div class="content_block" style="margin-top: 20px;">
              <h1>A Simple Web Site Powered by a Go Web Server</h1>
                  <h2>It does not do much...</h2>
                  <h3>but....</h3>
                  <h4>It is a basic template to copy to get going!</h4>
                  <p>Greeting from the server: {{greeting}}</h1>
              </div>
          
              <div class="content_block" style="margin-top: 20px;">
                  <h4>Example form that send a JSON request to /echo and then shows the JSON response</h4>
                      <div style="padding-bottom: 10px;"><span style="float:left; width: 80px;">Message:</span><span><input type="text" id="message" name="message" value="" size="80" v-model="message" required autofocus /></span></div>
                      <div><button class="richbutton" v-on:click="onSubmit">Submit</button></div>
                      <ol>
                          <li v-for="todo in todos">
                          {{ todo }}
                          </li>
                      </ol>
          </div>
          
          <div class="content_block" style="margin-top: 20px;">
              <h1 style="margin-top: 0px;">Links</h1>
              <ul>
                  <li><a href="https://github.com/richandersonio/go-example-webserver">The GitHub repo for the example web server</a></li>
                  <li><a href="https://golang.org/">The GO web site</a></li>
  
              </ul>
          </div>
      </div>
  
      <my-footer />      
      </div>
    `}

    const Schedule = {  
        template: `
            <div>
                <my-header active="agenda"></my-header>
                <div id="page_content" class="page_content">
                    <div class="content_block" style="margin-top: 20px;">
                        <h1>Schedule</h1>
                    </div>
                </div>
          <my-footer />      
          </div>
        `}

    const Speakers = {  
        template: `
            <div>
                <my-header active="speakers"></my-header>
                <div id="page_content" class="page_content">
                    <div class="content_block" style="margin-top: 20px;">
                        <h1>Speakers</h1>
                    </div>
                </div>
            <my-footer />      
            </div>
        `}

    const News = {  
        template: `
            <div>
                <my-header active="news"></my-header>
                <div id="page_content" class="page_content">
                    <div class="content_block" style="margin-top: 20px;">
                        <h1>News</h1>
                    </div>
                </div>
            <my-footer />      
            </div>
        `}    
        
  const routes = [
    { path: '/', component: MainPage },
    { path: '/schedule', component: Schedule },
    { path: '/speakers', component: Speakers },
    { path: '/news', component: News },
    
  ];
  
  const router = new VueRouter({
    routes // short for `routes: routes`
  })
  
  Vue.use(VueRouter)
  
  const app = new Vue({
    router,
    data: sourceOfTruth  // accessed in components using this.$root.$data; 
  
  }).$mount('#app') // starts the app


