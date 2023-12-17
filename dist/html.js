"use strict";
/*!
 * Html-Builder JavaScript Library v1.1.0
 * https://github.com/Mubarrat/html-builder/
 *
 * Released under the MIT license
 * https://github.com/Mubarrat/html-builder/blob/main/LICENSE
 */
class Html {
    constructor(...elements) {
        if (!Array.isArray(elements)) {
            throw new Error("Invalid elements provided");
        }
        this.elements = elements;
    }
    build() {
        const fragment = document.createDocumentFragment();
        for (const element of this.elements) {
            fragment.appendChild(element.build());
        }
        return fragment;
    }
}
class HtmlAttributes {
    constructor(attributes = {}) {
        if (typeof attributes !== "object") {
            throw new Error("Invalid attributes provided");
        }
        this.attributes = attributes;
    }
    build(element) {
        for (const attr of Object.keys(this.attributes)) {
            const value = this.attributes[attr];
            if (attr === 'class') {
                element.classList.add(...value.split(' '));
            }
            else if (attr === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            }
            else if (attr === 'on' && typeof value === 'object') {
                for (const eventName in value) {
                    this.addEvents(element, eventName, false, value[eventName]);
                }
            }
            else if (attr.startsWith('on')) {
                this.addEvents(element, attr.toLowerCase().substring(2), false, value);
            }
            else if (attr === 'data' && typeof value === 'object') {
                for (const name in value) {
                    const data = value[name];
                    element.setAttribute(`data-${name}`, typeof data === 'object'
                        ? JSON.stringify(data)
                        : data);
                }
            }
            else {
                element.setAttribute(attr, typeof value === 'object'
                    ? JSON.stringify(value)
                    : value);
            }
        }
        return element;
    }
    addEvents(element, eventName, useCapture = false, ...events) {
        for (const event of events) {
            if (typeof event === 'function') {
                element.addEventListener(eventName, event, useCapture);
            }
            else if (Array.isArray(event)) {
                this.addEvents(element, eventName, useCapture, ...event);
            }
        }
        return this;
    }
}
class HtmlItem {
    constructor(tagName, attributes = {}, ...children) {
        if (!tagName || typeof tagName !== "string") {
            throw new Error("Invalid tagName provided");
        }
        if (!(attributes instanceof HtmlAttributes || (attributes && Object.getPrototypeOf(attributes) === Object.prototype))) {
            throw new Error("Invalid attributes provided");
        }
        if (!Array.isArray(children)) {
            throw new Error("Invalid children provided");
        }
        this.tagName = tagName.trim();
        this.attributes =
            attributes instanceof HtmlAttributes
                ? attributes
                : new HtmlAttributes(attributes);
        this.children = children;
    }
    build() {
        const element = document.createElement(this.tagName);
        this.attributes.build(element);
        this.appendChildren(element, this.children);
        return element;
    }
    appendChildren(parentElement, ...children) {
        for (const child of children) {
            switch (typeof child) {
                case "string":
                    parentElement.appendChild(document.createTextNode(child));
                    break;
                case "object":
                    if (Array.isArray(child)) {
                        this.appendChildren(parentElement, ...child);
                    }
                    else {
                        parentElement.appendChild(child instanceof HtmlItem
                            ? child.build()
                            : document.createTextNode(JSON.stringify(child)));
                    }
                    break;
                default:
                    parentElement.appendChild(document.createTextNode(String(child)));
                    break;
            }
        }
        return this;
    }
    static createProxy() {
        return new Proxy(this, {
            get: function (target, prop) {
                if (prop in target) {
                    return target[prop];
                }
                else {
                    const tagName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
                    return function (attributes, ...children) {
                        if (!(attributes instanceof HtmlAttributes || (attributes && Object.getPrototypeOf(attributes) === Object.prototype))) {
                            return new HtmlItem(tagName, {}, attributes, ...children);
                        }
                        return new HtmlItem(tagName, attributes, ...children);
                    };
                }
            },
        });
    }
}
(function (globals) {
    "use strict";
    globals.$html = HtmlItem.createProxy();
}(this));
//# sourceMappingURL=html.js.map