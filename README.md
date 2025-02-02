# Validador de Bandeiras de Cartão de Crédito

Este projeto implementa um validador de bandeiras de cartão de crédito utilizando JavaScript. O objetivo é verificar se um número de cartão é válido com base no algoritmo de Luhn e identificar sua bandeira.

## Sobre o Projeto

Este código faz parte do Bootcamp **Microsoft AI for Tech - GitHub Copilot** da DIO e foi desenvolvido utilizando o **GitHub Copilot** para auxiliar na implementação.

## Funcionalidades

- **Validação de Cartões**: O código verifica se um cartão é válido com base no algoritmo de Luhn.
- **Identificação da Bandeira**: Suporta bandeiras como Visa, Mastercard, Elo, American Express e Hipercard.
- **Remoção de Caracteres Inválidos**: Elimina espaços e caracteres não numéricos antes da validação.

## Como Funciona

1. **Identificação da Bandeira**:

   - O código usa expressões regulares para verificar se o número do cartão corresponde a uma das bandeiras conhecidas.

2. **Validação com o Algoritmo de Luhn**:
   - O algoritmo de Luhn é aplicado para garantir que o cartão é matematicamente válido.

## Exemplo de Uso

```javascript
const result = validateCard("5515021834018528");
console.log(result); // { valid: true, network: 'Mastercard' }
```

## Estrutura do Código

### Definição de Bandeiras

```javascript
const CARD_NETWORKS = {
  VISA: { pattern: /^4[0-9]{12}(?:[0-9]{3})?$/, name: "Visa" },
  MASTERCARD: {
    pattern: /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/,
    name: "Mastercard",
  },
  ELO: {
    pattern:
      /^(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369)([0-9]{10}|[0-9]{12})$/,
    name: "Elo",
  },
  AMEX: { pattern: /^3[47][0-9]{13}$/, name: "American Express" },
  HIPERCARD: {
    pattern:
      /^(384100|384140|384160|606282|637095|637599|637609|637612)[0-9]{10,12}$/,
    name: "Hipercard",
  },
};
```

### Funções Principais

```javascript
function validateCard(cardNumber) {
  const number = cardNumber.replace(/\D/g, "");
  if (!number || number.length < 13 || number.length > 19)
    return { valid: false, network: null };
  if (!luhnCheck(number)) return { valid: false, network: null };
  return { valid: true, network: identifyNetwork(number) };
}
```

```javascript
function luhnCheck(number) {
  let sum = 0;
  let alternate = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));
    if (alternate) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}
```

```javascript
function identifyNetwork(number) {
  for (const [key, network] of Object.entries(CARD_NETWORKS)) {
    if (network.pattern.test(number)) {
      return network.name;
    }
  }
  return null;
}
```

## Contribuição

Este projeto foi criado no contexto do Bootcamp da DIO. Caso queira contribuir, fique à vontade para sugerir melhorias!

## Licença

Este projeto é de uso educacional e pode ser modificado conforme necessário.
