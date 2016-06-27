# Univibe Corporate Website
This repo contains the source code to the Univibe network

## Dependencies
This project requires the following to be installed:
- Install Node & NPM 
- Install bower for front end dependencies using `npm install -g bower`
- Install required node_modules using `npm install`

## Running the code
This project uses the connect server to watch and reload changes, you can initiate the server by typing in `grunt serve` and then loading `http://localhost:9001` in a browser window

## Building the project
This project uses grunt for build automation, so you can build the project simply by typing `grunt build`. This build script watches only the following files during build compile, necessary changes need to be done in all HTML, JS, CSS & the Gruntfile.js when new code is added

## Changes
All pull requests and changes in each PR to be documented in [CHANGELOG.md](CHANGELOG.md)

## Contributing
All users who contribute to this code must submit a PR after thorough unit testing