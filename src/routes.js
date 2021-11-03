import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import VendedorController from './app/controllers/VendedorController';
import ClienteController from './app/controllers/ClienteController';
import ProdutoController from './app/controllers/ProdutoController';
import PedidoController from './app/controllers/PedidoController';


const routes = new Router();





//Rota de usuarios.
//====================================================

//Rota de usuarios.
//====================================================
//Cadastro usuario.
routes.post('/users', UserController.store);

//Gerar token usuario.
routes.post('/session', SessionController.store);


//Validar primeiro o acesso do usuario.
// routes.use(authMiddleware);

//Alterar dados usuario.
routes.put('/users', UserController.updateUser);

// //Selecionar dados usuario.
// routes.get('/user', UserController.selectedUserId);


// //Rota de produtos.
// //=================================================

// //Cadastro de produtos.
// routes.post('/produto', ProdutosController.store);

// //Cadastro de produtos.
// routes.put('/produto/:produto_id', ProdutosController.updateProduto);

// //Selecionar produtos
// routes.get('/produtos', ProdutosController.selectedProdutos);


//Rota de cliente.
//=================================================

//Cadastro de cliente.
routes.post('/clientes', ClienteController.store);

//Alterar dados cliente.
routes.put('/cliente/:cliente_id', ClienteController.update);

//Deletar cliente.
routes.delete('/cliente/:cliente_id', ClienteController.delete);


//Selecionar clientes
routes.get('/clientes', ClienteController.selected);




//Rota de produto.
//=================================================

//Cadastro de produto.
routes.post('/produtos', ProdutoController.store);

//Alterar dados produto.
routes.put('/produto/:produto_id', ProdutoController.update);

//Deletar produto.
routes.delete('/produto/:produto_id', ProdutoController.delete);


//Selecionar produtos
routes.get('/produtos', ProdutoController.selected);




//Rota de pedido.
//=================================================

//Cadastro de pedido.
routes.post('/pedidos', PedidoController.store);

//Alterar dados pedido.
routes.put('/pedido/:pedidoId', PedidoController.update);

//Deletar pedido.
routes.delete('/pedido/:pedidoId', PedidoController.delete);


//Selecionar pedidos
routes.get('/pedidos', PedidoController.selected);


//Alterar dados pedido.
routes.get('/pedido/:pedidoId', PedidoController.selectedItem);



export default routes;
