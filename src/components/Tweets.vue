<template>
  <v-container grid-list-xl>
    <v-layout align-center justify-start column fill-height>
      <v-flex v-for="tweet in tweets" :key="tweet._id" md12 sm12 lg4>
        <v-card class="px-3 py-2">
          <v-responsive width="600px">
            <v-card-title>{{ tweet.author }}</v-card-title>
            <v-card-text>{{ tweet.text }}</v-card-text>
            <small>{{ tweet.timestamp | displayDate }}</small>
          </v-responsive>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn fab small color="blue accent-2" right @click="editTweetModal = true">
              <v-icon color="white">fas fa-pen</v-icon>
            </v-btn>
            <v-dialog v-model="editTweetModal" max-width="600px">
              <edit-tweet :tweetToEdit="tweet" @close="editTweetModal = false"/>
            </v-dialog>&nbsp;
            <v-btn fab small color="red accent-2" right @click="deleteTweet(tweet)">
              <v-icon color="white">fas fa-trash-alt</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import EditTweet from "../components/EditTweet";

export default {
  data() {
    return {
      editTweetModal: false
    };
  },
  components: {
    EditTweet
  },
  created() {
    this.$store.dispatch("getTweets");
  },
  computed: {
    tweets() {
      return this.$store.state.tweets.allTweets;
    }
  },
  filters: {
    displayDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm");
    }
  },
  methods: {
    deleteTweet(tweet) {
      this.$store.dispatch("deleteTweet", tweet._id);
    }
  }
};
</script>

<style>
</style>
