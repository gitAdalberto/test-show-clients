fetch("/clientes")
.then(response => response.json())
.then(clientes =>{
    const tbody = document.querySelector("#clientes tbody");
    clientes.forEach(c => {
        const row = document.createElement("tr");
        row.innerHTML = 
        `
        <td>${c.ClienteID}</td>
        <td>${c.NombreCliente}</td>
        <td>${c.CorreoCliente}</td>
        <td>${c.TelefonoCliente}</td>
        `
        ;
        tbody.appendChild(row);
        
    });
})
.catch(err => {console.error("Error al cargar los clientes:",err)});