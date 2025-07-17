<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Auth\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\GoogleProvider;
use Laravel\Socialite\Two\User as SocialiteUser;

final class ProviderCallbackController extends Controller
{
    public function __invoke(): RedirectResponse
    {
        try {
            /** @var GoogleProvider $provider */
            $provider = Socialite::driver('google');
            /** @var SocialiteUser $socialiteUser */
            $socialiteUser = $provider->stateless()->user();
        } catch (Exception $e) {
            $message = app()->environment('production') ? 'Authentication failed.' : $e->getMessage();

            return Redirect::route('login')->with('error', $message);
        }

        if (! $this->isAllowedDomain($socialiteUser->email)) {
            return Redirect::route('login')->with('error', 'You are not authorized to access this application.');
        }

        $user = $this->updateOrCreateUser($socialiteUser, 'google');

        Auth::login($user);

        return Redirect::route('dashboard');
    }

    private function isAllowedDomain(string $email): bool
    {
        $allowedDomain = Config::get('services.allowed_domain');
        $emailDomain = explode('@', $email)[1] ?? null;

        return empty($allowedDomain) || $emailDomain === $allowedDomain;
    }

    private function updateOrCreateUser(SocialiteUser $socialiteUser, string $provider): User
    {
        $user = User::updateOrCreate([
            'email' => $socialiteUser->getEmail(),
        ], [
            'name' => $socialiteUser->getName(),
            'avatar' => $socialiteUser->getAvatar(),
            'email_verified_at' => Carbon::now(),
        ]);

        $user->authAccount()->updateOrCreate([
            'provider' => $provider,
            'provider_id' => $socialiteUser->getId(),
        ], [
            'provider_token' => $socialiteUser->token,
            'provider_refresh_token' => $socialiteUser->refreshToken,
        ]);

        return $user;
    }
}
