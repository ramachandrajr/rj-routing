/*
	MIT License

	Copyright (c) 2017 Ramachandr Junior

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/


/*
 * This function removes any hashes in the url at load.
 */
window.addEventListener("load", function() {
	window.location.hash = "";
});


/*
 * Router class holds all the routing data and methods to 
 * add routes and access routes and listen to requests.
 */
var Router = function() {
	this.routes = [];
	this.listening = false;
};


/*
 * This function adds routes to the router object.
 *
 * @returns {Array} An array of all routes.
 */
Router.prototype.addRoute = function(route, cb) {
	try {
		// If route is not a string and cb is not a function
		if ((typeof route).toLowerCase() !== "string" || (typeof cb).toLowerCase() !== "function") throw new Error("Invalid arguments at 'addRoute'!");
		this.routes.push({route: route, cb: cb});
	} catch (e) {
		console.error(e);
		return null;
	}
	return this.routes;
};


/*
 * Tells the router to listen to the change in hashes.
 *
 * @returns {Boolean} Returns 'true' if route is found else, throws an error.
 */
Router.prototype.listen = function() {
	try {

		let routes = this.routes;
		// Is Listening already.
		if (this.listening === true) throw new Error("Listen has been called previously!");

		/*
		 * If not listening then start to listen.
		 */ 
		window.addEventListener("hashchange", function() {
			event.preventDefault();
			if (window.location.hash === "") return
			let hash = window.location.hash;
			let routeKey = window.location.hash.slice(1);
			for (let route of routes) {
				// If it is that specific route.
				if (routeKey === route.route) { 
					route.cb();
					return true;
				}
			}
			// Couldn't find the route.
			throw new Error("There is no such route by name: " + routeKey);
		});  
	} catch(e) {
		console.error(e);
		return null;
	}
};


/*
 * Name space creator function.
 *
 * @returns {Router} Returns a 'Router' object with all properties on it.
 */
window.$router = function(window, document) {
	"use strict";

	return new Router();
}.bind(null, window, document);