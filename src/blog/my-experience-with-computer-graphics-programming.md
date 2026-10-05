---
title: "My Experience with Computer Graphics Programming"
description: "Here I am documenting my experience with computer graphics programming over the course of several years."
date: 2025-12-25
image: "/assets/images/graphics-programming.png"
minRead: 15
author:
  name: "Lazar Bojanić"
  avatar: "/assets/images/portrait.jpg"
  description: "Computer Science Student & Developer"
---

### Introduction

I first started computer graphics programming somewhere around 2021. Now, of course, as any other person,
I had my foray into game development through Minecraft modding in my childhood and then later dabbling with Unity.
But I never actually understood how the computer actually displayed graphics. Then, I started getting more and more
interested in C++, through YouTube channels like The Cherno. Of course, it was tough for me to wrap my head around
pretty much any of it, but regardless, it remained interesting to me. It felt as though I was learning more than the average
person at my University might, and it oddly felt like I was communicating with the original programmers who had to
solve performance-critical problems in low-level languages. This eventually led me to OpenGL. I knew _of_ it but
never investigated what it actually was. As soon as I started looking up tutorials, I was overwhelmed with two states
of mind. On the one hand, I was like, "There's no way I'm ever going to understand any of this, I mean, I barely understand C++!"
On the other hand, It was, "The power of the Sun, in the palm of my hand!" So, eventually that led me down the rabbithole
of learning OpenGL.

### Starting out

As any eager OpenGL learner, my journey began with [https://learnopengl.com](https://learnopengl.com). It is an incredible website, with very detailed instructions
and visual explanations. However, that doesn't mean I didn't have to bust out my scotch tape and tape up the code so it fits my project
setup. I mean, learning about C/C++ and that whole universe is incredibly daunting in and of itself. Different compilers, platforms,
do I build libraries or get them precompiled? What project type should I use, Visual Studio, perhaps this CMake thing I keep hearing
about? How do I make sure it works on all platforms? What about resource files? Needless to say, that took me quite a while to
understand (and I am still working on understanding it). However, finally, after the scotch tape was in place, I finally got to coding.
And I have to admit, even though most of the concepts went over my head, I was fascinated by the very nature of what I was doing.
I mean I am using fancy math, and a decades old library, and one of the oldest modern low-level programming languages,
to display memes on my screen, from scratch!

### The learning curve

Now, it should come as no surprise that my code pretty quickly turned into a big bowl of Bolognese. At first, it was "Ok, I will just
copy and paste their whole example in to my main file and go over it to make sure I understand everything." But I quickly
realized that this was not sustainable. I needed at the very least some basic abstraction. So I got to it. And, you know, honestly, 
in retrospect, I feel like I did quite alright, considering it was my first time, and I had no idea what I was doing in the first place.
It should also come as no surprise that my code was woefully unoptimized and weird. I was still programming everything like it was Java.
Not a care in the world for memory safety, pointers, references, what's passed to functions and how, what's on the stack and what's on
the heap, etc. Regardless, I kept moving along, and eventually settled on a somewhat ok project structure, and I made two; one for 2D
and one for 3D. This was all still before I had gotten my laptop, so it was all Windows only.

### Structuring my project

Everyone learning about graphics programming or game engine programming goes through this cycle of constantly having this
almost primal need to rewrite the engine from scratch every few months. Naturally, this is also the slippery slope I went down on.
I'm of the opinion that this has immense benefit to you actually learning and understanding what is going on, and how you like to
write and read and structure code. However, the law of diminishing returns becomes clear around the fourth or fifth rewrite. In any case,
the final rewrite I wanted to do is to figure out how to set up the CMake project such that it's cross-platform. So I did that and then...
Nothing. I didn't touch my code for a good year, year and a half. In fact, I left the code in a broken state; the resources were not
being loaded correctly (which is probably why I was not motivated to come back to it).

### Where I am today

Which brings me to today. I finally decided to dust out the project once again. And figure this out because I do actually want working code
that people on GitHub can actually use. Since I now also have a Linux laptop, it was also a good time to figure out CMake. So I did that,
and my project does in fact work. However, it is still very unoptimized; the initial resource loading takes forever to the point where
Cinammon (my Linux desktop environment) brings up that not responding screen, so I have to tell it to just wait a while. The code structure,
while not entirely attrocious, is still not the greatest, and not what I see other serious OpenGL/C++ programmers do. Lots of unmanaged
pointers, lots of unnecessary copying of memory, too much heap usage instead of stack etc. But, I am proud that I was able to get this working,
and that I can call it mine, with all its kinks and quirks.

### Conclusion

I hope you enjoyed reading my article and found my journey relatable. And if you, yourself are struggling with getting started or back to
your graphics programming journey, my advice for you is, just start. Seriously, at whichever point you're at, start. It's the best
way to learn. Look at some C++/OpenGL tutorials, understand how it works and why it works, at least at a basic level. Then try implementing
some stuff into your project, and try and try again until you got something. Because I guarantee you, if nothing else, you will come
out the other side, knowing much more than you did, having a cool learning experience, getting to say that you wrote low-level GPU code
for your computer, and technically, have your own game engine :).

### References

- **LearnOpenGL** - [https://learnopengl.com/](https://learnopengl.com/)
- **Victor Gordan's video series that follows LearnOpenGL** - [https://www.youtube.com/watch?v=XpBGwZNyUh0&list=PLPaoO-vpZnumdcb4tZc4x5Q-v7CkrQ6M-](https://www.youtube.com/watch?v=XpBGwZNyUh0&list=PLPaoO-vpZnumdcb4tZc4x5Q-v7CkrQ6M-)
- **The Cherno OpenGL playlist** - [https://www.youtube.com/watch?v=W3gAzLwfIP0&list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2](https://www.youtube.com/watch?v=W3gAzLwfIP0&list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2)
- **If you want to skip all the linking, libraries, frameworks, setting up your project (totally valid btw, that is it's own learning curve like i mentioned), this guy has some preconfigured setups for OpenGL + GLFW, SDL, raylib, SFML** - [https://www.youtube.com/watch?v=FrVABOhRyQg](https://www.youtube.com/watch?v=FrVABOhRyQg)
- **Very interesting channel that has a bunch of cool simulations/demonstrations of computer graphics (Mostly in Unity, but the concepts apply anywhere)** - [https://www.youtube.com/@SebastianLague](https://www.youtube.com/@SebastianLague)
- **Interesting devlogs of someone learning game engine development over many years** - [https://www.youtube.com/@ZygerGFX](https://www.youtube.com/@ZygerGFX)
- **I mean, do I even need to say anything. He is Him, he is the moment, he is the main character** - [https://www.youtube.com/@tokyospliff](https://www.youtube.com/@tokyospliff)
- **I remember this channel being useful back in the day, although I believe he mostly does software (CPU) rendering (which is totally fine, if you just need to iterate over a grid of pixels and display them in neat ways, you don't need a GPU!)** - [https://www.youtube.com/@javidx9](https://www.youtube.com/@javidx9)

**And of course my projects:**
- **The old projects (Windows only, may or may not work)**
- **The old 2D project** - [https://github.com/LazarBojanic/LazarOpenGLEngine2D](https://github.com/LazarBojanic/LazarOpenGLEngine2D)
- **The old 3D project** - [https://github.com/LazarBojanic/LazarOpenGLEngine3D](https://github.com/LazarBojanic/LazarOpenGLEngine3D)
- **The current project (Windows and Linux, 3D, I'm later going to be making it also into a separate 2D project, after I polish this one of course)** - [https://github.com/LazarBojanic/engine](https://github.com/LazarBojanic/engine)
