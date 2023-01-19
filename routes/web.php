<?php

use App\Http\Controllers\CreateEntryController;
use App\Http\Controllers\EditSourceContentController;
use App\Http\Controllers\EditSourceController;
use App\Http\Controllers\FilterContentType;
use Illuminate\Support\Facades\Route;
use Statamic\Facades\Entry;

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
Route::statamic('/search', 'search');

Route::statamic('/inloggen', 'public/login');
Route::statamic('/forgot-password', 'public/forgot_password');
Route::statamic('/reset-password', 'public/reset_password');
Route::statamic('/geen-toegang', 'public/no_access');
Route::statamic('/account/persoonlijke-info', 'update_account');
Route::statamic('/account/verdiepingsdossiers', 'sources/student_mini_site/overview_mini_sites');

Route::statamic('/nieuw-verdiepingsdossier', 'sources/student_mini_site/create_mini_site');

Route::statamic('/account/verdiepingsdossier/{source_slug}/wijzigen', 'sources/student_mini_site/edit_mini_site');
Route::statamic('/account/verdiepingsdossier/{source_slug}/map-{folder_slug}/wijzigen', 'sources/student_mini_site/edit_mini_site');

Route::statamic('/account/verdiepingsdossier/{source_slug}/{page_slug}/wijzigen', 'sources/student_mini_site/edit_content_mini_site');
Route::statamic('/account/verdiepingsdossier/{source_slug}/map-{folder_slug}/{page_slug}/wijzigen', 'sources/student_mini_site/edit_content_mini_site');


    if(isset($_SERVER['REQUEST_URI'])){
        $link = explode("/", $_SERVER['REQUEST_URI']);
        $entry = Entry::findByUri('/' . $link[1]);

        if($entry !== null && $entry->blueprint == 'verdiepingsdossier'){
            Route::statamic('{collection_url}/{child_page}', 'sources/student_mini_site/mini_site_child_page');
        }
    }


    Route::get('/account', function () {
        return redirect('/account/persoonlijke-info');
    });


    Route::post('/create', [CreateEntryController::class, 'store'] )->name('store');
    Route::post('/create-new-page', [EditSourceController::class, 'createNewPage'] )->name('add-new-page');
    Route::post('/create-new-folder', [EditSourceController::class, 'createNewFolder'] )->name('add-new-folder');

    Route::post('/remove-folder', [EditSourceController::class, 'removeFolder'] )->name('remove-folder');
    Route::post('/remove-page', [EditSourceController::class, 'removePage'] )->name('remove-page');

    Route::post('/update-title', [EditSourceController::class, 'changeSourceTitle'] )->name('change source title');
    Route::post('/change-folder-file-name', [EditSourceController::class, 'changeName'] )->name('change-name');
    Route::post('/update-main-page', [EditSourceContentController::class, 'updateMainPage'] )->name('update-main-page');
    Route::post('/update-page', [EditSourceContentController::class, 'updatePage'] )->name('update-page');
    Route::post('/publish-mini-site', [EditSourceController::class, 'makePublic'] )->name('publish mini site');




