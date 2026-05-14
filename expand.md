# Expand

## 1. Why is it important to put thought into your IDs & Classes when it comes to technology intersections? (e.g. how HTML, CSS, and JS intersect)

IDs and classes are the shared vocabulary that ties HTML, CSS, and JavaScript together. HTML defines them on elements, CSS uses them as selectors to apply styling, and JavaScript uses them to query elements (`getElementById`, `querySelector`, `getElementsByClassName`) and manipulate the DOM. Because all three layers depend on these names, a poorly chosen or carelessly renamed ID/class can silently break styling and behavior at the same time.

Thoughtful, semantic, consistent naming makes a codebase maintainable: it communicates what an element *is* or *does* rather than how it currently looks, which keeps the layers loosely coupled. It also matters that IDs are unique (required for `getElementById` and anchor links to behave correctly) while classes are reusable across many elements. Following a naming convention (such as BEM) helps avoid collisions, makes the HTML/CSS/JS intersection predictable, and reduces bugs when the project grows.

## 2. What are Data attributes? Why might they be useful? How do you access them? What are the implications of using Data attributes when it comes to things like microdata?

Data attributes are custom attributes prefixed with `data-` (for example, `data-user-id="123"` or `data-state="active"`). They let you attach arbitrary extra information directly to HTML elements without overloading other attributes or maintaining a separate parallel data structure in JavaScript.

They are useful for storing element-specific state or metadata that JavaScript needs to read or update — for example, tagging a button with the ID of the record it controls.

You access them in JavaScript through the `dataset` property, where the attribute name is converted to camelCase: `data-user-id` becomes `element.dataset.userId`. You can also use `element.getAttribute("data-user-id")` and `element.setAttribute(...)`.

Regarding microdata: data attributes are *private to your application*. Search engines, screen readers, and other external parsers ignore them. Microdata (`itemscope`, `itemprop`, etc.) is the opposite — it is explicitly meant to be machine-readable and semantically meaningful to outside consumers. The implication is that you should not use `data-` attributes for content that needs to be semantically exposed to the outside world; use proper semantic HTML or microdata for that, and reserve data attributes for app-internal bookkeeping.

## 3. What is a DOM fragment? Why are they powerful?

A DOM fragment (`DocumentFragment`) is a lightweight, minimal container that can hold DOM nodes but is not itself part of the live DOM tree. You can create and populate it entirely in memory.

They are powerful for performance. Every time you insert a node directly into the live DOM, the browser may trigger a reflow and repaint. If you build many elements one by one and append each to the page, you pay that cost repeatedly. With a fragment, you append all your new nodes to the fragment off-screen, then insert the fragment once — moving all its children into the DOM in a single operation that triggers only one reflow. The fragment itself is not inserted; only its children are. This makes batch DOM insertions much more efficient.

## 4. What is the point of a "Virtual DOM"? What do you gain? What do you lose?

A Virtual DOM is an in-memory representation of the real DOM, used by frameworks like React. When application state changes, the framework builds a new virtual tree, compares ("diffs") it against the previous virtual tree, and then applies only the minimal set of changes needed to the real DOM (a process called reconciliation).

What you gain: efficient updates when the UI changes frequently, since the browser only does the DOM work that actually changed. You also gain a declarative programming model — you describe what the UI *should* look like for a given state, and the framework figures out the operations to get there, rather than you manually manipulating nodes.

What you lose: there is memory overhead from keeping a second representation of the tree, and the diffing/reconciliation step itself costs CPU time. You also take on added abstraction and a dependency on the framework. For simple pages or rare updates, direct DOM manipulation can actually be faster and simpler than maintaining a Virtual DOM.

## 5. In JavaScript, usually you can reference every attribute of an element with a dot selector followed by the attribute name, except for the class attribute, which is className. Why is this so?

Because `class` is a reserved word in JavaScript. It was reserved early in the language's history (long before ES6 actually introduced `class` declarations for defining classes). Since the DOM API exposes element attributes as JavaScript properties, a property literally named `class` (`element.class`) would collide with that reserved keyword. To avoid the conflict, the DOM specification named the property `className` instead. (Modern code also has `element.classList`, which provides a cleaner API for adding, removing, and toggling individual classes.)

## 6. What is the difference between using addEventListener() and something like onClick()? What are the advantages / disadvantages of both?

`addEventListener()` registers an event handler on an element. Its key advantages are that you can attach **multiple** handlers for the same event type on the same element without them overwriting each other, you get control over the event phase (capturing vs. bubbling via the third argument) and extra options (`once`, `passive`), and you can cleanly remove a specific handler later with `removeEventListener()`. It also keeps behavior in your JavaScript, separate from your HTML. The main disadvantage is that it is slightly more verbose.

`onclick` (the property, or the inline HTML attribute) assigns a single handler function. Its advantage is simplicity — the syntax is short and quick to write. Its disadvantages are significant: only one handler can be assigned at a time, so assigning a new one silently overwrites any existing one, which makes it easy to clobber handlers by accident. And when used as an inline HTML attribute (`<button onclick="...">`), it mixes structure and behavior, which works against clean separation of concerns.

In general, `addEventListener()` is the preferred approach for anything beyond the most trivial cases; `onclick` is fine for quick, simple, one-off handlers.
