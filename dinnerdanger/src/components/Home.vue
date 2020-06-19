<template>
  <body>
    <section class="hero is-info is-fullheight has-bg-img">
      <div class="hero-head">
        <nav class="navbar is-fixed-top is-warning">
          <div class="container">
            <div class="navbar-brand">
              <a
                id="refresh"
                class="navbar-item"
                v-on:click="welcome = true"
                v-show="!this.welcome"
              >
                Search Another Dinner
              </a>
              <a
                role="button"
                class="navbar-burger"
                data-target="navMenu"
                aria-label="menu"
                aria-expanded="false"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="navMenu" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item is-active">
                  Home
                </a>
                <a
                  class="navbar-item"
                  href="https://github.com/cozma/dinnerdanger"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <!-- WELCOME -->
        <div class="container">
          <div v-if="this.welcome">
            <p>welcome to</p>
            <h1 class="is-size-1 title" style="color:#FFD83D">{{ msg }}</h1>
            <div class="container is-fluid">
              <div class="field">
                <div class="control is-focused">
                  <input
                    v-model="locationId"
                    style="text-align:center"
                    class="input is-large is-rounded"
                    type="text"
                    placeholder="type or paste your location id here"
                  />
                </div>
                <br />
                <div class="has-text-centered">
                  <input
                    id="search"
                    v-on:click="search"
                    class="button is-centered is-warning is-medium is-outlined"
                    type="submit"
                    value="search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="!this.welcome">
            <!-- RESULTS -->
            <p>Here are your results:</p>
            <br />
            <article class="panel is-warning has-background-white	">
              <p class="panel-heading">
                Recent FDA Warnings
              </p>
              <div class="panel-block">
                <p class="control has-icons-left">
                  <input
                    class="input is-info"
                    type="text"
                    placeholder="Search"
                  />
                  <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                </p>
              </div>
              <a class="panel-block is-active">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          developed by
          <strong
            ><a href="https://github.com/cozma" style="color:#FFD83D"
              >Dag</a
            ></strong
          >
        </p>
      </div>
    </footer>
  </body>
</template>

<script>
export default {
  name: "dinnerdanger",
  dinner: [],
  data() {
    return {
      welcome: true,
      ingredient: "",
    };
  },
  props: {
    msg: String,
    locationId: String,
  },
  methods: {
    search() {
      this.welcome = false;
      var self = this;
      var request = require("request");
      var options = {
        method: "POST",
        url:
          'https://api.fda.gov/food/enforcement.json?search=reason_for_recall:"' +
          ingredient +
          '"&limit=100',
        headers: {
          "Content-Type": "application/json",
        },
      };
      request(options, function(error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        self.orders = response.body;
        setTimeout("", 100);
        self.getProducts();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.results {
  transition: 0.5s ease;
  opacity: 0;
}
h3 {
  margin: 40px 0 0;
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
  color: rgb(232, 209, 37);
}
.has-bg-img {
  background-image: url("../assets/bg.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: rgb(0, 120, 172);
  opacity: 0.7;
}
</style>
