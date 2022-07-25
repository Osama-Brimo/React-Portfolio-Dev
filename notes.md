- dont be afraid to split components
- name from components point of view
- pure functions do not attempt to change their inputs
  - ...all react components must be pure functions. meaning, you cannot change the props.
-  comp jsx tags are references to a defined components, the definition of which can be made i nthe form of a class based or functional component
-  one way to update the user interface is to call root.render to update the content by passing changing props to it
   -  however, ideally we want the component to update itself 
- do not modify state directly like so : this.state.thing, isnbtead use setState
  - ... you do set the state variables directly in the constructor in the case of using a class type
- react batches state and props sometimes into a single update call for performance. this means they are updated asynchronously, and the values should not be relied upon directly for calculating the next state.
  - ...instead, pass a function to setState, which accepts state as its first arg. in that case, the values behave normally.
- keys must be strings.
- keys should be passed in the context of the surrounding array, so: not in the component definition for example, but rather in the .map which returns the array of elements to output.
- keys do need to be unique among siblings, but not globally unique.
- you could embed the .map directly in curly braces within the place we want to output it, rather than catching it in a variable and passing it there.
- inputs are of two types in react: controlled and uncontrolled. controlled inputs have their values 
  governed by their react state, while uncontrolled inputs behave in the default way.
- controlled inputs still change value normally, but react instantly coerces the value back to the state value. so if we check a controlled checkbox, for example, we can log its value and reads as checked, even though it does not display that way. this allows you to change the value to what it would be by capturing it and using setState.
- setting a controlled components value to null or undefined allows it to be edited
- JSX component tags do not by default allow you to nest child elements inside. You may however, use {props.children} to refer to whatever elements you would wrap with some component tag.
- React components are just normal objects, so they can be passed properties normally. for example, you can simply pass a component as a prop to another component, then output it there : 
    <!-- - <Test a={<Thing1 />} b={<Thing2 />} /> -->
    <!-- {props.a} -->
    <!-- {props.b} -->
- "React Composition is a development pattern based on React's original component model where we build components from other components using explicit defined props or the implicit children prop."
  - ... this just basically means you reuse a component by wrapping it in another one and passing props to customize it.
- Building a react app steps:
  0. **start with a mockup**: set up mock json data + have design ready
  1. **Break UI into a component hierarchy**: 
     - Draw boxes around every component and subcomponent and give them names.
       Decide what should be its own component the same way you think about creating new functions or objects.
       Every component ideally should do only one thing. If it grows, it should be broken down into parts. 
  2. **Build a Static Version**: A static version should be built first, as it requires no thinking and a lot of typing, while functionality requires lots of thinking and little typing.
     - ... "In simpler examples, it’s usually easier to go top-down, and on larger projects, it’s easier to go bottom-up and write tests as you build."
  3. **Identify The Minimal (but complete) Representation Of UI State**: " For example, if you’re building a TODO list, keep an array of the TODO items around; don’t keep a separate state variable for the count. Instead, when you want to render the TODO count, take the length of the TODO items array."
     - Identify which parts should be state and which are not: 
     -  1. Is it passed in from a parent via props? If so, it probably isn’t state.
        2. Does it remain unchanged over time? If so, it probably isn’t state.
        3. Can you compute it based on any other state or props in your component? If so, it isn’t state.

        - The original list of products is passed in as props, so that’s not state. The search text and the checkbox seem to be state since they change over time and can’t be computed from anything. And finally, the filtered list of products isn’t state because it can be computed by combining the original list of products with the search text and value of the checkbox."
  4. **Identify Where Your State Should Live**:  
     1. Identify every component that renders something based on a given state
     2. Find a common ancestor for all said components
     3. Either that component or a higher-up in the hierarchy should own the state
     4. If you cant find a component where it makes sense to give the state to, make a component solely to hold the state, and add it somewhere in the hierarchy above the common ancestor.

- The equivalent for state updating within functional components is the useState hook.
- To do things 'imperatively' within a functional component, we need the useEffect API. this is used in the form of a call to useEffect to which a callback is passed with our code in it.
  - ... "When you call useEffect, you’re telling React to run your “effect” function after flushing changes to the DOM. Effects are declared inside the component so they have access to its props and state."
  - "By default React runs the effects after every render, including the first render."
- 