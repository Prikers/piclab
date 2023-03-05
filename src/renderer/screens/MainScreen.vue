<template>
  <v-container>
    <v-row no-gutters align="center" class="text-center">
      <v-col cols="12" md="5">
        <h1 class="marker gradient-text main-title">Piclab</h1>
      </v-col>
      <v-col cols="12" md="7">
        <h2 class="my-4">{{ $t('main.welcome-title') }}</h2>
        <p>{{ $t('main.welcome-desc') }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scopped>
.main-title {
  font-size: 6rem !important;
  font-weight: 300;
  line-height: 6rem;
  letter-spacing: -0.015625em !important;
  text-transform: none !important;
}
.gradient-text {
  background-color: #009688;
  background-image: linear-gradient(45deg, #00695c, #80cbc4);
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}
</style>
