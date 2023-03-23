import { StoreModel as store } from "./StoreModel";

const urlPageTitle = "JS Single Page Application Router";

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.matches("nav a")) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// create an object that maps the url to the template, title, and description
const urlRoutes = {
	404: {
    id: "404",
		template: "/templates/404.html",
		title: "404 | " + urlPageTitle,
		description: "Page not found",
	},
	"/": {
    id: "index",
		template: "/templates/index.html",
		title: "SLIRP Home",
		description: "SLIRP home page",
	},
	"/about": {
    id: "about",
		template: "/templates/about.html",
		title: "About SLIRP",
		description: "SLIRP about page",
	},
	"/contact": {
    id: "contact",
		template: "/templates/contact.html",
		title: "Contact SLIRP",
		description: "SLIRP contact page",
	},
  "/status": {
    id: "status",
		template: "/templates/status.html",
		title: "Select Status",
		description: "Select SLIRP Status",
	},
  "/privacy": {
    id: "privacy",
		template: "/templates/privacy.html",
		title: "Select Status",
		description: "SLIRP Privacy Polcy",
	},
  "/tos": {
    id: "tos",
		template: "/templates/tos.html",
		title: "Terms of Service",
		description: "SLIRP Terms of Service",
	}
};

// create a function that watches the url and calls the urlLocationHandler
const urlRoute = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

// create a function that handles the url location
const urlLocationHandler = async () => {
  if(!user) { return }
	const location = window.location.pathname; // get the url path
	// if the path length is 0, set it to primary page route
	if (location.length == 0) {
		location = "/";
	}
	// get the route object from the urlRoutes object
	const route = urlRoutes[location] || urlRoutes["404"];
  store.pageId = route.id;
	// get the html from the template
	const html = await fetch(route.template).then((response) => response.text());
	// set the content of the content div to the html
	document.getElementById("content").innerHTML = html;
	// set the title of the document to the title of the route
	document.title = route.title;
	// set the description of the document to the description of the route
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
  store.writeFills();

};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();