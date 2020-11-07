# css & js animations

Live version: hellish-trees.surge.sh

For this guide I wanted to create some sort of animated icons that could possibly be used when a site is loading or processing data. I created 2 examples, one of which uses css keyframes and the other uses javascript and html elements. The examples are pretty large in size and currently there's no easy way to resize them for use in apps so that's definitely something to work on.

The css animation is just two rectangle shaped elements that each get their own animation keyframe assigned to them, making them move around an inner box and returning to their original position.

The js animations are a collection of dom elements that have their styles changed every set interval. I wanted the rectangle example to have a sort of a snake like figure moving around the same box as the css animation. The most obvious solution I came up with was hardcoding a lot of fixed position rectangle elements (16 to be precise) around the box and change their style each interval. It ended up becoming a bit of a hassle assigning the correct color values to the correct positions so any ideas on how to do it differently are welcome.