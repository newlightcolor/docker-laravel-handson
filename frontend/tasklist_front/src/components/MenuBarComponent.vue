<template>
    <div>
        <v-app-bar
        app
        color="indigo"
        dark
        >
            <v-icon @click="showDrawer = !showDrawer" large>mdi-menu</v-icon>

            <v-spacer></v-spacer>

            <v-btn icon to="/tasks/list">
                <v-icon large>
                    mdi-clipboard-list
                </v-icon>
            </v-btn>

            <v-btn icon to="/tasks/create">
                <v-icon large>
                    mdi-playlist-plus
                </v-icon>
            </v-btn>

            <v-menu
            bottom
            left
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                    >
                        <v-icon large>mdi-account-circle</v-icon>
                    </v-btn>
                </template>

                <v-list dense>
                    <v-subheader>Account</v-subheader>
                    <v-list-item-group>
                        <v-list-item to="/user/register">
                            <v-list-item-content>
                                <v-list-item-title>登録</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/user/login">
                            <v-list-item-content>
                                <v-list-item-title>ログイン</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
          </v-menu>
        </v-app-bar>

        <v-navigation-drawer app class="indigo lighten-1" dark v-model="showDrawer">
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title class="text-h6">
                    Vue Laravel SPA
                </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
            dense
            nav
            >
                <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                showDrawer: true,
            }
        }
    }
</script>