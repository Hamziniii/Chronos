<template>
  <div v-if="true" class="OauthLogin">
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
const authURL = "https://chronoshhs.herokuapp.com/authenticate";
export default {
  name: "OauthLogin",
  mounted() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id: this.clientID + ".apps.googleusercontent.com",
        cookiepolicy: "single_host_origin"
      });
    });
    window.onSignIn = googleUser => {
      var id_token = googleUser.getAuthResponse().id_token;
      //console.log("ID Token: " + id_token);
      if (
        localStorage.getItem("sessionId") == "undefined" ||
        localStorage.getItem("sessionId") == null ||
        DateTime.fromObject(
          JSON.parse(localStorage.getItem("sessionId")).expiresAt
        )
          .diffNow()
          .as("seconds") <= 0
      ) {
        fetch(authURL, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ accessToken: id_token })
        }).then(res => {
          res.json().then(json => {
            if (json.success) {
              localStorage.setItem("sessionId", JSON.stringify(json.sessionId));
              this.render = false;
            } else {
              throw "Auth Error:" + json.reason;
            }
          });
        });
      }
    };
  },
  beforeMount() {
    /*
    if (
      (localStorage.getItem("sessionId") == "undefined" || localStorage.getItem("sessionId") == null) ||
      DateTime.fromObject(
        JSON.parse(localStorage.getItem("sessionId")).expiresAt
      )
        .diffNow()
        .as("seconds") <= 0
    ) {
      this.render = true;
    } else {
      this.render = false;
    }
    */
  },
  props: {
    clientID: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
