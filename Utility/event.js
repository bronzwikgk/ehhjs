class ActionEvent {
  constructor(rawEvent) {
    if (!rawEvent || !rawEvent.target) {
      throw new Error("ActionEvent requires a valid DOM event with a target.");
    }

    const target = rawEvent.target;
    const attributes = target.attributes;

    this.originalEvent = rawEvent;
    this.type = rawEvent.type.toUpperCase(); // CLICK, SUBMIT, etc.
    this.target = target;
    this.request = this.parseRequest(attributes);
    this.payload = this.extractPayload(rawEvent);
  }

  parseRequest(attributes) {
    if (!attributes.request) {
      return null;
    }
    return {
      name: attributes.request?.value || null,
      onSuccess: attributes.onSuccess?.value || null,
      onFailure: attributes.onFailure?.value || null,
    };
  }

  extractPayload(rawEvent) {
    const target = rawEvent.target;
    if (this.type === "SUBMIT") {
      rawEvent.preventDefault();
      const formData = new FormData(target);
      return Object.fromEntries(formData.entries());
    }
    if (this.type === "INPUT" || this.type === "CHANGE") {
      return { value: target.value };
    }
    return {};
  }
}

export { ActionEvent };
