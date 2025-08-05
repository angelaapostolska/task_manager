<template>
  <v-card class="mx-auto my-8 card-design" elevation="16" max-width="344">
    <div class="card-top"></div>
    <v-card-item>
      <v-card-title> Card title </v-card-title>

      <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
    </v-card-item>
  </v-card>
</template>
<style scoped lang="scss">
@import "../styles/gradients.scss";
.card-design {
  border-radius: 12px;
}
.card-top {
  height: 80px;
  background: $purple-gradient;
}
</style>
