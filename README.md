# HTML Builder
This is a library that helps you to build HTML in your JavaScript or TypeScript files.

## Purpose
The HTML Builder JavaScript Library facilitates the dynamic creation of HTML elements in JavaScript, offering a flexible and intuitive interface for generating HTML content.

## Installation
### Download
Download our latest [release files](https://github.com/Mubarrat/html-builder/releases) from this GitHub repository.

#### Contents
Once downloaded, unzip the compressed folder and you’ll see something like this:
```
html-builder
├── html.js
├── html.js.map
└── html.min.js
```

### Link
```
https://cdn.jsdelivr.net/gh/Mubarrat/html-builder@main/dist/html.js
```
For the minimized version, the link is
```
https://cdn.jsdelivr.net/gh/Mubarrat/html-builder@main/dist/html.min.js
```

## Usage
Let's assume you have a simple HTML structure you want to create programmatically using the HTML builder library.
### Example:

#### 1st Example
This example demonstrates how to use the HTML builder library to create HTML elements (in this case, a `<div>` with `<h1>` and `<p>` children) and add them to the web page.
```javascript
// Creating a div with some attributes and children
const myDivElement = $html.div({ class: "container", id: "myContainer" },
  $html.h1("Hello, World!"),
  $html.p("This is a paragraph inside the div.")
).build();

// Appending the created div to the body of the document
document.body.appendChild(myDivElement);
```
##### Explanation:
1. Creating a Div Element:
   * `const myDivElement = $html.div(...)` creates a `<div>` element using the library.
   * Attributes like `class` and `id` are added to the `<div>`
2. Adding Child Elements:
   * `$html.h1("Hello, World!")` creates an `<h1>` element as a child of the `<div>`.
   * `$html.p("This is a paragraph inside the div.")` creates a `<p>` element as another child of the `<div>`.
3. Building the HTML Elements:
   * `.build()` method is called to construct the entire structure.
4. Appending to the Document:
   * `document.body.appendChild(myDivElement)` appends the constructed HTML structure to the body of the HTML document.

---
#### 2nd Example
This example showcases how the HTML builder library can create a set of specified HTML elements and append it to the webpage. This method can be beneficial for efficiency when adding multiple elements to the DOM at once, as it allows you to make a single append operation rather than appending each element individually.

```javascript
// Creating a set of HTML elements
const elementSet = new Html(
  $html.h1("Hello, World!"),
  $html.p("This is a paragraph inside the div.")
).build();

// Appending the set to the body of the document
document.body.appendChild(elementSet);
```

##### Explanation
1. Creating a set of elements:
   * `const elementSet = new Html(...)` constructs a set of elements containing `<h1>` and a `<p>` element using the HTML builder library.
2. Building the HTML Elements:
   * `.build()` method is called to construct the set of elements.
3. Appending to the Document:
   * `document.body.appendChild(elementSet)` adds the constructed document fragment (containing the elements) to the body of the HTML document.

---
#### 3rd Example

This example demonstrates how you can use the HTML builder library to create a `<div>` element with specific styles, an event listener, and custom data attributes. Adjust the attributes and their values according to your requirements.

```javascript
// Create an HTML element with styles, event listener, and data attributes
const styledDiv = $html.div(
  {
    class: 'container',
    style: {
      backgroundColor: 'lightblue',
      padding: '20px',
      color: 'white',
      borderRadius: '8px'
    },
    on: {
      click() {
        alert('Clicked!');
      },
      mouseover() {
        alert('You touched me.');
      }
      /*
      Or,
      click: () => {
        alert('Clicked!');
      }
      You can also use array of functions or nested
      array and functions. It doesn't matter. It
      recursively appended when run. Like:-
      click: [
        () => { alert('Clicked 1!') },
        () => { alert('Clicked 2!') },
        [
          () => { alert('Clicked 3!') },
          [
            () => { alert('Clicked 4!') },
            ...
          ]
        ]
      ]
      It will be run as:-
      click() {
        (() => { alert('Clicked 1!') })();
        (() => { alert('Clicked 2!') })();
        (() => { alert('Clicked 3!') })();
        (() => { alert('Clicked 4!') })();
        ...
      }
      */
    },
    /*
    You can also individually add outside of on.
    Example:
    onclick() { ... },
    onmouseover() { ... }
    */
    data: {
      id: 123,
      user: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    }
    /*
    You can also individually add data.
    Example:
    "data-id": 123,
    "data-user": {
      name: 'John Doe',
      email: 'john@example.com'
    }
    */
  },
  'Styled Div - Click me!'
);

// Build the element
const divElement = styledDiv.build();

// Append the element to the body
document.body.appendChild(divElement);
```

##### Explanation:

- `class`: Adds a CSS class to the `<div>` element.
- `style`: Applies inline CSS styles to the `<div>` element.
- `on`: Attaches an event listener (in this case, a click event) to the `<div>` element.
- `data`: Sets custom data attributes (`id` and `user`) to the `<div>` element.

---
## API Documentation

### `Html` Class:

- **Purpose**: Helps build collections of HTML elements.

#### Methods:

1. **Constructor**
   - **Parameters**:
     - `...elements` (...any): HTML elements or strings or anything else to include in the collection.
   - **Example**:
     ```javascript
     const htmlCollection = new Html(element1, element2, element3);
     ```

2. **`build()` Method**
   - **Returns**: DocumentFragment - The constructed document fragment.
   - **Example**:
     ```javascript
     const fragment = htmlCollection.build();
     ```

---
### `HtmlAttributes` Class:

- **Purpose**: Manages HTML element attributes.

#### Methods:

1. **Constructor**
   - **Parameters**:
     - `attributes` (Object): The attributes to apply.
   - **Example**:
     ```javascript
     const attributes = new HtmlAttributes({ class: 'container', id: 'myId' });
     ```
  
2. **`build(element)` Method**
   - **Parameters**:
     - `element` (HTMLElement): The HTML element to apply attributes to.
   - **Returns**: HTMLElement - The modified HTML element.
   - **Example**:
     ```javascript
     const modifiedElement = attributes.build(myElement);
     ```

---
### `HtmlItem` Class:

- **Purpose**: Represents an HTML element.

#### Methods:

1. **Constructor**
   - **Parameters**:
     - `tagName` (string): The tag name of the HTML element.
     - `attributes` (Object|HtmlAttributes): The attributes of the HTML element.
     - `children` (...(string|HtmlItem)): Child elements or text content.
   - **Example**:
     ```javascript
     const element = new HtmlItem('div', { class: 'container' }, 'Content');
     ```
   - **Shortcut**: [See more](#factory-functions-shortcut-methods)
  
2. **`build()` Method**
   - **Returns**: HTMLElement - The constructed HTML element.
   - **Example**:
     ```javascript
     const divElement = element.build();
     ```

---
### Factory Functions (Shortcut Methods):

#### `$html.tagName(...)`

- **Purpose**: Shortcut method for creating specific HTML elements.
- Use `$html.tagName(...)` instead of `new HtmlItem(tagName, ...)`
- Any capital letters in `tagName` will transform to small letters and prepend hyphen. Examples:-
  - `$html.codeWindow(...)` &rarr; `<code-window>`
  - `$html.codeBlock(...)` &rarr; `<code-block>`
  - `$html.codeBlockWindow(...)` &rarr; `<code-block-window>`
- If you don't need any attributes, then use
  ```javascript
  const paragraph = $html.p('This is a paragraph.');
  ```
  instead of
  ```javascript
  const paragraph = $html.p({}, 'This is a paragraph.');
  ```

> [!NOTE]
> `Without attribute` feature only works in factory functions (shortcut methods). It doesn't work in `HtmlItem` constructor.
  
##### Usage:

```javascript
const paragraph = $html.p({}, 'This is a paragraph.');
const heading = $html.h1({}, 'This is a heading.');
```
Or, without `{}`
```javascript
const paragraph = $html.p('This is a paragraph.');
const heading = $html.h1('This is a heading.');
```

### Example Usage:

```javascript
// Create HTML elements using factory functions
const paragraph = $html.p('This is a paragraph.');
const heading = $html.h1('This is a heading.');

// Build and append the elements
document.body.appendChild(paragraph.build());
document.body.appendChild(heading.build());
```

## Contributing

We welcome contributions from the community to enhance the HTML Builder library. Whether you're fixing a bug, implementing new features, or improving documentation, your efforts are appreciated. To contribute, follow these guidelines:

### Bug Reports and Feature Requests

If you encounter a bug or have a feature request, please check our [issue tracker](https://github.com/Mubarrat/html-builder/issues) to see if it's already reported. If not, feel free to open a new issue. When reporting a bug, include:

- A clear and descriptive title
- Steps to reproduce the bug
- Expected behavior and actual behavior observed
- Any relevant code snippets, error messages, or screenshots

For feature requests, explain the proposed feature's functionality and its potential benefits.

### Pull Requests

We encourage pull requests to fix bugs, improve documentation, or add new features. Follow these steps:

1. Fork the repository and create a new branch from the `main` branch.
2. Implement your changes and ensure they adhere to our coding standards and practices.
3. Write clear commit messages that describe the changes made.
4. Test your changes thoroughly.
5. Submit a pull request (PR) and provide a detailed description:
   - Explain the problem you're solving or the feature you're adding.
   - Reference any related issues.

### Code Contribution Guidelines

- Follow consistent coding styles as present in the repository.
- Maintain descriptive comments where necessary for clarity.
- Ensure that your code changes do not introduce new issues or break existing functionality.
- Update documentation if your changes impact it.

### Code of Conduct

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions related to the project.

### Getting Help

If you need any assistance or clarification on contributing, feel free to reach out by [creating an issue](https://github.com/Mubarrat/html-builder/issues).

Thank you for considering contributing to the HTML Builder library!