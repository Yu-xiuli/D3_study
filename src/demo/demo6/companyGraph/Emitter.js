import Base from './Base';

export default class Emitter extends Base {
  constructor() {
    super(
      {
        __target__: document.createDocumentFragment(),
        listeners: {},
      },
      ...arguments
    );
  }
  on(type, listener) {
    const callback = (e) => listener(...e.detail);
    this.__target__.addEventListener(type, callback);
    return () => {
      this.__target__.removeEventListener(type, callback);
    };
  }
  emit(type, ...args) {
    this.__target__.dispatchEvent(
      new CustomEvent(type, {
        detail: args,
      })
    );
  }
}
