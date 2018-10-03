<template>
  <v-app light>
    <Navigation />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Navigation from '~/components/Navigation'
import Footer from '~/components/Footer'

export default {
  data: () => ({
    //
  }),

  components: {
    Navigation,
    Footer
  }
}
</script>
