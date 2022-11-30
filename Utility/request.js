class Request {
  constructor(request) {
    let type = request.constructor.name;
    switch (type) {
      //Create request From The DOM Object
      case "NamedNodeMap": {
        this.setName(request?.request?.value || null);
        this.setStatus("Pending");
        this.setOnSuccess(request?.onSuccess?.value || null);
        this.setOnFailure(request?.onFailure?.value || null);
        this.setHref(request?.href?.value || null);
        this.setStartTime(Date.now());
        break;
      }
      // Create request from json
      case "Object": {
        this.setName(request.name || null);
        this.setStatus("Pending");
        this.setOnSuccess(request.onSuccess || null);
        this.setOnFailure(request.onFailure || null);
        this.setHref(request.href || null);
        this.setStartTime(Date.now());
      }
    }
  }
  // Setters
  setStartTime(startTime) {
    this.startTime = startTime;
  }
  setEndTime(endTime) {
    this.endTime = endTime;
  }
  setName(name) {
    if (!name) {
      throw new Error("Request Name Can not be Empty");
    }
    this.name = name;
  }
  setStatus(status) {
    this.status = status;
  }
  setOnSuccess(onSuccess) {
    if (!onSuccess) {
      return;
    }
    this.onSuccess = onSuccess;
  }
  setOnFailure(onFailure) {
    if (!onFailure) {
      return;
    }
    this.onFailure = onFailure;
  }
  setHref(link) {
    if (!link) {
      return;
    }
    this.href = link;
  }
  // Getters
  getName(name) {
    return this.name;
  }
  getStatus(status) {
    return this.status;
  }
  getOnSuccess(onSuccess) {
    return this.onSuccess;
  }
  getOnFailure(onFailure) {
    return this.onFailure;
  }
  getResponseTime() {
    return this.endTime - this.startTime;
  }
}

export { Request };
