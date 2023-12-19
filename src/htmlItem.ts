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
  children: ChildrenType[];

  /**
   * Object to hold HTML attributes
   */
  attributes: HtmlAttributes;

  /**
   * Constructor to initialize HtmlItem elements
   * @param tagName Name of the HTML tag
   * @param attributes The attributes of HTML element
   * @param children The children of HTML element
   */
  constructor(public tagName: string, attributes: HtmlAttributes | object = {}, ...children: ChildrenType[]) {

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

    // Validate children
    if (!isChildrenType(children)) {

      // let's throw an error.
      throw new Error("Invalid children provided");
    }

    // If 'tagName' contains some spaces front or end, trim it
    tagName = tagName.trim();

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
    appendChildren(element, ...this.children);

    // Return a element
    return element;
  }
}
