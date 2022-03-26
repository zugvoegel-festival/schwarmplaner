<template>
  <div>
    <v-row class="pa-10">
      <v-col> Platzhalter Deine Nächsten Schichten </v-col>
      <v-col>
        <v-row>
          Danke das du Teil des Schwarms bist und das Zugvögelfestival zu dem
          kollektiven Schwarmintelligenzerlebnis machst dass es ist. Hier die
          wichtigsten Infos zu deinen Schichten: Komme bitte 15 Minuten vor
          Schichtbeginn zu deinem Arbeitsort. Wenn du es nicht schaffen solltest
          bitte melde dich so früh wie möglich bei deinem Schichtleiter oder im
          Arbeitsamt. Dein Dankeschön bekommst du von deinem Schichtleiter.
          Machst du eine 8-Stunden Schicht für ein Festivalticket bekommst du
          nach dem Festival das Geld für dein Ticket zurück. Speichere diesen
          Link am besten ab. Es ist dein persönlicher Schichtplan. Hier findest
          du immer die aktuellesten Infos.
        </v-row>
        <v-row>
          <v-col>
            <v-btn to="/trade">Schicht Tauschen</v-btn>
          </v-col>
          <v-col>
            <v-btn to="/userShift">Mehr Schichten</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  metaInfo: { title: "Dashboard" },
};
</script>

<style></style>
