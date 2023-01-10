<?php

namespace App\Tags;

use Statamic\Tags\Tags;

class CreateEntry extends Tags
{
    /**
     * The {{ create_entry }} tag.
     *
     * @return string|array
     */

     private function viewData(){
        // $context = $this->context;

        $data = [
            'csrf_field' => csrf_field(),
            'route_store' => route('statamic.create_entry.store')
        ];

        return $data;
    }

    public function index()
    {
        //

        $data = [
            'csrf_field' => csrf_field(),
            // 'route_store' => route('statamic.create_entry.store')
        ];

        return view('partials/create_entry_btn', $data);
    }

    /**
     * The {{ create_entry:example }} tag.
     *
     * @return string|array
     */
    public function example()
    {
        //
    }
}
