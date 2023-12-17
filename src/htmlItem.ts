/**
 * MIT License
 *
 * Copyright (c) 2023 Mubarrat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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

      // Since tag name isn't validated, let's throw an error.
      throw new Error("Invalid tagName provided");
    }

    // Validate attributes as an HtmlAttributes instance or regular object
    if (!(attributes instanceof HtmlAttributes || (attributes && Object.getPrototypeOf(attributes) === Object.prototype))) {

      // Since attributes aren't validated, let's throw an error.
      throw new Error("Invalid attributes provided");
    }

    // Validate children as an array
    if (!Array.isArray(children)) {

      // Since children aren't validated, let's throw an error.
      throw new Error("Invalid children provided");
    }

    // If 'tagName' contains some spaces front or end, trim it
    this.tagName = tagName.trim();

    this.attributes =

      // If 'attribute' is an instance of HtmlAttributes,
      attributes instanceof HtmlAttributes

      // just directly assign it
      ? attributes

      // Otherwise if 'attribute' is a regular object, create an HtmlAttribute instance from it
      : new HtmlAttributes(attributes);

    // Assign children to this
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

    // Return a element
    return element;
  }

  /**
   * Helper method to recursively append children to an HTML element.
   * @param parentElement The parent element where the children will be appended.
   * @param children The children to be appended in the parent element.
   */
  appendChildren(parentElement: HTMLElement, ...children: any[]): HtmlItem {

    // Iterate child over children
    for (const child of children) {

      // Compare type of child
      switch (typeof child) {

        // Text node
        case "string":

          // Append the text node
          parentElement.appendChild(document.createTextNode(child));
          break;

        // An object
        case "object":

          // Check if child is an array
          if (Array.isArray(child)) {

            // Array of children, recursively append
            this.appendChildren(parentElement, ...child);
          }

          // Otherwise
          else {

            // Append child to the parent element
            parentElement.appendChild(

              // Check if child is HTMLElement
              child instanceof HtmlItem

              // Append HTMLElement child to parent
              ? child.build()

              // If anything else, convert object to string and append as text node
              : document.createTextNode(JSON.stringify(child))
            );
          }
          break;

        // If anything else
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

      // Assign a get function
      get: function(target, prop: string) {

        // If the method name is in this class
        if (prop in target) {

          // Return the method for invoking
          return (target as any)[prop];
        }
        
        // Method is just a HTML predefined name
        else {
          
          // Fix the method name
          const tagName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();

          // Convert method call to custom element name
          return function(attributes: HtmlAttributes | object | any, ...children: any[]) {
            
            // If element initialized without attributes
            if (!(attributes instanceof HtmlAttributes || (attributes && Object.getPrototypeOf(attributes) === Object.prototype))) {

              // Return this class without attributes but as children as they no longer attributes
              return new HtmlItem(tagName, {}, attributes, ...children);
            }
            
            // Otherwise, return this class
            return new HtmlItem(tagName, attributes, ...children);
          };
        }
      },
    });
  }
}

// A function that create global variable to define HtmlItem
(function(globals){

  // Use strict for 
  "use strict";

  // Create an instance of the html class with a proxy for element creation.
  globals.$html = HtmlItem.createProxy();
  
}(this));
