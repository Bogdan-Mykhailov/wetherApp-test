import React from 'react'
import { OptionsOrGroups } from 'react-select'
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoApi } from '../../api/geo/geo'
import { ResponseDataModel } from '../../api/geo/model'

interface Props {
  onSearchChange: ( searchData: string ) => void
  setSearch: ( searchData: ResponseDataModel ) => void
  search: ResponseDataModel | null
}

export const Search: React.FC<Props> = ( {
  onSearchChange,
  setSearch,
  search,
} ) => {
  const handleOnChange = ( searchData: any ) => {
    setSearch( searchData )
    onSearchChange( searchData )
  }

  const loadOptions = (
    inputValue: string,
    options: OptionsOrGroups<ResponseDataModel, any>,
  ) => {
    return geoApi.options( inputValue, options ).then( ( res ) => {
      return {
        'options': res.data.data.map( ( city ) => {
          return {
            'value': `${city.latitude} ${city.longitude}`,
            'label': `${city.name}, ${city.countryCode}`,
          }
        } ),
      }
    } )
  }

  return (
    <div>
      <AsyncPaginate
        placeholder="Enter the city"
        debounceTimeout={700}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  )
}
