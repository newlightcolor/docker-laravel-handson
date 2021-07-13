
<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="passwordConfirm"
      :error-messages="passwordConfirmErrors"
      label="Password Confirm"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-btn
      @click="submit"
    >
      submit
    </v-btn>
  </form>
</template>

<script>
    export default {
        data: function() {
            return {
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            }
        }
    }
</script>