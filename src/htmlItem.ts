/**
 * HtmlItem class representing HTML elements
 */
class HtmlItem {
  /**
   * Array to hold HTML children
   */
  children: any[];

  /**
   * Object to hold HTML attributes
   */
  attributes: HtmlAttributes;

  /**
   * Name of the HTML tag
   */
  tagName: string;

  /**
   * Constructor to initialize HtmlItem elements
   * @param tagName The tag name of HTML element
   * @param attributes The attributes of HTML element
   * @param children The children of HTML element
   */
  constructor(tagName: string, attributes: HtmlAttributes | object = {}, ...children: any[]) {
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
    } else {
      // If 'attribute' is a regular object, create an HtmlAttribute instance from it
      this.attributes = new HtmlAttributes(attributes);
    }

    this.children = children;
  }

  /**
   * Method to build and return an HTMLElement.
   * @returns Returns an HTMLElement.
   */
  build(): HTMLElement {
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
  appendChildren(parentElement: HTMLElement, ...children: any[]): HtmlItem {
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
          } else if (Array.isArray(child)) {
            // Array of children, recursively append
            this.appendChildren(parentElement, ...child);
          } else {
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
  static createProxy(): typeof HtmlItem {
    // Return a proxy
    return new Proxy(this, {
      get: function(target, prop: string) {
        if (prop in target) {
          return target[prop];
        } else {
          // Convert method call to custom element name
          const tagName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
          return function(attributes: HtmlAttributes | object, ...children: any[]) {
            return new HtmlItem(tagName, attributes, ...children);
          };
        }
      },
    });
  }
}

/**
 * The variable that used for creating html elements.
 * Create an instance of the html class with a proxy for element creation.
 */
const $html = HtmlItem.createProxy();