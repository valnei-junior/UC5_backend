//importando servidor
const express = require('express');

//inicializando servidor
const app = express(); //inicializando servidor

app.use(express.json()); //habilitando o uso de json no servidor

const dotenv = require('dotenv'); //importando dotenv

dotenv.config(); //configurando variáveis de ambiente

const port = process.env.PORTA     //definindo porta do servidor

const produtos = []



//criando rota raiz do servidor ()
app.get('/', (requisicao, resposta) => { //rota raiz do servidor get = pegar informações do servidor 
  try{
    if (produtos.length === 0){
      return resposta.status(200).json({msg:"Não há produtos para serem exibidos"})
    }
    resposta.status(200).json(produtos) //resposta do servidor
  }catch (error) {
    resposta.status(500).json({msg:"Erro ao buscar produtos"})  //resposta do servidor caso ocorra erro
  }
  resposta.send('raiz do servidor!') //resposta do servidor 
})
app.post('/', (requisicao, resposta) => { //rota raiz do servidor get = pegar informações do servidor
try{
  const {id, nome, preco, quantidade} = requisicao.body; //pegando informações do corpo da requisição
  const novoProduto = {id, nome, preco, quantidade};  //criando novo produto

  produtos.push(novoProduto);
  resposta.status(201).json(novoProduto);

} catch (error) {
resposta.status(500).json({msg:"Erro ao adicionar produtos"})
}
})

//rota para editar produtos
app.put('/:id', (requisicao, resposta) => { //rota raiz do servidor get = pegar informações do servidor
  try{
    const {id} = requisicao.params.id; //pegando informações do corpo da requisição
    const produtos = produtos.find(produto => produto.id === id); //buscando produto pelo id e verificado se existe
    

    if (!produtos){
      return resposta.status(404).json({msg:"Produto não encontrado"}); //resposta da busca como erro
    }
    const {novonome, novopreco, novaquantidade} = requisicao.body;
    if (produtos){
      produtos.nome = novonome;
      produtos.preco = novopreco;
      produtos.quantidade = novaquantidade;
      return produtos
    }
    resposta.status(200).json (produtos)
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao adicionar produtos"})
  }
  })



app.get('/hello', (requisicao, resposta) => { //rota raiz do servidor get = pegar informações do servidor 
    resposta.send('Hello World!') //resposta do servidor 
  })
// ouvindo a porta 3000 e exibindo mensagem no console ou terminal
app.listen(port, () => { //inicializando servidor na porta definida 
  console.log(`Servidor rodando em http://localhost: ${port}`) //mensagem de inicialização do servidor 
})

//para encerra o servidor no terminal ou console aperte ctrl + c
//para rodar o servidor no terminal ou console digite node app.js
