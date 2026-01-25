export default{
        template:`
        <div>
        <h2>Welcome, {{userData.username}}</h2>
        <div class=" row border">
        <div class =  "col-8" style="height: 750;">
            <h2>Your Transactions</h2>
            <div v-for = "t in transactions" class = "card">
            <div class="card-body">
                <h5 class="card-title">{{t.name}} <span class="badge bg-secondary">{{t.type}}</span> </h5>
                <p class="card-text">created on {{t.date}}</p>
                <p class="card-text">Delivery: {{t.delivery}}</p>
                <p class="card-text">About: {{t.description}}</p>
                <p class="card-text">From: {{t.source}} to {{t.destination}}</p>
                <p class="card-text">Amount: {{t.amount}}</p>
                
            </div>
        </div>
            </div>
            <div class = "col-4 border" style="height: 750px;">

        </div>
        </div>
  
    </div>`,
    data:function(){
        return {
            userData:"",
            transactions: null
            }

        },
    mounted(){
        fetch("/api/home",{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "authentication-token": localStorage.getItem("auth_token")
            },
        })
        .then(response => response.json())
        .then(data => this.userData = data)
        fetch("/api/get",{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "authentication-token": localStorage.getItem("auth_token")
            },
        })
        .then(response => response.json())
        .then(data => this.transactions = data)
    }
}