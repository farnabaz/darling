import React from 'react';


class ViewRegistery {

  constructor() {
    this.providers = new WeakMap
    this.views = new WeakMap
  }

  addViewProvider(modelConstructor, viewConstructor) {
    this.providers.set(modelConstructor, viewConstructor)
  }

  getViewProvider(model) {
    if (typeof model === "object") {
      return this.providers.get(model.constructor)
    } else if (typeof model === "function") {
      if (model.prototype.isReactComponent !== void 0) {
        return model;
      }
      return this.providers.get(model);
    }
    return void 0;
  }

  getView(model, options) {
    var view = this.views.get(model)
    if (!view) {
      view = this.createView(model, options)
    }
    return view;
  }

  getElement(model, options) {
    return this.createView(model, options);
  }

  createView(model, options) {
    var Provider = this.getViewProvider(model);
    var view = null;
    if (!Provider) {
      view =  React.DOM.noscript()
    } else {
      options = options || {};
      options.model = model;
      options.id = model.getID && model.getID();
      options.ref = (view) => {
        this.views.set(model, view);
      }
      view = React.createElement(Provider, options);
    }
    return view;
  }

  /**
   * invalidate and remove models view from map
   */
  invalidate(model) {
    this.views.delete(model);
  }
}
export default new ViewRegistery()
