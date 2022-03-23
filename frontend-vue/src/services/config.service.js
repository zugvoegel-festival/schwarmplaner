//import Vue from "vue";
//import axios from "axios";
//import * as vueConfig from "../../vue.config";

//import { configStore } from "../stores/config.store";

class ConfigService {
  async loadConfig() {
    return "";

    /*axios
      .get(`${vueConfig.publicPath}static/config.json`)
      .then((response) => {
        configStore.set(response.data);
        Vue.$log.debug(response.data);
      })
      .catch((e) => {
        Vue.$log.error(e);
      });
      */
  }
}

export default new ConfigService();
