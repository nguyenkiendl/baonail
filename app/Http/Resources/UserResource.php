<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'username'   => $this->username,
            'name'       => $this->name,
            'email'      => $this->email,
            'status'     => $this->status,
            'created_at' => $this->created_at,
            'role_id'    => $this->role->id,
            'role'       => $this->role->name,
            'role_name'  => $this->role->display_name,
        ];
    }
}