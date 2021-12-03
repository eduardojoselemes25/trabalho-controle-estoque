function cadastrarProd() {
    let estoque = JSON.parse(localStorage.getItem("estoque"));
    if (estoque === null) estoque = [];

    let produto = document.getElementById("nomeProduto").value;
    let codigo = document.getElementById("codigoProduto").value;
    let quantidadeProduto = document.getElementById("quantidadeProduto");
    let quantidade = quantidadeProduto.options[quantidadeProduto.selectedIndex].value;

    if (!validar(produto, 'produto')) return alert("Digite um nome válido!");
    if (!validar(codigo, 'codigo')) return alert("Digite um código válido!");
    if (quantidade == "") return alert("Selecione a quantidade!");

    let cadastrar = confirm("Deseja cadastrar as informações deste produto?");
    if (cadastrar) {

        let prod = {    
            produto: produto,
            codigo: codigo,
            quantidade: quantidade
        }

        if (existeNome(prod, estoque) && !existeCodigo(prod, estoque)) return alert("Já existe um produto com esse nome cadastrado, tente um nome diferente!");
        if (!existeNome(prod, estoque) && existeCodigo(prod, estoque)) return alert("Já existe um produto com esse código cadastrado, tente um código diferente!");

        let prodExist = existeProduto(prod, estoque);
        console.log(prodExist);

        if (!prodExist) estoque.push(prod);
        else {
            let objIndex = estoque.findIndex((elem => prod.codigo == elem.codigo));
            estoque[objIndex].quantidade = parseInt(estoque[objIndex].quantidade)+parseInt(prod.quantidade);
        }

        limparCampo()
        localStorage.setItem("estoque", JSON.stringify(estoque));
        totalEstoque();
    }
}

function existeNome(prod, estoque) {
    return estoque.some(elem => prod.produto === elem.produto);
}

function existeCodigo(prod, estoque) {
    return estoque.some(elem => prod.codigo === elem.codigo);
}

function existeProduto(prod, estoque) {
    return estoque.some(elem => prod.produto === elem.produto && prod.codigo === elem.codigo);
}

function validar(valor, tipo) {
    let padrao = "";
    switch (tipo) {
        case 'produto':
            padrao = /^([a-zA-Z0-9]{1,25})$/i;
            break;
        case 'codigo':
            padrao = /^([a-zA-Z]{2})-([0-9]{5,10})$/i;
            break;
    }
    return (padrao.test(valor)) ? true : false;
}

function limparCampo() {
    document.getElementById("nomeProduto").value = "";
    document.getElementById("codigoProduto").value = "";
    document.getElementById("quantidadeProduto").options.selectedIndex = 0;
}

function listaEstoque() {
    let estoque = JSON.parse(localStorage.getItem("estoque"));
    if (estoque === null) estoque = [];
    for (let i = 0; i < estoque.length; i++) {
        document.write("<div style='padding: 15px'>");
        document.write("<h2 style='padding: 10px'>" + "Item: " + estoque[i].produto + "</h2>");
        document.write("<ul>");
        document.write("<li>" + "Código do Produto: " + estoque[i].codigo + "</li>");
        document.write("<li>" + "Quantidade no Estoque: " + estoque[i].quantidade + "</li>");
        document.write("</ul>");
        document.write("</div>");
    }
}

function totalEstoque() {
    let estoque = JSON.parse(localStorage.getItem("estoque"));
    let totalEstoque = (estoque === null) ? 0 : estoque.length;
    document.getElementById("totalEstoque").innerHTML = totalEstoque;
}