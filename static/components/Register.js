export default{
    template:`
    <div class=" row border">
        <div class =  "col" style="height: 750;">
            <div class = "border mx-auto mt-5" style="height: 400px;width: 300px;">
               <div>
                <h2 class = "text-center">Login Form</h2>
                <div>
                    <label for="email">Enter Your Email:</label>
                    <input type="text" id="email" v-model="formdata.email" placeholder="Enter Your Email">
                </div>
                <div>
                    <label for="username">Enter Your username:</label>
                    <input type="text" id="username" v-model="formdata.username" placeholder="Enter Your username">
                </div>
                <div>
                    <label for="password">Enter Your Password:</label>
                    <input type="password" id="pass" v-model="formdata.password" placeholder="Enter Your Password">
                </div>
                <div>
                    <button class="btn btn-primary" @click="addUser">Register</button>
                </div>
            </div>
            </div>

        </div>
    </div>`,
    data(){
        return{
            formdata: {
                email: "",
                password: "",
                username: ""
            }
        }
    },
    methods: {
        addUser:function(){
            fetch("/api/register",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.formdata)
            })
            .then(response => response.json())
            .then(data => {
                alert(data["message"])
                this.$router.push("/login")

            })
            
            }
        }
    }
