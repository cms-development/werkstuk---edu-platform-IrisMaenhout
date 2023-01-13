<?php

namespace App\Http\Controllers;

use Facades\Statamic\Fieldtypes\RowId;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailables\Content;
use Statamic\Facades\Entry;

class CreateEntryController extends Controller
{
    //

    // protected function convertLegacyData($value)
    // {
    //     return collect($value)->flatMap(function ($set, $i) {
    //         if ($set['type'] === 'text') {
    //             if (empty($set['text'])) {
    //                 return;
    //             }
    //             $doc = (new \HtmlToProseMirror\Renderer)->render($set['text']);

    //             return $doc['content'];
    //         }

    //         return [
    //             [
    //                 'type' => 'set',
    //                 'attrs' => [
    //                     'id' => RowId::generate(),
    //                     'values' => $set,
    //                 ],
    //             ],
    //         ];
    //     })->all();
    // }

    public function store(Request $r)
    {
        // dd($r);

        $title = $r->title;
        $slug = $r->slug;
        $categories = $r->categories;
        $hero_description = $r->hero_description;

        $document_content = [
            [
                'id' => RowId::generate(),
                'title_page' => 'test pagina',
                'slug' => 'test-page',
                'page_layout' => [
                    [

                        'type' => 'paragraph',
                        'content' => [
                            [
                                'type' => 'text',
                                'text' => 'Hello, ik ben Iris'
                            ]

                        ],
                    ],
                ],
                'type' => 'new_page',
                'enabled' => 'true'
            ],
        ];

        // id: lcrn0u3c
        // title_page: 'Voorbeeld pagina'
        // slug: voorbeeld
        // page_layout:
        // -
        //     type: paragraph
        //     content:
        //     -
        //         type: text
        //         text: Test
        // type: new_page
        // enabled: true

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
                'main_image' =>  $this->storeImg($r),
                'document_content' => []
            ]);


        $entry->save();
        // dd($entry->id);


        return redirect('/account/verdiepingsdossier/'. $entry->slug . '/wijzigen');
    }


    private function storeImg($r)
    {
        $new_image_name = $r->slug . '-' . uniqid() . '.' . $r->main_image->extension();

        $r->main_image->move(public_path('assets/verdiepingsdossieren'), $new_image_name);

        return 'verdiepingsdossieren/' . $new_image_name;
    }


}
