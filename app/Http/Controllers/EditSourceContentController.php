<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Entry;

class EditSourceContentController extends Controller
{

    public function updateMainPage(Request $r)
    {
        $page_content = $r->page_content;
        $source_id = $r->source_id;
        $page_slug = $r->page_slug;
        $json_content = json_decode($page_content, true);

        $entry = Entry::find($source_id);

        if($page_slug === 'info'){
            $entry->set('main_page_content', $json_content['content']);
        }else{
            $entry->set('hero_description', $json_content['content']);
        }

        $entry->save();
        return redirect()->back();
    }

    public function updatePage(Request $r)
    {
        $page_content = $r->page_content;
        $source_id = $r->source_id;
        $page_slug = $r->page_slug;
        $location = $r->location;

        $json_content = json_decode($page_content, true);

        $entry = Entry::find($source_id);
        $document_content = $entry->get('document_content');

        if($location === 'root'){

            foreach($document_content as $key => $content) {

                if(isset($content['slug']) && $page_slug === $content['slug']){
                    $content['page_layout'] = $json_content['content'];
                    $document_content[$key] = $content;
                }


            }
        }else{
            foreach($document_content as $content_key => $content) {

                if(isset($content['title_folder']) && strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $content['title_folder']))) === $location){

                    foreach ($content['pages'] as $key => $page) {
                        if($page_slug === $page["slug"]){
                            $page['page_layout'] = $json_content['content'];
                            $content['pages'][$key] = $page;

                        }

                    }

                    $document_content[$content_key] = $content;

                }
            }
        }

        $entry->set('document_content', $document_content);
        $entry->save();
        return redirect()->back();
    }

}
