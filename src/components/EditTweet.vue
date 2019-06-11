<template>
  <v-card>
    <v-card-text>
      <v-text-field v-model="tweet" label="Diga nos o que está pensando"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="updateTweet">Enviar</v-btn>
      <v-btn flat color="error" @click="$emit('close')">Fechar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "EditTweet",
  data() {
    return {
      tweet: null
    };
  },
  props: {
    tweetToEdit: Object
  },
  methods: {
    updateTweet() {
      this.$store
        .dispatch("updateTweet", { text: this.tweet, _id: this.tweetToEdit._id })
        .then(() => {
          this.$notify({
            title: "Tweet cadastrado com sucesso",
            type: "success",
            group: "toaster"
          });
          this.$router.push("/");
          this.$emit("close");
          this.$destroy();
          this.tweet = "";
        })
        .catch(err => {
          this.$notify({
            title: "Erro na inserção do tweet",
            text: err,
            type: "error",
            group: "toaster"
          });
        });
    }
  }
};
</script>

<style scoped>
</style>
