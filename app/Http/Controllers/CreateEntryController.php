<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Entry;

class CreateEntryController extends Controller
{
    //

    public function store(Request $r)
    {
        // dd($r);

        $title = $r->title;
        $slug = $r->slug;
        $categories = $r->categories;
        $hero_description = $r->hero_description;

        $entry = Entry::make()
            ->collection('sources')
            ->published(false)
            ->blueprint('verdiepingsdossier')
            ->slug($slug)
            ->data([
                'title' => $title,
                'hero_description' => $hero_description,
                'categories' => $categories,
                'content_type' => 'verdiepingsdossier',
                'main_image' =>  $this->storeImg($r)
            ]);


        $entry->save();
        dd($entry);


        // return redirect()->back();
    }


    private function storeImg($r)
    {
        $new_image_name = $r->slug . '-' . uniqid() . '.' . $r->main_image->extension();

        $r->main_image->move(public_path('assets/verdiepingsdossieren'), $new_image_name);

        return 'verdiepingsdossieren/' . $new_image_name;
    }
}
