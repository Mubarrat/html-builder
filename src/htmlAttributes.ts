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
 * HtmlAttributes class to manage HTML element attributes.
 */
class HtmlAttributes {
  
  /**
   * Object to hold HTML attributes
   */
  attributes: object;

  /**
   * To initialize attributes for HTML element.
   * @param attributes An set of attributes.
   */
  constructor(attributes: object = {}) {

    // Validate attributes as an object
    if (typeof attributes !== "object") {

      // Since attributes aren't validated, let's throw an error.
      throw new Error("Invalid attributes provided");
    }

    // Assign attributes
    this.attributes = attributes;
  }

  /**
   * Method to apply attributes to an HTMLElement.
   * @param element The element to be built.
   * @returns The element is given by.
   */
  build(element: HTMLElement): HTMLElement {

    // Process and apply attributes to the element
    for (const attr of Object.keys(this.attributes)) {

      // Get the value from Object
      const value = (this.attributes as Record<string, any>)[attr];

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

      // Assuming 'data' is an object containing data information
      else if (attr === 'data' && typeof value === 'object') {

        // Iterate over data information
        for (const name in value) {

          // Define value from name of value
          const data = value[name];

          // Add data to elements
          element.setAttribute(`data-${name}`,

            // If data is an object
            typeof data === 'object'
            
            // Stringify it
            ? JSON.stringify(data)
            
            // Otherwise set it as provided
            : data);
        }
      }

      // Handle other attributes
      else {

        // Set attributes
        element.setAttribute(attr,
          
          // If value is an object
          typeof value === 'object'
          
          // Stringify it
          ? JSON.stringify(value)
          
          // Otherwise set it as provided
          : value);
      }
    }

    // Return a element
    return element;
  }

  /**
   * Recursively adds events to a given element.
   * @param element The element where events are added.
   * @param eventName The event name of the functions.
   * @param useCapture If you want to use bubbling, then set true. The default is false.
   * @param events The array of functions or functions.
   */
  addEvents(element: HTMLElement, eventName: string, useCapture: boolean = false, ...events: EventType[]): HtmlAttributes {
    
    // Iterate event over events
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

    // Return this class for chaining
    return this;
  }
}
