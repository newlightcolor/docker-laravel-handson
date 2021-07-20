<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $url = env('APP_URL').':8889';
        return $next($request)
            ->header('Access-Control-Allow-Origin', $url)
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type');
    }
}
