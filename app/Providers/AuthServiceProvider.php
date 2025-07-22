<?php
namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        Passport::tokensCan([
            'view-profile' => 'View own user profile',
            'view-post'    => 'View/read posts',
            'create-post'  => 'Create posts',
            'edit-post'    => 'Edit posts',
            'delete-post'  => 'Delete posts',
            'ban-user'     => 'Ban users',
            'moderate'     => 'Moderate forum',
            'admin'        => 'Admin access',
        ]);

        Passport::tokensExpireIn(now()->addMonth());

        Passport::refreshTokensExpireIn(now()->addMonth());

        Passport::personalAccessTokensExpireIn(now()->addMonth());
    }
}
