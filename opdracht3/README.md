# Browser Technologies
## Assignment 3 - Progressive Enhanced Browser Technologies
For this assignment I made a so called 'beatbox'. It is a simple soundboard that allows you to play a set of soundbites on click. The soundboard can also be controlled using the keyboard.

By double clicking or holding shift you trigger the soundbite loop. You can end the loop by clicking again. 

### Live demo
https://hackshackshacks.github.io/browser-technologies/opdracht3/

### Core functionality
The absolute minimum is being able to play the soundbites in the browser using the defauly `<audio>` tags.

### HTML
When writing my HTML I payed close attention to the browsersupport of each tag. For example I opted to use plain `<audio>` tags instead of `<audio>` tags with nested `<source>` tags.
```
<audio controls="controls" data-key='q' src="sounds/snare1.mp3" type="audio/mp3"></audio>
```

### CSS 
With CSS I made sure to write fallbacks for modern rules like `display: flex;`. Background images also have a fallback to a background-color. This results in a similar experience in browser that don't support these new rules.

```
background-color: #000000;
background-image: url('../images/background_big.png');
```

### JS
For Javascript I wrote a feature detection statement that makes sure no unsupported Javascript is used.
```
if (window.addEventListener && 'querySelector' in document && 'classList' in test)
```

### Accessibility
#### No mouse
The website is accesible using the keyboard only. I have implemented clear focus and active states. I also made sure the user knows what to do by adding some guiding text at the top of the page.

##### Focus state
![focus state](https://github.com/hackshackshacks/browser-technologies/blob/master/opdracht3/readme_images/focus.png?raw=true)

##### Guidance
![guidance](https://github.com/hackshackshacks/browser-technologies/blob/master/opdracht3/readme_images/guidance.png?raw=true)

### Browser support
The browser support is completely dependant on the support of the `<audio>` tag. If this tag is supported the core functionality is supported as well.

#### Testing
I have tested the website in a series of browsers.

The app works as expected in the browser that support the `<audio>` tag. In IE11 for example it falls back to the base `audio` styling.

##### Modern browsers (chrome)
![Modern](https://github.com/hackshackshacks/browser-technologies/blob/master/opdracht3/readme_images/modern.png?raw=true)

##### IE11
![IE11](https://github.com/hackshackshacks/browser-technologies/blob/master/opdracht3/readme_images/ie11.jpeg?raw=true)

##### Old mobile browsers
When testing in our schools device lab I came across lacking support for the `<audio>` tag. This results in a list of audio controls that don't work.

#### Funkify
I used the funkify extension to test the accesibility of my website.

