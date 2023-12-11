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
      throw new Error("Invalid elements provided");
    }

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
      fragment.appendChild(element.build());
    }
    
    // Return the DocumentFragment
    return fragment;
  }
}
