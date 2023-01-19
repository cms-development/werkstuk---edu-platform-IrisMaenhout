<?php

namespace App\Http\Controllers;

use Facades\Statamic\Fieldtypes\RowId;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailables\Content;
use Statamic\Facades\Entry;

class CreateEntryController extends Controller
{

    public function store(Request $r)
    {

        $title = $r->title;
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
        $categories = $r->categories;

        $entry = Entry::make()
            ->collection('sources')
            ->published(false)
            ->blueprint('verdiepingsdossier')
            ->slug($slug)
            ->data([
                'title' => $title,
                'categories' => $categories,
                'content_type' => 'verdiepingsdossier',
                'main_image' =>  $this->storeImg($r),
                'document_content' => []
            ]);


        $entry->save();
        return redirect('/account/verdiepingsdossier/'. $entry->slug . '/wijzigen');
    }


    private function storeImg($r)
    {
        $new_image_name = $r->slug . '-' . uniqid() . '.' . $r->main_image->extension();

        $r->main_image->move(public_path('assets/verdiepingsdossieren'), $new_image_name);

        return 'verdiepingsdossieren/' . $new_image_name;
    }


}
