<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ProviderCallbackController;
use App\Http\Controllers\Auth\ProviderRedirectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
});

Route::middleware('guest')->group(function () {
    Route::redirect('/', 'login');

    Route::get('login', [LoginController::class, 'index'])->name('login');

    Route::prefix('auth')->group(function () {
        Route::get('{provider}/redirect', ProviderRedirectController::class)
            ->name('auth.redirect');
        Route::get('{provider}/callback', ProviderCallbackController::class)
            ->name('auth.callback');
    });
});
