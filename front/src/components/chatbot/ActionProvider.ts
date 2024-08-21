class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet() {
    const greetingMessage = this.createChatBotMessage("¡Hola! ¿Cómo puedo ayudarte?");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, greetingMessage],
    }));
  }

  handleBuyProduct() {
    const buyMessage = this.createChatBotMessage("Claro, te redirigiré a la página de productos.");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, buyMessage],
    }));
    setTimeout(() => {
      window.location.href = '/Products';
    }, 2000);
  }
}

export default ActionProvider;