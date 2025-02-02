const CARD_NETWORKS = {
  VISA: {
    pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
    name: "Visa",
  },
  MASTERCARD: {
    pattern: /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/,
    name: "Mastercard",
  },
  ELO: {
    pattern:
      /^(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369)([0-9]{10}|[0-9]{12})$/,
    name: "Elo",
  },
  AMEX: {
    pattern: /^3[47][0-9]{13}$/,
    name: "American Express",
  },
  HIPERCARD: {
    pattern:
      /^(384100|384140|384160|606282|637095|637599|637609|637612)[0-9]{10,12}$/,
    name: "Hipercard",
  },
};

function validateCard(cardNumber) {
  // Clean input
  const number = cardNumber.replace(/\D/g, "");

  // Basic validation
  if (!number || number.length < 13 || number.length > 19) {
    return { valid: false, network: null };
  }

  // Luhn check
  if (!luhnCheck(number)) {
    return { valid: false, network: null };
  }

  // Identify network
  const network = identifyNetwork(number);

  return {
    valid: true,
    network: network,
  };
}

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

function identifyNetwork(number) {
  for (const [key, network] of Object.entries(CARD_NETWORKS)) {
    if (network.pattern.test(number)) {
      return network.name;
    }
  }
  return null;
}

// Use:
const result = validateCard("5515021834018528");
console.log(result); // { valid: true, network: 'Visa' }
