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
                <br />
                <ul>
                  <li v-for="item in ingredients" v-bind:key="item">
                    <figure class="image is-128x128">
                      <img
                        class="is-rounded"
                        src="https://bulma.io/images/placeholders/128x128.png"
                      />
                    </figure>
                    <a href="#"
                      ><b>{{ item.title }}</b></a
                    ><br />
                  </li>
                </ul>
                <br>
                <input
                  id="clear"
                  v-on:click="clear"
                  class="button is-centered is-warning is-medium is-outlined"
                  type="submit"
                  value="clear list"
                />
              </div>
            </div>
          </div>
          <div v-if="this.welcome">
            <div class="has-text-centered">
              <input
                id="list"
                v-on:click="list"
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
                <li v-for="warning in warnings" v-bind:key="warning">
                  <a href="#"
                    ><b>{{
                      warning.results[0].product_description
                        .split("Ingredients")[0]
                        .split("INGREDIENTS")[0]
                    }}</b></a
                  >
                </li>
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
      date: "",
      welcome: true,
      ingredient: "",
      ingredients: [],
      nextIngredient: 1,
      warnings: [],
    };
  },
  props: {
    msg: String,
    locationId: String,
  },
  methods: {
    clear() {
      this.ingredients = [];
    },
    list() {
      this.welcome = false;
      console.log("WARNINGS LIST: " + this.warnings);
    },
    search() {
      var self = this;
      var request = require("request");
      var rangeDate = this.findRange(this.date);
      var options = {
        method: "GET",
        url:
          "https://api.fda.gov/food/enforcement.json?search=report_date:[" +
          rangeDate +
          "+TO+" +
          this.date.replace(/[^a-z0-9]/gi, "") +
          ']+product_description:"' +
          self.ingredient +
          '"&limit=100&sort=report_date:desc',
        headers: {
          "Content-Type": "application/json",
        },
      };
      request(options, function(error, response) {
        if (error) throw new Error(error);
        self.warnings.push(JSON.parse(response.body));
      });
    },
    findRange(date) {
      var dateArray = date.split("-");
      dateArray[0] = parseInt(dateArray[0]) - 5;
      console.log("RANGE DATE: " + dateArray.join());
      return dateArray.join().replace(/[^a-z0-9]/gi, "");
    },
    add() {
      console.log("adding ingredient: " + this.ingredient);
      this.ingredients.push({
        id: this.nextIngredient++,
        title:
          this.ingredient.charAt(0).toUpperCase() + this.ingredient.slice(1),
      });
      console.log("ingredients: " + this.ingredients[0].title);
      this.search();
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
  opacity: 0.9;
}
</style>
