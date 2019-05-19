<template>
  <v-dialog v-model="dialogOpen" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2 titleContainer" primary-title>
        <h4 class="title">Complete the Survey</h4>
        <div class="close" v-on:click="close">X</div>
      </v-card-title>
      <v-card-text>
        <div v-for="(item, index) in mockData" v-bind:key="item.Id">
          <div>{{ item.Question }}</div>
          <div>
            <v-radio-group v-model="form.Responses[index].Selection">
              <v-radio
                v-for="(option, index) in item.Selection"
                :key="index"
                :label="option"
                :value="option"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>
        <v-textarea
          v-model="form.Comment"
          name="comments"
          label="Comments"
          value="Leave us a note."
          hint="Hint text"
        ></v-textarea>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat v-on:click="submit">Submit</v-btn>
      </v-card-actions>
      <v-alert v-if="isSuccess" :value="true" type="success">{{ msg }}</v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
// import { required } from 'vuelidate/lib/validators';

export default {
  props: {
    dialogOpen: Boolean
  },
  data() {
    return {
      form: {
        Comment: null,
        Responses: [
          {
            Id: 1,
            Selection: null
          },
          {
            Id: 2,
            Selection: null
          },
          {
            Id: 3,
            Selection: null
          }
        ]
      },
      index: '',
      isSuccess: false,
      msgSuccess: 'thanks',
      mockData: [
        {
          Id: 1,
          Question: 'Do they use plastic straws?',
          Selection: ['Yes', 'No']
        },
        {
          Id: 2,
          Question: 'Was the packaging:',
          Selection: ['Styrofoam', 'Plastic', 'Compostable']
        },
        {
          Id: 3,
          Question: 'Do they use single-serve condiments?',
          Selection: ['Yes', 'No']
        }
      ]
    };
  },
  computed: {
    msg: function() {
      return (
        'Thank you for you answers: ' +
        this.form.Responses.map(el => ' ' + el.Id + ': ' + el.Selection)
      );
    }
  },
  methods: {
    close: function() {
      this.isOpen = false;
    },
    submit: function() {
      this.isSuccess = true;
      this.$emit('close-dialog')
    }
  }
  // validations: {
  //     form: [
  //         {
  //             Selection: { required, },
  //         }
  //     ]
  // },
};
</script>

<style lang="scss">
.titleContainer {
  display: flex;
  justify-content: space-between;
}
.close,
.title {
  display: flex;
}
.close {
  padding: 4px;
  cursor: pointer;
}
.v-input--selection-controls,
.v-input__slot {
  margin-top: 0px;
  padding-top: 0px;
}
</style>
