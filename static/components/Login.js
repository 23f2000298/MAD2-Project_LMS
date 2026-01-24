export default{
    template:`
    <div class=" row border">
        <div class =  "col" style="height: 750;">
            <div class = "border mx-auto mt-5" style="height: 400px;width: 300px;">
               <div>
                <h2 class = "text-center">Login Form</h2>
                <p class="text-danger">{{message}}</p>
                <div>
                    <label for="email">Enter Your Email:</label>
                    <input type="text" id="email" v-model="formdata.email" placeholder="Enter Your Email">
                </div>
                <div>
                    <label for="password">Enter Your Password:</label>
                    <input type="password" id="pass" v-model="formdata.password" placeholder="Enter Your Password">
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
            formdata: {
                email: "",
                password: ""
            },
            message:""
        }
    },
    methods: {
        loginUser:function(){
            let response = fetch("/api/login",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.formdata)
            })
            .then(response => response.json())
            if (response.ok){
                response.then(data =>{
                    localStorage.setItem("auth_token",data["auth-token"])
                    localStorage.setItem("id",data.id)
                    this.$router.push("/dashboard")
                })

            
            }
            else{
                response.then(data => this.message = data.message)
            }
        }
    }
}
