export default{
    template:`
    <div class=" row border">
        <div class =  "col" style="height: 750;">
            <div class = "border mx-auto mt-5" style="height: 400px;width: 300px;">
               <div>
                <p class="mx-2 mt-3 text-danger">{{message}}</p>
                <h2 class = "text-center">Login Form</h2>
                <div class="mx-2 mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" v-model="formData.email">
                </div>
                <div class="mx-2 mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="formData.password">
                </div>
                <div class="mx-2 mb-3 text-center">
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
                if (Object.keys(data).includes("auth-token")){
                    localStorage.setItem("auth_token",data["auth-token"])
                    localStorage.setItem("id",data.id)
                    localStorage.setItem("username",data.username)
                    this.$router.push("/dashboard")
                }
                else{
                    this.message = data.message
                }
            })

            
        }
           
    }
 }
    

