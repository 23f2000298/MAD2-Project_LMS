export default{
    template:`
    <div class=" row border">
     <div class =  "col" style="height: 750;">
        <div class = "border mx-auto mt-5" style="height: 400px;width: 300px;">
            {{userData.email}}
            {{userData.username}}
            {{userData.password}}
        </div>

     </div>
</div>`,
data:function(){
    return {
        userData:""
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
    .then(data => console.log(data))
}
}