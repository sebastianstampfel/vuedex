<template>
  <div id="app">
    <b-container fluid>
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand href="#">PWAdex</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <!-- <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/about" disabled>About</b-nav-item>
            <b-nav-item to="/about" disabled>BP: {{ $screen.breakpoint }}</b-nav-item> -->
            <b-nav-item disabled>Useless sideproject by Sebastian Stampfel, 2020</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view/>
    </b-container>
  </div>
</template>

<style lang="scss">
body {
  // overflow: hidden;
  height: 100vh;
  background: #121212 !important;
}

@media (min-width: 992px) {  
 body {
   overflow: hidden;
   height: 100vh;
 }
}

#app {
  color: white;
}
</style>
