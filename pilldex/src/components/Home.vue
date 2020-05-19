<template>
  <body>
    <section class="hero is-info is-fullheight">
      <div class="hero-head">
        <nav class="navbar is-fixed-top is-light">
          <div class="container">
            <div class="navbar-brand">
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
        <div class="container">
          <p>welcome to</p>
          <h1 class="is-size-1 title">{{ msg }}</h1>
          <div class="container is-fluid">
            <div class="field">
              <div class="control is-focused">
                <input
                  style="text-align:center"
                  class="input is-large is-rounded"
                  type="text"
                  placeholder="type or paste your location id here"
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
          <strong>pilldex</strong> by
          <a href="https://github.com/cozma">Dag Yeshiwas</a>
        </p>
      </div>
    </footer>
  </body>
</template>

<script>
export default {
  name: "PillDex",
  props: {
    msg: String,
  },
  methods: {
    
  }
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
