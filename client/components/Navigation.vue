<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      app
    >
      <v-list>
        <v-list-tile router exact to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group
          prepend-icon="account_circle"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Guest Book</v-list-tile-title>
          </v-list-tile>

          <v-list-tile router exact to="guest/place">
            <v-list-tile-content>
              Place
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile router exact to="guest/shape">
            <v-list-tile-content>
              Shape
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile router exact to="/map">
          <v-list-tile-action>
            <v-icon>map</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Map</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router exact to="/draw">
          <v-list-tile-action>
            <v-icon>edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Draw</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router exact to="/my">
          <v-list-tile-action>
            <v-icon>my_location</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Location</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    title: 'Search Map'
  })
}
</script>
