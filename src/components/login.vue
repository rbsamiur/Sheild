<template >
    <div align="center">
        <b-card class="max-w-sm rounded overflow-hidden shadow-lg ">
            <div>
                <b-form v-if="show" id="singUpSheet"  align="left" >

                    <label for="input-3" class="font-medium text-lg text-blue-700">Full Name:</label>
                    <b-form-input
                            v-model="form.name"
                            required
                            placeholder="Enter your name"
                            border="none"

                    ></b-form-input>
                    <br>
                    <label for="input-3" class="font-medium text-lg text-blue-700">Contact No:</label>
                    <b-row align-v="center">
                       <b-col cols="2" >
                           <span class="font font-bold text-right text-lg">+88</span>
                       </b-col>
                       <b-col cols="10" align="start">
                           <b-form-input
                                   inline
                                   v-model="form.phoneNo"
                                   type="number"
                                   required
                                   placeholder="Enter contact number"

                           >
                           </b-form-input>
                       </b-col>

                   </b-row>
                    <br>
                    <label class="font-medium text-lg text-blue-700">Email:</label>
                    <b-form-input
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="Enter email"
                    >
                    </b-form-input>

                    <br>
                    <label class="font-medium text-lg text-blue-700">User Name:</label>
                    <b-form-input
                            v-model="form.username"
                            type="text"
                            required
                            placeholder="Enter Username"
                            class="flex items-center border-b border-b-2 border-teal-500 py-2"
                    ></b-form-input>


                    <br>
                    <label class="font-medium text-lg text-blue-700">Password:</label>
                    <b-form-input
                            v-model="form.password"
                            type="password"
                            required
                            placeholder="Enter Password"
                            description="Input a valid email address."
                    ></b-form-input>


                </b-form>
                <b-form v-else-if="next" id="signUpSheet2"align="left">
                    <div>
                        <label class="text-blue-500 font-semibold text-lg">Category:</label>
                        <h6 class="text-xs">Select <span class="text-blue-500 font-bold">INFANTRY</span> if you want to help someone by providing <span class="text-blue-500 font-bold">information</span> or to<span class="text-blue-500 font-bold"> VOLUNTEER </span> for relief distribution.</h6>


                        <b-form-checkbox v-model="form.category.infantry.ready"@change="makeInfantryVisible" size="sm">
                            Infantry
                        </b-form-checkbox>
                        <b-card class="mt-2" v-if="infantryVisible">
                            <b-form-checkbox  v-model="form.category.infantry.volunteer"  size="sm" value="Volunteer">
                                Infantry
                            </b-form-checkbox>
                            <b-form-checkbox  v-model="form.category.infantry.information"  size="sm" value="InfoSharer">
                                Share Valuable Information
                            </b-form-checkbox>
                        </b-card>

                        <br>
                        <h6 class="text-xs">Select <span class="text-blue-500 font-bold">MEDIC</span> if you want to help someone by providing <span class="text-blue-500 font-bold"> Health related information</span> or by providing  <span class="text-blue-500 font-bold">MEDICAL HELP (first aid)</span>  in person.</h6>

                        <b-form-checkbox   @change="makeVisible" size="sm" >
                            Medic
                        </b-form-checkbox>
                        <b-card  class="mt-2" v-if="medicVisible">
                            <label class="text-blue-500 font-semibold text-sm">Health related Occupation:</label>
                            <input class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Doctor/Medical Student/Nurse" v-model="form.category.medic.degree" >
                            <b-form-checkbox  v-model="form.category.medic.firstAid"  size="sm" value="First Aid">
                                First Aid
                            </b-form-checkbox>
                            <b-form-checkbox  v-model="form.category.medic.information"  size="sm" value="InfoSharer">
                                Share Health related Information
                            </b-form-checkbox>

                        </b-card>
                    </div>
                    <br>
                    <div>
                        <label class="text-blue-500 font-semibold text-base">Choose Your Current Location:</label>
                        <b-card>
                            <location :center="this.form.userCoordinates"></location>
                        </b-card>
                    </div>
                </b-form>
                <b-form v-else id="loginSheet" align="left">
                    <label class="font-medium text-lg text-blue-700">User Name:</label>
                        <b-form-input
                                v-model="userIn.username"
                                required
                                placeholder="Enter Username"
                        ></b-form-input>

                    <br>
                    <label class="font-medium text-lg text-blue-700">Password:</label>
                        <b-form-input
                                v-model="userIn.password"
                                type="password"
                                required
                                placeholder="Enter Password"
                                description="Input a valid email address."
                        ></b-form-input>


                    </b-form>
                <br>
                <div id="buttons">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" v-on:click="onLogin" v-if="!next && !show" >Login</button>
                    <br>
                    <p class="text-sm" v-if="!next && !show">Don't have an Account?
                        <button v-on:click="onSignUp"  class="text-sm text-blue-500 underline" >SignUp</button>
                    </p>

                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  v-on:click="onNext" v-if="!next && show">Next</button>
                    <br>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  v-on:click="onSubmit" v-if="next && !show">Submit</button>
                    <p class="text-sm" v-if="next||show">Already have an Account?
                        <button v-on:click="onLogin"  class="text-sm text-blue-500 underline" >login</button>
                    </p>

                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import location from "./location";
    export default {
        components: {
            location
        },
        data() {

            return {
                renderKey: 1,
                form: {
                    email: '',
                    name: '',
                    username: '',
                    password: '',
                    phoneNo: "",
                    userCoordinates:{
                        lat:"",
                        lng:"",
                    },
                    category:{
                        infantry:{
                            ready:"",
                            volunteer:"",
                            information:""
                        },
                        medic:{
                            ready:"",
                            firstAid:"",
                            information:"",
                            degree:" "
                        }
                    }
                },

                existingId: this.$store.state.user,
                userIn: {
                    username: "",
                    password: ""
                },
                show: false,
                next:false,
                medicVisible: false,
                infantryVisible:false
            }
        },
        created() {
            //get useer location
            this.$getLocation({}).then(coordinates =>{
                this.form.userCoordinates.lat=coordinates.lat;
                this.form.userCoordinates.lng=coordinates.lng;
            }).catch(error=>{
                alert(error +"\nNeed location access to find nearby users")
            })
        },
        // computed:{
        //     userId(){
        //         this.$store.state.user;
        //     }
        // },
         methods: {
            onSubmit() {
                if (this.form.category.infantry.ready==false){
                    this.form.category.infantry.information="";
                    this.form.category.infantry.volunteer="";
                }
                if (this.form.category.medic.ready==false){
                    this.form.category.medic.information="";
                    this.form.category.medic.firstAid="";
                    this.form.category.medic.degree="";
                }
                this.form.userCoordinates=this.$store.state.userCoord;
                this.$store.state.user.push(this.form);
                console.log(this.form)
                console.log(this.$store.state.user[0])

                this.show=false;
                this.next=false;
                this.renderKey++
            },
             onNext() {
                 this.next=true;
                 this.show=false;
                 this.renderKey++;
             },
             makeVisible(){
                if(this.medicVisible==true){
                    this.medicVisible=false;
                    console.log(this.medicVisible)
                }else {
                    this.medicVisible = true;
                    console.log(this.medicVisible)
                }
             },
             makeInfantryVisible(){
                 if(this. infantryVisible==true){
                     this. infantryVisible=false;
                     console.log(this. infantryVisible)
                 }else {
                     this. infantryVisible = true;
                     console.log(this. infantryVisible)
                 }
             },

            onLogin(){
                this.show=false;
                this.next=false;
                console.log(this.userIn);
                this.existingId.forEach((user, i) => {
                    if (this.userIn.username==user.username){
                        if(this.userIn.password ==user.password) {
                            // this.$store.commit('setAuthentication',true);
                            // this.$store.commit('setUser',user);
                            // this.$router.replace({ name: "home" });
                        }else {
                            console.log("wrong Password");
                        }
                    }else {
                        console.log("wrong username");
                    }
                });
        //
        //
        //
            },
            onSignUp(){
                this.show=true;
                this.next=false;
            }

         }
    }
</script>

<style scoped>

</style>