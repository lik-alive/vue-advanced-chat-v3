<?php

namespace App\Http\Requests\MessageCenter;

use DateInterval;
use DateTime;
use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
  protected $stopOnFirstFailure = true;

  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    // Room is valid
    if (isset($this->room)) {
      if (is_null($this->room->me)) return false;
    }

    // Message is valid
    if (isset($this->message)) {
      if ($this->message->participant->user_id !== \Auth::user()->id) return false;
    }

    // Reply is valid
    if (isset($this->reply_id)) {
      if (!$this->room->messages->contains($this->reply_id)) return false;
    }

    // Block readonly rooms
    if ($this->isMethod('POST')) {
      if ($this->room->readonly) return false;
    }

    // Set visited status
    $room = $this->room ?? optional($this->message)->room;
    if (isset($room)) {
      $room->me->update([
        'visited_at' => now()
      ]);
    }

    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    $rules =  [
      'content' => 'nullable|string|max:1024',
      'files' => 'array',
      'files.*' => 'file|max:10240',
      'files_loaded' => 'array',
    ];

    if ($this->isMethod('POST')) {
      $rules['reply_id'] = 'nullable|exists:mc_messages,id';
    }

    if ($this->isMethod('GET') || $this->isMethod('DELETE')) {
      return [];
    }

    return $rules;
  }

  public function withValidator($validator)
  {
    $validator->after(function ($validator) {
      $this->checkFilenames($validator);
      $this->checkEditable($validator);
    });
  }

  /**
   * Check filename length
   */
  private function checkFilenames($validator)
  {
    if ($this->file('files')) {
      foreach ($this->file('files') as $key => $file) {
        if (mb_strlen($file->getClientOriginalName()) > 255) {
          $validator->errors()->add("files.$key", "The files.$key name is too long.");
        }
      }
    }
  }

  /**
   * Check if message is editable
   */
  private function checkEditable($validator)
  {
    $allowed = ['PUT', 'PATCH', 'DELETE'];
    // Less than 15minutes after creation
    if (in_array($this->getMethod(), $allowed, true)) {
      $deadline = new DateTime($this->message->created_at);
      $deadline->add(new DateInterval('PT15M'));
      if (new DateTime() > $deadline) $validator->errors()->add('timeout', 'Message cannot be deleted anymore');
    }
  }
}
