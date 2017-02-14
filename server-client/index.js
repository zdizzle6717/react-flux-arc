'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../src/routes';
import routeConfig from './routeConfig';
import NotFoundPage from '../src/components/pages/NotFoundPage';
import envVariables from '../envVariables';

// Initialize the server and configure support for handlebars templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname + '/../dist/')));

// Universal routing and rendering for SEO
for (let i in routeConfig) {
    let routePath = routeConfig[i].route;
    let routeView = routeConfig[i].view;

    app.get(routePath, (req, res) => {
        match({
            routes,
            location: req.url
        }, (err, redirectLocation, renderProps) => {

            if (err) {
                return res.status(500).send(err.message);
            }

            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            let markup;
            if (renderProps) {
                markup = renderToString(<RouterContext {...renderProps}/>);
            } else {
                markup = renderToString(<NotFoundPage/>);
                res.status(404);
            }

            return res.render(routeView, {markup});
        });
    });
}

// For any route not configured, render the 404 not found page and view
app.get('*', (req, res) => {
	match({
		routes,
		location: req.url
	}, (err, redirectLocation, renderProps) => {

		if (err) {
			return res.status(500).send(err.message);
		}

		if (redirectLocation) {
			return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		}

		let markup = renderToString(<NotFoundPage/>);
		res.status(404);

		return res.render('notFound', {markup});
	});
});

// Start the server
const port = envVariables.clientPort;
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port}`);
});
