<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;

final class ProviderRedirectController extends Controller
{
    public function __invoke(): RedirectResponse
    {
        $allowedDomain = Config::get('services.allowed_domain');

        try {
            /** @var \Laravel\Socialite\Two\GoogleProvider $provider */
            $provider = Socialite::driver('google');

            return $provider
                ->with(['hd' => $allowedDomain])
                ->stateless()
                ->redirect();
        } catch (Exception $e) {
            $message = App::isProduction() ? 'Something went wrong' : $e->getMessage();

            return Redirect::route('login')->with('provider', $message);
        }
    }
}
