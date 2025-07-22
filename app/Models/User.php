<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Laravel\Passport\PersonalAccessTokenResult;

class User extends Authenticatable
{
    const STATUS_ACTIVE   = 'Active';
    const STATUS_DEACTIVE = 'Deactive';

    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function hasPermission($permissionName)
    {
        return $this->role
            ->permissions()
            ->where('name', $permissionName)
            ->exists();
    }

    public function getScopesForRole($role)
    {
        switch ($role) {
            case 'admin':
                return ['view-profile', 'view-post', 'create-post', 'edit-post', 'delete-post', 'ban-user', 'moderate', 'admin'];
            case 'moderator':
                return ['view-profile', 'view-post', 'edit-post', 'delete-post', 'moderate'];
            case 'member':
                return ['view-profile', 'view-post', 'create-post', 'edit-post'];
            case 'guest':
                return ['view-post'];
            case 'banned':
                return [];
            default:
                return ['view-post'];
        }
    }

    public function issueToken(): PersonalAccessTokenResult
    {
        $name   = $this->username;
        $role   = $this->getAttribute('role')->getAttribute('name');
        $scopes = $this->getScopesForRole($role);
        return $this->createToken($name, $scopes);
    }
}
