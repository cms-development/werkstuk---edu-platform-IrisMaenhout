<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Entry;
use Facades\Statamic\Fieldtypes\RowId;

class EditSourceController extends Controller
{
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
                            if( $page['title_page'] === $original_title){

                                $page['title_page'] = $new_name;
                                $page['slug']= strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $new_name)));
                                $content['pages'][$key] = $page;
                            }
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


    public function removeFolder(Request $r)
    {
        $source_id = $r->source_id;
        $location = $r->title_folder;

        $entry = Entry::find($source_id);
        $document_content = $entry->get('document_content');

        foreach($document_content as $key => $content) {
            if(isset($content['title_folder']) && $content['title_folder'] === $location){

                unset($document_content[$key]);

            }

        }

        $entry->set('document_content', $document_content);
        $entry->save();
        return redirect('/account/verdiepingsdossier/' . $entry->slug . '/wijzigen');
    }
}
