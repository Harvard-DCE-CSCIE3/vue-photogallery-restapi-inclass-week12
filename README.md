# CSCI E-31: Vue PhotoGallery Demo 

This project is baed ont he Week11-inclass repo, and builds towards the end state of week 12. 

This is a **small Vue 3 + TypeScript demo app** for CSCI E-31. **It mirrors the end state of the Express Photo Gallery Vue App as of the end of class meeting 11.** 

It renders a photo gallery using **mock data** (no backend calls in this version), and is meant to support early Vue learning goals. It handles the RUD of CRUD (Create, Read, Update, Delete) with a simple local data service, but does not include file upload or any real persistence.

## What this project adds to the Week 11 example:

Complete the transitio from mock data to the Express REST API, including:
- Replace the local data service with API calls to the Express backend
	- Use `fetch()` to make HTTP requests to the backend API routes
	- Handle asynchronous calls with `async/await` and error handling
- Update the UI to reflect changes from API responses
	- Load the gallery with photos from the backend
	- Update detail/edit views with data from the backend
	- Handle UI updates after create/update/delete actions
- Handle form input and submission with API calls - putting the Create in CRUD
	- Use `v-model` for form inputs and submit handlers to send file data to the backend
	- Update the UI based on success or error responses from the backend
- Deployment to a hosting service with the Express backend deployed separately (e.g. Heroku, Render)
	- VITE environment variables for API base URL
	- rewrite rules for client-side routing in production


## Install and run

From this project folder:

1. Install dependencies

	`npm install`

2. Start the dev server

	`npm run dev`

3. Open the URL shown in the terminal (usually http://localhost:5173)

---

## Other useful scripts

- `npm run build` → type-checks with `vue-tsc` and builds for production
- `npm run preview` → serves the production build locally

---


