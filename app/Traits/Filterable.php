<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait Filterable {
    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $params
     * @return mixed
     */
    public function scopeFilter($query, array $params)
    {
        foreach ($params as $field => $value)
        {
            $method = 'filter' . Str::studly($field);

            if ($value === null) continue;

            // The model has method filterXXXX
            if (method_exists($this, $method)) {
                $this->{$method}($query, $value);
                continue;
            };

            // The model does not use filterable define variable
            if (empty($this->filterable) || !is_array($this->filterable)) {
                continue;
            }

            // The model uses filterable define variable
            if (in_array($field, $this->filterable)) {
                $query->where($this->table . '.' . $field, $value);
                continue;
            }

            // The model uses filterable define variable with the alias
            // 'filterKey' => 'table_colum'
            if (key_exists($field, $this->filterable)) {
                $query->where($this->table . '.' . $this->filterable[$field], $value);
                continue;
            }
        }

        return $query;
    }
}
