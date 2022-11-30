class Message {
  constructor(message) {
    this.requestId = message?.requestId || null;
    this.origin = message?.origin || null;
    this.originType = message?.originType || null
    this.destination = message?.destination || null;
    this.destinationType = message?.destinationType || null;
    this.messageData =
      message && message.messageData
        ? new MessageData(message.messageData)
        : null;
    this.type = message?.type || null;
  }
  setRequestId(requestId) {
    this.requestId = requestId;
  }
  setOrigin(origin) {
    this.origin = origin;
  }
  setOriginType(originType) {
    this.originType = originType;
  }
  setDestination(destination) {
    this.destination = destination;
  }
  setDestinationType(destinationType) {
    this.destinationType = destinationType;
  }
  setMessageData(messageData) {
    this.messageData = messageData;
  }
  setType(type) {
    this.type = type;
  }
  getRequestId() {
    return this.requestId;
  }
  getOrigin() {
    return this.origin;
  }
  getOriginType() {
    return this.originType;
  }
  getDestination() {
    return this.destination;
  }
  getDestinationType() {
    return this.destinationType;
  }
  getMessageData() {
    return this.messageData;
  }
  getType() {
    return this.type;
  }
  toJSON() {}

  isValidOrigin(origin) {
    if (origin.includes(this.origin)) {
      return true;
    }
    return false;
  }
  isValidType(types) {
    if (types.includes(this.type)) {
      return true;
    }
    return false;
  }
  isValidDestination(destination) {
    if (destination.includes(this.destination)) {
      return true;
    }
    return false;
  }
}

class MessageData {
  constructor(messageData) {
    this.actionMethod = messageData?.actionMethod || null;
    this.args = messageData?.args || null;
    this.status = messageData?.status || "Pending";
    this.data = messageData?.data || null;
    this.messageText = messageData?.messageText || null;
  }
  setActionMethod(method) {
    this.actionMethod = method;
  }
  setArguments(args) {
    this.args = args;
  }
  setStatus(status) {
    this.status = status;
  }
  setData(data) {
    this.data = data;
  }
  setMessageText(text) {
    this.messageText = text;
  }

  getActionMethod() {
    return this.actionMethod;
  }
  getArguments() {
    return this.args;
  }
  getStatus() {
    return this.status;
  }
  getData() {
    return this.data;
  }
  getMessageText() {
    return this.messageText;
  }
  toJSON() {}
}

// type of message
// connection
// acknowldedment
// loaded

export { Message, MessageData };
