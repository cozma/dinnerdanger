<template>
  <body>
    <section class="hero is-info is-fullheight">
      <div class="hero-head">
        <nav class="navbar is-fixed-top is-warning">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item" href="https://bulma.io">
                <img
                  src="../assets/pilldex.png"
                  alt="pilldex logo"
                  width="90"
                  height="50"
                />
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
                <a class="navbar-item">
                  Examples
                </a>
                <a class="navbar-item">
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container" v-if="this.welcome">
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
                  v-on:click="search"
                  class="button is-centered is-warning is-medium is-outlined"
                  type="submit"
                  value="search"
                />
              </div>
            </div>
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
  name: "PillDex",
  orders: [],
  products: "",
  drugResponse: "",
  data() {
    return {
      welcome: true,
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
        url: "https://connect.squareupsandbox.com/v2/orders/search",
        headers: {
          Authorization:
            "Bearer EAAAEMSvmR6PgNiIZ0jE0zF610RpfEN3llo4GMwIj3A_HV6HXcf48qqTHvWI2yym",
          "Content-Type": "application/json",
        },
        body:
          '{\n    "location_ids": [\n      "' +
          this.locationId +
          '"\n    ]\n  }',
      };
      request(options, function(error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        self.orders = response.body;
        self.getProducts();
      });
    },
    getProducts: function() {
      var self = this;
      self.products = "";
      if (this.orders) {
        console.log("Calling Drugs API");
        var orderList = JSON.parse(this.orders);
        for (var i = 0; i < orderList.orders.length; i++) {
          for (var j = 0; j < orderList.orders[i].line_items.length; j++) {
            var unirest = require("unirest");
            unirest(
              "GET",
              "https://rxnav.nlm.nih.gov/REST/rxcui?name=" +
                orderList.orders[i].line_items[j].name
            ).end(function(res) {
              if (res.error) throw new Error(res.error);
              var parser, xmlDoc;
              parser = new DOMParser();
              xmlDoc = parser.parseFromString(res.body, "text/xml");
              console.log("printing type...: " + typeof self.products);
              self.products +=
                xmlDoc.getElementsByTagName("rxnormId")[0].childNodes[0]
                  .nodeValue + "+";
              // self.products.push(
              //   xmlDoc.getElementsByTagName("rxnormId")[0].childNodes[0]
              //     .nodeValue
              // );
              console.log("product id added: " + self.products);
            });
          }
        }
        self.getInteractons();
      }
    },
    getInteractons: function() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #42b983;
}
</style>
