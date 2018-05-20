<template>
<v-layout column>

<v-flex xs6 offset-xs3>
        <div class="white elevation-2">
 <v-toolbar flat dense class ="cyan" light>
      <v-toolbar-title>Web Scraper!</v-toolbar-title>
    </v-toolbar>
        </div>
     </div>
        <v-flex>
          <!--v-models can be set to text boxes so it automatically populates the values with our data pull stuff -->
        <v-text-field v-model="url" box label="Enter your URL here"></v-text-field>
      </v-flex>
        <v-btn @click="pullData()"> 
    Check website
     </v-btn>
</v-flex>
      <v-container fluid grid-list-xl>
        <!--Vuetify makes the layout look gooood (relatively). -->
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-toolbar color="primary">
            <v-btn icon>
              <v-icon color="white">arrow_back</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="white">more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container fluid class="px-3">
            <v-layout row wrap>
               <v-flex xs12>
                <v-text-field
                  v-model="title"
                  label="Title of webpage:"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="links"
                  label="Number of Links:"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="domains"
                  label="Number of unique domains"
                ></v-text-field>
              </v-flex>
               <v-flex xs12>
                <v-text-field
                  v-model="secure"
                  label="Is the website secure?"
                ></v-text-field>
              </v-flex>
               <v-flex xs12>
                <v-text-field
                  v-model="GA"
                  label="Is Google Analytics working on the webpage?:"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</v-flex>
  
</v-layout>
</template>

<script>
import UrlService from "@/services/UrlService";
//Axiom does the heavy lifting for asynchronous requests, 
//You could put the entire 'service' here, but I like to split these files up
//to make the code look cleaner.
export default {
  name: "HelloWorld",
  data() {
    return {
      //establish the data members here, e.g. title. When we assign these guys to the textboxes they automatically
      //get populated with the information when its pulled from our API
      links: "Empty :)",
      domains: "Empty :)",
      secure: "Empty :)",
      title: "Empty :)",
      GA: "Empty :)",
      badLink: "The URL you provided does not lead anywhere :(.",
      unformattedLink: "URL must in following format: http://www.example.co.uk"
    };
  },
  methods: {
    pullData() {
      this.getTitle();
      this.scrape();
      this.analytics();
    },
    async getTitle() {
      await UrlService.title({ url: this.url })
        .then(response => (this.title = response.data.title))
        .catch(err => {
          if (err.response.status === 404) {
            //by using the v-model, when we assign things directly to the variable, 
            //it automatically populates the textboxes.
            this.title = this.badLink;
          } else if (err.response.status === 400) {
            this.title = this.unformattedLink;
          }
        });
    },
    async scrape() {
      await UrlService.scrape({ url: this.url })
        .then(
          response => (
            (this.links = response.data.links),
            (this.domains = response.data.domains),
            (this.secure = response.data.secure)
          )
        )
        .catch(err => {
          if (err.response.status === 404) {
            this.links = this.badLink;
            this.domains = this.badLink;
            this.secure = this.badLink;
          } else if (err.response.status === 400) {
            this.links = this.unformattedLink;
            this.domains = this.unformattedLink;
            this.secure = this.unformattedLink;
          }
        });
    },
    async analytics() {
      await UrlService.GA({ url: this.url })
        .then(response => (this.GA = response.data.result))
        .catch(err => {
          if (err.response.status === 404) {
            this.GA = this.badLink;
          } else if (err.response.status === 400) {
            this.GA = this.unformattedLink;
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
