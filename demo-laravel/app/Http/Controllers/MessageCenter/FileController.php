<?php

namespace App\Http\Controllers\MessageCenter;

use App\Http\Controllers\Controller;
use App\Models\MessageCenter\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * Get a file
     * 
     * @param File $file
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    function show(File $file)
    {
        if (is_null($file->message->room->me)) {
            abort(403);
        }

        $content = Storage::get($file->path);

        return Storage::download($file->path, $file->name, ['Accept-Ranges' => 'bytes']);
    }
}
