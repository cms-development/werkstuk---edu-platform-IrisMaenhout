<?php

use App\Http\Controllers\CreateEntryController;
use App\Tags\CreateEntry;
use Illuminate\Support\Facades\Route;

// Action route on like/dislike
Route::name('create_entry.')->group( function()
    {
        Route::post('/create', [CreateEntry::class, 'store'] )->name('store');
    }
);
