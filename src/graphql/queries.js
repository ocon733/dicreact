/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      ingles
      fonetic
      spain
      frase
      nemo
      tipo
      createdAt
      updatedAt
    }
  }
`;

export const listTodos = /* GraphQL */  `
query listado {
  listTodos {
    items {
      fonetic
      frase
      id
      ingles
      nemo
      spain
      tipo
    }
  }
}
`;
/*
export const listTodos = 
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ingles
        fonetic
        spain
        frase
        nemo
        tipo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
*/