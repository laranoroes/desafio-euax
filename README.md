# Artia.jr | Small Project Management System

Solução para o desafio Web Developer proposto pelo Grupo Euax. O sistema consiste em um CRUD para cadastro de projetos e atividades (com nome, data de início e data de finalização). O sistema deve ser capaz de informar a porcentagem realizada de cada projeto e, também, se está finalizado, observando dados das atividades. 

## Tecnologias

* HTML5
* CSS3
* JavaScript (ES6)

## Funcionamento

O sistema possui uma base de dados interna, criada em JavaScript, que é atualizada conforme interação do usuário com o formulário. Os dados são inicialmente apresentados na tela, dentro da tabela de Projetos Cadastrados. A partir da interação com projetos, as atividades relacionadas a cada um deles são apresentadas na tela para o usuário. 

O sistema é capaz de cadastrar projetos, cadastrar atividades relacionadas ao projeto selecionado, alterar dados dos itens cadastrados e excluir itens. Os projetos possuem colunas relacionadas aos dados cadastrados, e duas colunas (Completo, Atrasado) relacionadas ao andamento das suas atividades. 

## Problemas e melhorias

* Acredito que frameworks possam tornar o código mais legível e prático. 
* Uma base de dados acessada via requisição HTTP poderia gravar dados para outros momentos. Agora, o sistema é resetado cada vez que se atualiza a página.
* A responsividade da aplicação pode ser melhorada, principalmente caso seja acessada via mobile.
