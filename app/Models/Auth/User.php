<?php

declare(strict_types=1);

namespace App\Models\Auth;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property-read string $id
 * @property-read string $name
 * @property-read string|null $avatar
 * @property-read string $email
 * @property-read CarbonImmutable|null $email_verified_at
 * @property-read CarbonImmutable $created_at
 * @property-read CarbonImmutable $updated_at
 */
final class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The credential of the user.
     *
     * @return HasOne<AuthAccount, $this>
     */
    public function authAccount(): HasOne
    {
        return $this->hasOne(AuthAccount::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }
}
