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



    public function createNewPage(Request $r)
    {
        $mini_site_id = $r->source_id;
        $location = $r->new_page_location;

        $entry = Entry::find($mini_site_id);
        $document_content = $entry->get('document_content');

        $new_page_info = [
            'id' => RowId::generate(),
            'title_page' => 'Nieuwe pagina',
            'slug' => 'nieuwe-pagina',
            'type' => 'new_page',
            'enabled' => true
        ];


        if($location === 'root'){
            $document_content[] = $new_page_info;
        }else{
            foreach($document_content as $key => $content) {
                if(isset($content['title_folder']) && $content['title_folder'] === $location){
                    // $corect_folder = $content;
                    $content['pages'][] = $new_page_info;

                    // dump($key);
                    $document_content[$key] = $content;
                }
            }
        }

        // dd($document_content);

        $entry->set('document_content', $document_content);
        $entry->save();
        // dd($entry);
        return redirect()->back();
    }



    public function createNewFolder(Request $r)
    {
        $mini_site_id = $r->source_id;

        $entry = Entry::find($mini_site_id);
        $document_content = $entry->get('document_content');

        $document_content[] = [
            'id' => RowId::generate(),
            'title_folder' => 'Nieuwe map',
            'type' => 'new_folder',
            'enabled' => true,
            'pages' => []
        ];

        // dd($document_content);
        $entry->set('document_content', $document_content);
        $entry->save();
        return redirect()->back();
    }

    public function changeName(Request $r)
    {
        $new_name = $r->new_name;
        $original_title = $r->original_title;
        $source_slug = $r->source_slug;
        $is_file_folder = $r->is_file_folder;
        $location = $r->location;

        $entry = Entry::findByUri('/'. $source_slug);

        $document_content = $entry->get('document_content');



        if($is_file_folder === 'folder'){
            foreach($document_content as $key => $content) {
                if(isset($content['title_folder']) && $content['title_folder'] === $original_title){
                    $content['title_folder']= $new_name;
                    $document_content[$key] = $content;
                }

            }
        }else{
            if($location === 'wijzigen'){
                // = root location

                foreach($document_content as $key => $content) {

                    if(isset($content['title_page']) && $content['title_page'] === $original_title){

                        $content['title_page']= $new_name;
                        $content['slug']= strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $new_name)));
                        $document_content[$key] = $content;
                    }

                }
            }else{
                foreach($document_content as $key => $content) {
                    if(isset($content['title_folder']) && strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $content['title_folder']))) === str_replace("map-", "", $location)){
                        $content_key = $key;

                        foreach($content['pages'] as $key => $page) {

                            $page['title_page'] = $new_name;
                            $page['slug']= strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $new_name)));
                            $content['pages'][$key] = $page;

                        }

                        $document_content[$content_key] = $content;
                    }
                }
            }

        }

        // dd($document_content);
        $entry->set('document_content', $document_content);
        $entry->save();
        return redirect()->back();

    }
}
