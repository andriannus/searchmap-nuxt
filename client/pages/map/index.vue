<template>
  <div>
    <v-card ref="mapCard" v-if="visibleCard">
      <v-card-text>
        <v-text-field
          label="Search here.."
          prepend-icon="place"
          ref="mapInput"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat color="primary" to="/">Home</v-btn>
        <v-btn flat color="primary" to="/guest/place">Guest Book</v-btn>
      </v-card-actions>
    </v-card>

    <div id="map" ref="map" style="height: 100vh;"></div>
  </div>
</template>

<script>
export default {
  layout: 'layout',
  data: () => ({
    card: '',
    input: '',
    map: '',
    autoComplete: '',
    infoWindow: '',
    visibleCard: false
  }),

  mounted () {
    this.initMap()
  },

  methods: {
    initMap () {
      this.card = this.$refs.mapCard
      this.input = this.$refs.mapInput

      this.map = new google.maps.Map(this.$refs.map, {
        center: {
          lat: -6.595038,
          lng: 106.816635
        },
        zoom: 13,
        disableDefaultUI: true
      })

      this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.card)

      this.autoComplete = new google.maps.places.Autocomplete(this.input)
      this.autoComplete.bindTo('bounds', this.map)

      google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
        this.visibleCard = true
      })
    }
  }
}
</script>
