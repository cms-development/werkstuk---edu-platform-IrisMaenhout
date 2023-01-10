<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Entry;

class CreateEntryController extends Controller
{
    //

    public function store(Request $r)
    {
        dd('dit is een nieuwe entry');
        // $entry = Entry::make()
        //     ->collection('sources')
        //     ->published(false)
        //     ->blueprint('verdiepingsdossier')
        //     ->slug('product-slug')
        //     ->data([
        //         'title' => 'product name'
        //     ]);

        // $entry->save();

        // dd($entry);
        // return redirect()->back();
    }
}
