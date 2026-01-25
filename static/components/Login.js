export default{
    template:`
    <div class=" row border">
        <div class =  "col" style="height: 750;">
            <div class = "border mx-auto mt-5" style="height: 400px;width: 300px;">
               <div>
                <p class="text-danger">{{message}}</p>
                <h2 class = "text-center">Login Form</h2>
                <div>
                    <label for="email">Enter Your Email:</label>
                    <input type="text" id="email" v-model="formData.email" placeholder="Enter Your Email">
                </div>
                <div>
                    <label for="password">Enter Your Password:</label>
                    <input type="password" id="pass" v-model="formData.password" placeholder="Enter Your Password">
                </div>
                <div>
                    <button class="btn btn-primary" @click="loginUser">Login</button>
                </div>
            </div>
            </div>

        </div>
    </div>`,
    data(){
        return{
            formData: {
                email: "",
                password: ""
            },
            message:""
        }
    },
    methods: {
        loginUser:function(){
            fetch("/api/login",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.formData)
            })
            .then(response => response.json())

            .then(data =>{
                    localStorage.setItem("auth_token",data["auth-token"])
                    localStorage.setItem("id",data.id)
                    this.$router.push("/dashboard")
                })

            
            }
           
        }
 }
    

