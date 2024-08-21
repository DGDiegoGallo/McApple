class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hola")) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.includes("comprar")) {
      this.actionProvider.handleBuyProduct();
    }
  }
}

export default MessageParser;