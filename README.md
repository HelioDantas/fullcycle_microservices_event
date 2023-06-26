
# Microserviços de evento

Estudo de Microserviços e arquitetura hexagonal em cima da live fullcycle_microservices.


## Stack utilizada

**Back-end:** Node, Express, Typescript, postgres, Rabbitmq


## Etiquetas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Funcionalidades

- microserviço de evento
- microserviço de ticket
- microserviço de pagamento


## Instalação

### Criar banco de dados

#### Postgres
importar arquivo sql `psql -d fullcycle -f create.sql` 

### Rabbitmq


#### Docker
Rodar `docker cp create.sql postgres:/create.sql`
Rodar `docker exec -it postgres bash`
Rodar `psql postgres`
Rodar `create database fullcycle`
Rodar `\c fullcycle`
Rodar `\i /create.sql`

### Subindo microserviço de evento
Rodar `cd event`
Rodar `npm start`
Rodando teste `npm test`

### Subindo microserviço de ticket
Rodar `cd event`
Rodar `npm start`
Rodando teste `npm test`

### Subindo microserviço de pagamento
Rodar `cd event`
Rodar `npm start`


```bash
  npm install my-project
  cd my-project
```
    
## Documentação da API de Evento

#### Criar um Evento

```http
  POST /create_event
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `description` | `string` | **Obrigatório**. Descrição do Evento |
| `price` | `number` | **Obrigatório**. Preço do Evento |
| `capacity` | `number` | **Obrigatório**. Capacidade do Evento |


## Documentação da API de Ticket

#### Comprar um Ticket

```http
  POST /purchase_ticket
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `eventId` | `string` | **Obrigatório**. Id do Evento |
| `email` | `string` | **Obrigatório**. Email do Comprador |
| `creditCardToken` | `string` | **Obrigatório**. Tocken do Cartão de credito |



