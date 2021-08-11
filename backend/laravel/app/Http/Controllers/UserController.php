<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        return User::all();
    }

    public function show(User $user){
        return $user;
    }

    public function store(Request $request){
        $email = $request->input('email');
        $email_already_registered = User::where('email', '=', $request->input('email'))->exists();

        $return = array();

        if($email_already_registered){
            $return['error']['messages'][] = 'このメールアドレスは既に登録されています。';
            $return['result'] = 'NG';
        }else{
            User::create($request->all());
            $return['result'] = 'OK';
        }

        return json_encode($return);
    }

    public function update(Request $request, User $user){
        $user->update($request->all());

        return $user;
    }

    public function delete(User $user){
        $user->delete();

        return $user;
    }
}
