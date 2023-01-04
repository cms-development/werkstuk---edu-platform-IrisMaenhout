<?php

use App\Http\Controllers\FilterContentType;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

// Route::get('/filter-content-type', [FilterContentType::class, "index"])->name('filter.index');


// Route::statamic('/inloggen', 'view', ['layout' => 'custom']);
Route::statamic('/inloggen', 'public/login');
Route::statamic('/forgot-password', 'public/forgot_password');
Route::statamic('/reset-password', 'public/reset_password');
Route::statamic('/geen-toegang', 'public/no_access');
// Route::get('/geen-toegang', 'public/no_access')
// ->name('no-access-error.show');
