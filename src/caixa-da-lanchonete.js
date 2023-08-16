//Mapa do cardapio contendo os itens e valores que serão utilizados nas funções;
const cardapio = {
    "cafe":3,
    "chantily":1.5,
    "suco":6.2,
    "sanduiche":6.5,
    "queijo":2,
    "salgado":7.25,
    "combo1":9.5,
    "combo2":7.5
  }
//Mapa dos métodos de pagamento, descontos e taxas que serão utilizados nas funções;
const tiposPagamento = {
    "debito": 1,
    "credito": 1.03,
    "dinheiro": 0.95
}
//Função que recebe uma String e retorna se a forma de pagamento existe ou não;

function validaMetodoPagamento(metodoDePagamento){
    if (metodoDePagamento in tiposPagamento) {
      return true;
    }else{
      return false;
    }
}

//Função que recebe uma Array e verifica se o Carrinho está vazio ou não;

function VerificaCarrinhoVazio(itens) {
    return itens.every(element => {
    return element.trim() === '';
    });
}

//Função que recebe uma Array e verifica se o item existe no cardápio ou não;
//Também verifica se a quantidade é invalida

function validaItem(itens){
    var item = new Array();
    const tamArray = itens.length;
    var nome;
    var quantidade;
    for (var a = 0; a < tamArray; a++){
      item = itens[a].split(",");
      nome = item[0];
      quantidade = item[1];
      if (quantidade <= 0){
        return "Qinvalida";
      }
      if (nome in cardapio) {
        return true;
      } else {
        return false;
      }
    }
}

//Função que recebe uma Array e verifica se existem itens extra sem o principal

function validaExtra(itens){
    const tamArray = itens.length;
    var nome;
    var item = new Array();
    var chant = false;
    var cafe = false;
    var sand = false;
    var queijo = false;
    for (var a = 0; a < tamArray; a++){
        item = itens[a].split(",");
        nome = item[0];
        if(nome == "chantily"){
          chant = true;
        }
        if(nome == "cafe"){
          cafe = true;
        }
      }
      if (chant == true && cafe == false){
       return false;
      }
      for (var a = 0; a < tamArray; a++){
        item = itens[a].split(",");
        nome = item[0];
        if(nome == "queijo"){
          queijo = true;
        }
        if(nome == "sanduiche"){
          sand = true;
        }
      }
      if (queijo == true && sand == false){
        return false;
      }
  }

  class CaixaDaLanchonete{
      calcularValorDaCompra(metodoDePagamento, itens) {
        var resultadoP = validaMetodoPagamento(metodoDePagamento);
        var resultadoI = validaItem(itens);
        var CarrinhoVazio = VerificaCarrinhoVazio(itens);
        var Extra = validaExtra(itens);
    
        if(resultadoP == false){
            return ("Forma de pagamento inválida!");
        }
        if(resultadoI == false){
            return ("Item inválido!");
        }
        if(CarrinhoVazio == true){
            return ("Não há itens no carrinho de compra!");
        }
        if(resultadoI == "Qinvalida"){
          return ("Quantidade inválida!");
        }
        if(Extra == false){
            return("Item extra não pode ser pedido sem o principal");
        }else{
            var item = new Array();
            var tamanho = itens.length;
            var comDesconto = 0;
            var semDesconto = 0;
            for (var i = 0; i < tamanho; i++){
              item = itens[i].split(",");
              var nome = item[0];
              var quantidade = Number(item[1]);
              semDesconto += cardapio[nome] * quantidade;  
            }
              comDesconto = semDesconto*tiposPagamento[metodoDePagamento];
              var Nvalor = comDesconto.toFixed(2);
              var resultado = Nvalor.toString();
              var ponto = ".";
              var Nresultado = resultado.replace(ponto,',');
        return ("R$ "+ Nresultado);
    }
    }
  }
export { CaixaDaLanchonete };
