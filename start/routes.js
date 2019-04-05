'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});
Route.post('/register', 'UserController.create');
Route.get('/users', 'UserController.getAll');
Route.get('/users/:id', 'UserController.getOne');
Route.delete('/users/:id', 'UserController.delete');
Route.post('/users/login', 'UserController.login');
Route.get('/user/token', 'UserController.findUserByToken');

Route.post('/post', 'PostController.post');
Route.get('/posts/:id', 'PostController.get').middleware('auth');