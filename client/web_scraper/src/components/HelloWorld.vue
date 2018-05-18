<template>
  
<v-layout column>

<v-flex xs6 offset-xs3>
      <h1>Web Scraper!</h1>
    <h2>Get information about your websites!</h2>

        <v-flex>
     
        <v-text-field v-model="url" box label="Enter your URL here"></v-text-field>
      </v-flex>
        <v-btn @click="checkWebsite()"> 
    Check website
     </v-btn>
      <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="my-3">
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
  <v-container fluid>

      <v-flex xs2.2>
        <v-text-field
          id="testing"
          v-model=links
          name="input-1"
          label="Number of Links"
        ></v-text-field>
      </v-flex>

      <v-flex xs2.2>
        <v-text-field
          id="testing"
          v-model=domains
          name="input-1"
          label="Number of Unique Domains"
        ></v-text-field>
      </v-flex>

      <v-flex xs2.2>
        <v-text-field
          id="testing"
          v-model=secure
          name="input-1"
          label="Is the website secure?"
        ></v-text-field>
      </v-flex>

      <v-flex xs2.2>
        <v-text-field
          id="testing"
          v-model=title
          name="input-1"
          label="Title of the webpage"
        ></v-text-field>
      </v-flex>

      <v-flex xs2.2>
        <v-text-field
          id="testing"
          v-model=GA
          name="input-1"
          label="Is the Google Analytics working on the page?"
        ></v-text-field>
      </v-flex>


  </v-container>

 
</v-layout>
</template>

<script>
import UrlService from "@/services/UrlService";

export default {
  name: "HelloWorld",
  data() {
    return {
      links: "Empty :)",
      domains: "Empty :)",
      secure: "Empty :)",
      title: "Empty :)",
      GA: "Empty :)",
      scrape: null
    };
  },
  methods: {
    navigateTo(link, board) {
      this.$router.push(link);
    },
    async checkWebsite(userId) {
      //remove user
      {
        this.scrape = (await UrlService.scrape({ url: this.url })).data;
        this.title = (await UrlService.title({ url: this.url })).data.title;
        this.GA = (await UrlService.GA({ url: this.url})).data.result.has_ga;
        console.log(this.GA);
        this.links = this.scrape.links;
        this.domains = this.scrape.domains;
        this.secure = this.scrape.secure;
      }
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
