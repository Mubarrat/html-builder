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

// A function that create global variable to define HtmlItem
(function(globals){

  // Use strict for this function
  "use strict";

  // Create an instance of the html class with a proxy for element creation.
  globals.$html = new Proxy(Html, {

    // Assign a get function
    get(target, prop: string) {

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

    // Assign a apply function
    apply(_target, _thisArg, argArray) {

      // Return a class that makes Document Fragment
      return new Html(...argArray);
    },
  });
  
}((eval)("this")));
