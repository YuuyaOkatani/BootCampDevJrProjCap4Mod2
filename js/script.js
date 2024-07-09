var clientes = []







function salvar() {

    // Número do imóvel
    doc5 = document.getElementById('inputNumero').value;


    var validation = true;

    var cliente = {
        id: clientes.length,
        nome: doc1,
        sobrenome: doc2,
        cep: doc3,
        endereco: doc4,
        numero: doc5,
        bairro: doc6,
        cidade: doc7,
        estado: doc8,

    }

    // Valida se todos os campos estão preenchidos
   
    for (let docs in cliente) {
        if (cliente[docs] === '') {
            validation = false;
            console.log(docs);
           
        }

    }

    // Adiciona os dados ao array de clientes caso tudo estiver correto
    if (validation) {
        addNewRow(cliente)
        clientes.push(cliente)
        document.getElementById('formClientes').reset()
        console.log(clientes)
        $("#inputNumero").prop("disabled", true);
        
    }



}

// Procura os dados do CEP
function search() {


    change({})
    var url = `https://opencep.com/v1/${doc3}`
    $.getJSON(url, (data) => {

        change(data)
        $("#inputNumero").prop("disabled", false);
        document.getElementById('alerta').innerHTML = ''


    })
        .fail(() => {
            console.log("Error")
            $("#inputNumero").prop("disabled", true);
            document.getElementById('alerta').innerHTML = `<div class="col-4 mt-4 p-1 text-danger"  text-danger">CEP inválido</div>`
        })
}

// Nova linha na tabela
function addNewRow(cliente) {



    var table = document.getElementById('tableClientes')
    // Uma nova linha na tabela
    var newRow = table.insertRow()
    var idnode = document.createTextNode(cliente.id)
    // uma nova célula na linha da tabela
    var cell = newRow.insertCell();
    // Inserindo o texto na célula
    cell.appendChild(idnode)


    cell = newRow.insertCell();
    cell.innerHTML = `${cliente.nome} ${cliente.sobrenome}`;

    cell = newRow.insertCell();
    cell.innerHTML = cliente.endereco;

    cell = newRow.insertCell();
    cell.innerHTML = cliente.cep;

    cell = newRow.insertCell();
    cell.innerHTML = cliente.bairro;

    cell = newRow.insertCell();
    cell.innerHTML = cliente.cidade;

    cell = newRow.insertCell();
    cell.innerHTML = cliente.estado;



}

// Colocar dados nos valores do array Cliente
function change(data) {

    doc1 = document.getElementById('inputNome').value;
    doc2 = document.getElementById('inputSobrenome').value;
    doc3 = document.getElementById('inputCep').value.replace('-', '');


    doc4 = data.logradouro || ''
    doc6 = data.bairro || ''
    doc7 = data.localidade || ''
    doc8 = data.uf || ''



    document.getElementById('inputEndereco').value = data.logradouro || ''
    document.getElementById('inputBairro').value = data.bairro || ''
    document.getElementById('inputCidade').value = data.localidade || ''
    document.getElementById('inputEstado').value = data.uf || ''



}