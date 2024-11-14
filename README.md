# Pokédex

A Pokédex é uma aplicação web criada para exibir uma lista de Pokémon, com a possibilidade de visualizar detalhes específicos de cada um. O projeto foi desenvolvido com o objetivo de explorar tecnologias modernas para criar uma interface interativa e responsiva, simulando a experiência de uso de uma Pokédex no navegador.

## Funcionalidades

- **Listagem de Pokémon**: Exibe uma lista inicial de 10 Pokémon, com carregamento incremental para visualizar mais conforme o usuário avança.
- **Visualização de Detalhes**: Permite acessar detalhes de um Pokémon específico ao clicar na lista, incluindo suas habilidades e estatísticas.
- **Filtro de Tipo**: Um seletor no cabeçalho permite filtrar os Pokémon por tipo, exibindo apenas aqueles correspondentes.
- **Modo Claro/Escuro**: Utiliza um botão de alternância para o usuário escolher entre os modos claro e escuro, utilizando Context API.
- **Persistência de Estado**: Ao navegar entre a lista e a página de detalhes, a aplicação preserva o estado do filtro selecionado e da lista carregada.

## Ferramentas Utilizadas

- **React**: Escolhido por sua modularidade e facilidade de criação de componentes reutilizáveis, permitindo uma interface dinâmica e escalável.
- **Styled Components**: Facilitou o uso de estilos em CSS diretamente nos componentes, proporcionando um estilo escopo específico e suportando o tema claro/escuro.
- **Context API**: Usada para gerenciar o estado global, especialmente para o modo claro/escuro e filtros, simplificando a comunicação entre os componentes.
- **React Router DOM**: Utilizado para o gerenciamento de rotas, permitindo uma navegação eficiente entre a lista de Pokémon e a página de detalhes. Sua integração fácil com o React e capacidade de preservação de estado foram ideais para uma aplicação de múltiplas páginas.

Essas ferramentas foram escolhidas pela sua popularidade e eficiência no desenvolvimento de interfaces interativas e responsivas, bem como pela sua integração natural com as melhores práticas de React.

## Decisões no Desenvolvimento 

- **Carregamento Incremental**: Decidi carregar inicialmente apenas 10 Pokémon para otimizar o desempenho e melhorar a experiência do usuário. Novos Pokémon são carregados sob demanda, tornando a navegação mais ágil.
- **Persistência de Estado**: Optei por manter o estado do filtro e da lista de Pokémon ao navegar para a página de detalhes e retornar, visando uma experiência mais fluida para o usuário.
- **Uso de Context API para Tema**: A escolha do Context API para gerenciar o tema claro/escuro foi feita para evitar prop drilling e centralizar a configuração do tema em um único ponto.

## Como Rodar o Projeto

1. Clone o repositório: 

```bash
git clone https://github.com/seu-usuario/pokedex.git
cd pokedex
```

2. Instale as dependências:

```bash
npm install
```

3. Inicialize o servidor de desenvolvimento: 

```bash
npm run dev
```