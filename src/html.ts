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
 * Html class to manage HTML element creation
 */
class Html {

  /**
   * Array to hold HtmlItem elements
   */
  elements: HtmlItem[];

  /**
   * Constructor to initialize HtmlItem elements
   * @param elements The elemenets
   */
  constructor(...elements: HtmlItem[]) {

    // Validate elements as an array
    if (!Array.isArray(elements)) {
      
      // Since array isn't validated, let's throw an error
      throw new Error("Invalid elements provided");
    }

    // Assign elements
    this.elements = elements;
  }

  /**
   * Method to build and return a DocumentFragment
   * @returns Returns a DocumentFragment
   */
  build(): DocumentFragment {

    // Create a DocumentFragment
    const fragment = document.createDocumentFragment();

    // Append children to the DocumentFragment
    for (const element of this.elements) {

      // Append a child to the DocumentFragment
      fragment.appendChild(element.build());
    }
    
    // Return the DocumentFragment
    return fragment;
  }
}
