# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Final Product
- Show/hide form, and making a post:
![desktop add tweet](docs/add-tweet.gif)

- Responsive at 1024px
![responsive](docs/responsive.gif)

- Scroll-to-top functionality
![scroll to top](docs/scroll-to-top.gif)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies
Server-side:
- [express]()https://github.com/expressjs/express
- [node](https://nodejs.org/en/) (5.10.x or above)
- [body-parser](https://github.com/expressjs/body-parser)
- [chance](https://github.com/chancejs/chancejs)
- [md5](https://github.com/pvorb/node-md5)

Client-side:
- [jQuery](https://jquery.com/)
- [Google Fonts](https://fonts.google.com/)

## Features
- Form show/hide
- Form input character count
- Form input validation (cannot submit empty post, or > 140 chars)
- Scroll-to-top
- Responsive design (1024px breakpoint)