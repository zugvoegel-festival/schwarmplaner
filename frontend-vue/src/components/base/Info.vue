<template>
  <v-theme-provider :dark="dark">
    <div>
      <v-row>
        <v-col>
          <v-container
            class="fill-height"
            fluid
          >
            <v-row>
              <v-col
                class=";"
                style="display: flex; justify-content: center;"
              >
                <div>
                  <base-img
                    :src="
                      require(`@/assets/logo_${
                        $vuetify.theme.isDark ? 'dark' : 'light'
                      }.svg`)
                    "
                    contain
                    max-width="150"
                    width="100%"
                  />

                  <base-img
                    :src="
                      require(`@/assets/text-logo-${
                        $vuetify.theme.isDark ? 'dark' : 'light'
                      }.svg`)
                    "
                    style="padding-top:50%"
                    justify-center
                    contain
                    max-width="150"
                    width="100%"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col>
          <div>
            <base-info-card
              :title="title"
              color="primary"
            >
              <slot />
            </base-info-card>

            <template v-for="({ icon, text, title: t }, i) in business">
              <base-avatar-card
                :key="i"
                :icon="icon"
                :outlined="false"
                :title="t"
                color="transparent"
                horizontal
                space="0"
              >
                <!-- Do not use v-html for user -->
                <!-- provided values -->
                <div v-html="text" />
              </base-avatar-card>

              <v-divider
                v-if="i + 1 !== business.length"
                :key="`divider-${i}`"
                class="my-2"
              />
            </template>

            <v-divider class="my-2" />

            <base-avatar-card
              icon="mdi-email"
              :outlined="false"
              color="transparent"
              horizontal
              space="0"
            >
              <!-- Do not use v-html for user -->
              <!-- provided values -->
              <base-btn
                :block="$vuetify.breakpoint.smAndDown"
                color="white"
                small
                outlined
                target="_blank"
                data-name="mail"
                data-domain="lit-labs"
                data-tld="de"
                onclick="window.location.href = 'mailto:' + this.dataset.name + '@' +
this.dataset.domain + '.' + this.dataset.tld + '?subject=Ich%20will%20mehr'; return false;"
              >
                Email
              </base-btn>
            </base-avatar-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'BaseInfo',

    props: {
      title: String,
      dark: Boolean,
    },

    data: () => ({
      business: [
        {
          icon: 'mdi-map-marker-outline',
          title: 'Address',
          text:
            'LIT labs UG (Haftungsbeschränkt)<br>Siebachstr. 101<br>50733 Köln<br>NRW, Deutschland',
        },
        {
          icon: 'mdi-cellphone',
          title: 'Phone',
          text: '0221 - 204 75 133',
        },
      ],
    }),
  }
</script>

<style scoped>
.cryptedmail {
  content: attr(data-name) '@' attr(data-domain) '.' attr(data-tld);
}
</style>
