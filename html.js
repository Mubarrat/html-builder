/**
 * Html class to manage HTML element creation
 */
class Html {
    /**
     * Constructor to initialize HtmlItem elements
     * @param elements The elemenets
     */
    constructor(...elements) {
        // Validate elements as an array
        if (!Array.isArray(elements)) {
            throw new Error("Invalid elements provided");
        }
        this.elements = elements;
    }
    /**
     * Method to build and return a DocumentFragment
     * @returns Returns a DocumentFragment
     */
    build() {
        // Create a DocumentFragment
        const fragment = document.createDocumentFragment();
        // Append children to the DocumentFragment
        for (const element of this.elements) {
            fragment.appendChild(element.build());
        }
        // Return the DocumentFragment
        return fragment;
    }
}
/**
 * HtmlItem class representing HTML elements
 */
class HtmlItem {
    /**
     * Constructor to initialize HtmlItem elements
     * @param tagName The tag name of HTML element
     * @param attributes The attributes of HTML element
     * @param children The children of HTML element
     */
    constructor(tagName, attributes = {}, ...children) {
        // Validate tag name as a non-empty string
        if (!tagName || typeof tagName !== "string") {
            throw new Error("Invalid tagName provided");
        }
        // Validate attributes as an HtmlAttributes instance or regular object
        if (!(attributes instanceof HtmlAttributes || typeof attributes === "object")) {
            throw new Error("Invalid attributes provided");
        }
        // Validate children as an array
        if (!Array.isArray(children)) {
            throw new Error("Invalid children provided");
        }
        this.tagName = tagName.trim();
        if (attributes instanceof HtmlAttributes) {
            // If 'attribute' is an instance of HtmlAttributes, just directly assign it
            this.attributes = attributes;
        }
        else {
            // If 'attribute' is a regular object, create an HtmlAttribute instance from it
            this.attributes = new HtmlAttributes(attributes);
        }
        this.children = children;
    }
    /**
     * Method to build and return an HTMLElement.
     * @returns Returns an HTMLElement.
     */
    build() {
        // Create the element
        const element = document.createElement(this.tagName);
        // Apply attributes to the element
        this.attributes.build(element);
        // Append children recursively to the element
        this.appendChildren(element, this.children);
        return element;
    }
    /**
     * Helper method to recursively append children to an HTML element.
     * @param parentElement The parent element where the children will be appended.
     * @param children The children to be appended in the parent element.
     */
    appendChildren(parentElement, ...children) {
        for (const child of children) {
            switch (typeof child) {
                case "string":
                    // Text node
                    parentElement.appendChild(document.createTextNode(child));
                    break;
                case "object":
                    // Check if HTMLElement or array
                    if (child instanceof HtmlItem) {
                        // Append HTMLElement child to parent
                        parentElement.appendChild(child.build());
                    }
                    else if (Array.isArray(child)) {
                        // Array of children, recursively append
                        this.appendChildren(parentElement, ...child);
                    }
                    else {
                        // Convert object to string and append as text node
                        parentElement.appendChild(document.createTextNode(JSON.stringify(child)));
                    }
                    break;
                default:
                    // Convert other types to string and append as text node
                    parentElement.appendChild(document.createTextNode(String(child)));
                    break;
            }
        }
        return this;
    }
    /**
     * Create a proxy for custom element creation.
     * @returns A proxy for custom element creation.
     */
    static createProxy() {
        // Return a proxy
        return new Proxy(this, {
            get: function (target, prop) {
                if (prop in target) {
                    return target[prop];
                }
                else {
                    // Convert method call to custom element name
                    const tagName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
                    return function (attributes, ...children) {
                        return new HtmlItem(tagName, attributes, ...children);
                    };
                }
            },
        });
    }
}
/**
 * HtmlAttributes class to manage HTML element attributes.
 */
class HtmlAttributes {
    /**
     * To initialize attributes for HTML element.
     * @param attributes An set of attributes.
     */
    constructor(attributes = {}) {
        // Validate attributes as an object
        if (typeof attributes !== "object") {
            throw new Error("Invalid attributes provided");
        }
        this.attributes = attributes;
    }
    /**
     * Method to apply attributes to an HTMLElement.
     * @param element The element to be built.
     * @returns The element is given by.
     */
    build(element) {
        // Process and apply attributes to the element
        for (const attr of Object.keys(this.attributes)) {
            // Get the value from Object
            const value = this.attributes[attr];
            // Handle class attribute
            if (attr === 'class') {
                // Add classes to the element
                element.classList.add(...value.split(' '));
            }
            // Handle style attribute
            else if (attr === 'style' && typeof value === 'object') {
                // Merge styles into element's style attribute
                Object.assign(element.style, value);
            }
            // Assuming 'on' is an object containing event listeners
            else if (attr === 'on' && typeof value === 'object') {
                // Iterate over events and attach them to the element
                for (const eventName in value) {
                    // Recursively add events
                    this.addEvents(element, eventName, false, value[eventName]);
                }
            }
            // Handle event listeners
            else if (attr.startsWith('on')) {
                // Recursively add events
                this.addEvents(element, attr.toLowerCase().substring(2), false, value);
            }
            // Handle other attributes
            else {
                // Set attributes as stringified JSON if they are objects, otherwise as provided
                element.setAttribute(attr, typeof value === 'object' ? JSON.stringify(value) : value);
            }
        }
        return element;
    }
    /**
     * Recursively adds events to a given element.
     * @param element The element where events are added.
     * @param eventName The event name of the functions.
     * @param useCapture If you want to use bubbling, then set true. The default is false.
     * @param events The array of functions or functions.
     */
    addEvents(element, eventName, useCapture = false, ...events) {
        for (const event of events) {
            // Check if the event is a function
            if (typeof event === 'function') {
                // Add event listener to the element based on the useCapture parameter
                element.addEventListener(eventName, event, useCapture);
            }
            // Check if the event is an array
            else if (Array.isArray(event)) {
                // Recursively add events
                this.addEvents(element, eventName, useCapture, ...event);
            }
        }
        return this;
    }
}
/**
 * The variable that used for creating html elements.
 * Create an instance of the html class with a proxy for element creation.
 */
const $html = HtmlItem.createProxy();
