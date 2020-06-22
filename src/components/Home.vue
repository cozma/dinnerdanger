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
            <br />
          </div>
          <div class="columns" v-if="this.welcome">
            <div class="column">
              <div class="container is-fluid">
                <div class="field">
                  <div class="control is-focused">
                    <input
                      v-model="ingredient"
                      style="text-align:center"
                      class="input is-large is-rounded"
                      type="text"
                      placeholder="enter an ingredient here"
                      v-on:keyup.enter="add"
                    />
                  </div>
                  <br />
                  <div class="has-text-centered">
                    <input
                      id="add"
                      v-on:click="add"
                      class="button is-centered is-warning is-medium is-outlined"
                      type="submit"
                      value="add to list"
                    />
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <div class="column">
              <li>Choose Dinner date: <input type="date" v-model="date" /></li>
              <div id="ingredients">
                <br>
                <ul>
                  <li v-for="item in ingredients" v-bind:key="item">
                    <figure class="image is-128x128">
                      <img
                        class="is-rounded"
                        src="https://bulma.io/images/placeholders/128x128.png"
                      />
                    </figure>
                    <a href="#">{{ item.title }}</a
                    ><br />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="this.welcome">
            <div class="has-text-centered">
              <input
                id="search"
                v-on:click="search"
                class="button is-centered is-warning is-medium is-outlined"
                type="submit"
                value="search dinner warnings"
              />
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
      date: new Date(),
      welcome: true,
      ingredient: "",
      ingredients: [],
      nextIngredient: 1,
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
          self.ingredient +
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
    add() {
      console.log("adding ingredient: " + this.ingredient);
      this.ingredients.push({
        id: this.nextIngredient++,
        title:
          this.ingredient.charAt(0).toUpperCase() + this.ingredient.slice(1),
      });
      console.log("ingredients: " + this.ingredients[0].title);
      this.ingredient = "";
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
  opacity: 0.8;
}
</style>
