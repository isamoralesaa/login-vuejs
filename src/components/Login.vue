<template>
    <div class="login-template">

        <div class="alert alert-danger" role="alert" v-if="error">
           {{error_msg}}
        </div>

        <form>
            <fieldset>
                <legend class="legend-border">Login</legend>

                <div class="row mb-3">
                    <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" id="inputEmail" v-model="email">
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                      <input type="password" class="form-control" id="inputPassword" v-model="password">
                    </div>
                </div>

                <div class="btn-login">
                    <button type="button" @click="login()" :disabled='isDisabled' class="btn btn-primary float-right">Login</button>
                </div>

            </fieldset>
        </form>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                email: "",
                password: "",
                error: false,
                error_msg: "",
                isDisabled: false
            }
        },
        created: function() {
            if (window.localStorage.getItem('_token'))
                window.localStorage.removeItem('_token');
        },
        methods: {
            login() {
                if (!!this.email && !!this.password) {
                    let info = {
                        "email" : this.email,
                        "password": this.password
                    };
                    this.isDisabled = true;
                    this.error = false;
                    axios.post('http://apibackend.local/api/auth/login', info)
                    .then(response  => {
                    console.log(response);
                        if(response.data.success) {
                            localStorage.setItem('_token', response.data.access_token);
                            this.$router.push('welcome');
                        }
                        this.isDisabled = false;
                    })
                    .catch(e => {
                        console.log(e);
                        this.error = true;
                        this.error_msg = "We couldn't verify your account details.";
                        this.isDisabled = false;
                    });
                } else {
                    this.error = true;
                    this.error_msg = "email and password fields are required";
                }
            }
        }
    }
</script>
