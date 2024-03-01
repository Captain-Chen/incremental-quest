# Incremental Quest

## What is this?
This is an [incremental game](https://en.wikipedia.org/wiki/Incremental_game) that I wrote in TypeScript that uses the React.js, Express, Webpack and Socket.io libraries. Typically incremental games are played by a single person however the gimmick of "Incremental Quest" (tentative title) is other people may play the same game simultaneously.

## Motivation
First and foremost, I wanted to make an [incremental game](https://en.wikipedia.org/wiki/Incremental_game). I went through various resources on topics such as: What exactly _is_ an incremental game? to how one might implement it.

Second, I needed to choose the tools and technologies that would help accomplish this effort. I decided on TypeScript (Language), React.js (Front-end), Express (Back-end), Webpack (Bundler) and Socket.io (Real-time communication) for my [solution stack](https://en.wikipedia.org/wiki/Solution_stack). These were chosen both to learn how to use but also abstract certain complexities away i.e. communication protocols.

## How to install and run
1. Clone the project:  
`git clone https://github.com/Captain-Chen/incremental-quest.git`
2. Install the dependencies: `npm install`
3. Decide on which build of the application
    * To build for development: `npm run dev` (this has sourcemaps for debugging)
    * For production: `npm run build`
4. Start the server: `npm start` or `npm run start`
5. Connect to: `http://localhost:3000` to start playing.

*Note:* Code may be unoptimized and contain bugs.