window.addEventListener('DOMContentLoaded', (event) => {
       const baseaddress = "192.0.2.0"
       //const baseprefix = "24" 

       let zadani = []    
       let vysledek = []

       let tableBody = document.getElementById("tableBody")

       let checkButton = document.getElementById("checkButton")
       checkButton.addEventListener("click", function(){
              
              for (let index = 0; index < zadani.length; index++) {
                     //address
                     let address = document.getElementById("address" + index.toString())
                     
                     if(address.value == vysledek[index].address){
                            address.classList.remove("red")
                            address.classList.add("green")
                            
                     }
                     else{
                            address.classList.remove("green")
                            address.classList.add("red")
                     }
                     //broadcast
                     let broadcast = document.getElementById("broadcast" + index.toString())
                     
                     if(broadcast.value == vysledek[index].broadcast){
                            broadcast.classList.remove("red")
                            broadcast.classList.add("green")
                     }
                     else{
                            broadcast.classList.remove("green")
                            broadcast.classList.add("red")
                     }
                     //prefix
                     let prefix = document.getElementById("prefix" + index.toString())
             
                     if(prefix.value == vysledek[index].prefix){
                            prefix.classList.remove("red")
                            prefix.classList.add("green")
                     }
                     else{
                            prefix.classList.remove("green")
                            prefix.classList.add("red")
                     }
                     
              }
          })

       let resetButton = document.getElementById("resetButton")
       resetButton.addEventListener("click", function(){
              newZadani()
          })

       

       function getRndInteger(min, max) {
              return Math.floor(Math.random() * (max - min) ) + min;
            }

       
       
       function getPrefix(hostcount) {
              for (let index = 1; index < 8; index++) {
                            if (2 ** index > hostcount ) {
                                   return 32 - index // funguje jen pro prefix /24 a vetsi
                            }
                     
              }
              return 0
       }

       function addressToString(address = [0]){
              let retezec = ""
              for (const num of address) {           
                     retezec = retezec + num.toString() + "."
              }
              return retezec.slice(0, -1)
       }
       
       function newZadani(){

              //generace zadani
              zadani = []
                     for (let i = 0; i < getRndInteger(2, 6); i++) { // Pocet podsiti
                     zadani[i] = getRndInteger(3, 100) // pocet hostu
                            
                     }   
              

              zadani.sort(function(a, b){return b - a});  // seradit od nejvetsiho

              //console.log(zadani)

              //baseaddress to int[]
              let splitbaseaddress = baseaddress.split('.')
              let sba = [0];
              for (let i = 0; i < splitbaseaddress.length; i++) {
                     sba[i] = Number(splitbaseaddress[i])
                     
              }
              
              //Reseni vysledku
              for (let i = 0; i < zadani.length; i++) {
                     let subnet= {hostcount: zadani[i], address: "", broadcast: "", prefix: ""}
                     pocethostu = zadani[i]
                     subnet.address = addressToString([...sba])

                     let prefix = getPrefix(pocethostu)
                     subnet.prefix = prefix.toString()

                     sba[3] = Number(sba[3]) + 2 ** (32 - prefix)
                     let broadcast = [...sba]
                     broadcast[3] = broadcast[3] - 1
                     subnet.broadcast = addressToString(broadcast)


                     vysledek[i] = subnet 

                     
              }
              //console.log(vysledek)

              // Generace tabulky
              tableBody.innerHTML = null
              for (let index = 0; index < zadani.length; index++) {

                     let radek = document.createElement("tr")
                     radek.className = "mytr";

                     let cells = []    
                     cells.className = "cellstyle";             
                     for (let i = 0; i < 4; i++) {
                            cells.push(document.createElement("td"))
                     }
                     
                     //Pocet hostu
                     {
                     let p = document.createElement("p")
                     p.innerText = zadani[index]
                     cells[0].appendChild(p)
                     }
                     
                     // Address input
                     {let input = document.createElement("input")
                     input.id = "address" + index.toString()
                     input.className = "myinput"
                     cells[1].appendChild(input)}

                     //Broadcast input
                     {let input = document.createElement("input")
                     input.id = "broadcast" + index.toString()
                     input.className = "myinput"
                     cells[2].appendChild(input)}

                     //Prefix input
                     {let input = document.createElement("input")
                     input.id = "prefix" + index.toString()
                     input.className = "myinput"
                     cells[3].appendChild(input)}
                     
                     for (const cell of cells) {
                            radek.appendChild(cell)
                     }
                     tableBody.appendChild(radek)      
       }
}

newZadani()
       
   });