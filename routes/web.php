<?php

use App\Http\Controllers\CreateEntryController;
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
Route::statamic('/inloggen', 'public/login');
Route::statamic('/forgot-password', 'public/forgot_password');
Route::statamic('/reset-password', 'public/reset_password');
Route::statamic('/geen-toegang', 'public/no_access');

Route::statamic('/create-entry', 'sources/student_mini_site/create_mini_site');

Route::statamic('/account/verdiepingsdossier/{source_slug}/wijzigen', 'sources/student_mini_site/edit_mini_site');
Route::statamic('/account/verdiepingsdossier/{source_slug}/map-{folder_slug}/wijzigen', 'sources/student_mini_site/edit_mini_site');


// ->name('no-access-error.show');
// Route::name('create_entry.')->group( function()
//     {
//         Route::post('/create', [CreateEntry::class, 'store'] )->name('store');
//     }
// );

// Route::get('/{mini_site_slug}/{page_slug}', function ($mini_site_slug, $page_slug) {
//     // $entry = Entry::query()
//     // // ->where('collection', 'source')
//     // ->where('content_type', 'verdiepingsdosier')
//     // ->first();

//     $entry = Entry::findByUri('/' . $mini_site_slug);

//     function search_child_page($var)
//     {
//         return str_contains(json_encode($var), "dit-is-een-pagina");
//     }

//     dd($entry);
//     if($entry["document_content"]) {
//         $availibility_child_page = array_filter($entry["document_content"], "search_child_page");

//         dd($availibility_child_page);
//     }


//     // return $mini_site_page_slug;
// });



    $link = explode("/", $_SERVER['REQUEST_URI']);
    $entry = Entry::findByUri('/' . $link[1]);

    if($entry !== null && $entry->blueprint == 'verdiepingsdossier'){
        Route::statamic('{collection_url}/{child_page}', 'sources/student_mini_site/mini_site_child_page');
    }

    Route::post('/create', [CreateEntryController::class, 'store'] )->name('store');
    Route::post('/create-new-page', [CreateEntryController::class, 'createNewPage'] )->name('add-new-page');
    Route::post('/create-new-folder', [CreateEntryController::class, 'createNewFolder'] )->name('add-new-folder');

    Route::post('/change-folder-file-name', [CreateEntryController::class, 'changeName'] )->name('change-name');


