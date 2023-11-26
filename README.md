<h1>Desafio Escribo 2</h1>
<h2> API para exibir informações de usuários autenticados</h2>
<h6> Aviso o servidor pode demorar um pouco a responder algumas requisições devido a natureza gratuita da hospedagem</h6>

<h2>Decrição do projeto</h2>
<h3>Requisitos técnicos</h3>
<ul>
	<li>Framework: Express :computer:</li>
	<li>Task runner: Npm script :athletic_shoe:</li>
	<li>Webpack para buildar a aplicação:package:</li>
	<li>Gerenciamento de dependências: npm :hammer_and_wrench: </li>
	<li>Criptografia: bcryptjs :lock: </li>
	<li>Autenticação: Jsonwebtoken :clipboard: </li>
	<li>Padronização: EsLint :bar_chart: </li>
	<li>Testes Unitários: Jest :mag: </li>

</ul>
<h2>Rotas</h2> 
<h4>Atráves do insomnia ou outra ferramenta</h4>
	
| Método | URL                                            |
|--------|------------------------------------------------|
| POST   | https://desafio-escribo2-api.onrender.com/api/signup   |
| POST   | https://desafio-escribo2-api.onrender.com/api/signin  |
| GET    | https://desafio-escribo2-api.onrender.com/api/seeInfo |
</ul>

<h2>Testes</h2>
<h3>Para executar os testes utilize esses comandos: </h3>

``` git clone https://github.com/dxArtur/desafio_escribo2```

<h6>Navegue até a raiz da aplicação e em seguida:</h6>

``` npm run test```
	
</ul>

<h2>Instruções gerais</h2>
<h6> A aplicação funciona apenas no formato Json</h6>

![image](https://github.com/dxArtur/desafio_escribo2/assets/49910101/b4c7a007-044d-4fd9-9d60-3fca2e6db0d6)

<h6> Mudá-lo implica no middleware de erro</h6>

![image](https://github.com/dxArtur/desafio_escribo2/assets/49910101/d8b7673d-3835-4209-84b1-b12cf4bc47c4)


<h6>Token necessário apenas nas rotas do tipo : [GET] </h6>

![image](https://github.com/dxArtur/desafio_escribo2/assets/49910101/53c243c5-867f-4de6-ac62-70b33db479d3)

<h3>Modelo de saída de dados </h3>	
<h6>O formato das horas obedece ao fuso horário de São Paulo </h6>

![image](https://github.com/dxArtur/desafio_escribo2/assets/49910101/71bb5801-902b-4827-98d6-253499e757e3)


<h2>Exemplo de json p/ teste </h2>	
{
"nome":"Seu Nome",
"email": "SeuEmail@example.com",
"senha": "senha123",
"telefones": [ {"numero": "123456789", "ddd": "11"}] 
}</p>





