
<template>
<div>
<v-card elevation="2">
    <v-card-title>
        ユーザー登録
    </v-card-title>

    <v-card-text>
        <v-form  v-on:submit.prevent="submit" ref="form">
            <v-text-field
            v-model="user.name"
            :error-messages="nameErrors"
            label="名前"
            :rules="nameRules"
            ></v-text-field>
            <v-text-field
            v-model="user.email"
            :error-messages="emailErrors"
            label="メールアドレス"
            :rules="emailRules"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="user.password"
            :error-messages="passwordErrors"
            label="パスワード"
            :rules="passwordRules"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            ></v-text-field>
        </v-form>
    </v-card-text>

    <v-alert
    outlined
    type="error"
    class="mx-6"
    v-for="(message, index) in result.error.messages"
    :key="index"
    >
        {{ message }}
    </v-alert>

    <v-card-actions>
        <v-btn
        @click="submit"
        v-show="!registering"
        class="indigo accent-3"
        dark
        >
        登録
        </v-btn>
        <v-btn
        @click="submit"
        v-show="registering"
        class="indigo accent-3"
        dark
        loading
        >
        登録
        </v-btn>
    </v-card-actions>
</v-card>
</div>
</template>

<script>
    export default {
        data: function() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    passwordConfirm: ''
                },
                result: {
                    status: '',
                    error: {
                        messages: []
                    },
                },
                registering: false,
                nameRules: [
                    value => !!value || '必須項目です。',
                    value => (value && value.length >= 5) || '名前は5文字以上で入力してください'
                ],
                emailRules: [
                    value => !!value || '必須項目です。',
                ],
                passwordRules: [
                    value => !!value || '必須項目です。',
                ],
            }
        },

        methods: {
            submit() {
                if(this.$refs.form.validate()){
                    this.registering = true;
                    this.$axios.post('/user', this.user)
                        .then((res) => {
                            if(res.data.result === 'OK'){
                                this.$router.push('/tasks/list')
                            }
                            this.result = res.data
                            this.registering = false
                        });
                }
            }
        },

        mounted() {
            this.$refs.form.resetValidation()
        }

    }
</script>