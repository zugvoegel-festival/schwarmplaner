<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
import ConfigService from "./services/config.service";

export default {
  name: "App",
  beforeCreate() {
    // load local config from public/static/config.json.
    // duie that vue projects needs to be build before deployed dynamic configuration is not possible. Using a this function his making it possible.
    // How is it working?
    // On DockerContainer Startup the  public/static/config.json is generated from the ENVIRORMENT vars provided.
    // Vue is reading this file and setting using its values.
    ConfigService.loadConfig();
  },
};
</script>
