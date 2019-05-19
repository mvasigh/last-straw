<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Our Story</h3>
            <div>{{ card_text }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          Title: 'What are the diferent types of Single Use Plastic.',
          Body:
            'These are items like plastic bags, straws, coffee stirrers, soda or water bottles and most food packaging.'
        },
        {
          Title: 'How do they affect the environment',
          Body:
            'More than 300 million tons of plastics are produced annually, and there are at least five trillion plastic pieces floating in our oceans. Microplastic particles are either dumped directly into the seas via sewers and rivers or form when larger chunks of plastic break down over time.'
        },
        {
          Title: 'How can you get involved ',
          Body:
            'you can reduce your personal single use plastic consumption the next time you go out to eat, order take-out, or bring home leftovers. Visit restaurants that avoid passing single use plastics to consumers'
        }
      ]
    };
  }
};
</script>