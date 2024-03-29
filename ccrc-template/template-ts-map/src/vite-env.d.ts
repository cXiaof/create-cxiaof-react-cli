/// <reference types="vite/client" />

declare const maptalks: any

type Obj = Record<string, any>

interface Window {
  map: any
}

type NumberType = number | string

interface Number {
  strip: (precision?: number) => number
  times: (...nums: NumberType[]) => number
  plus: (...nums: NumberType[]) => number
  minus: (...nums: NumberType[]) => number
  divide: (...nums: NumberType[]) => number
  round: (decimal: number) => number
}

// maptalks
type FeatureID = string | number
type Position = number[]
type Coordinates = Position | Position[] | Position[][] | Position[][][]

type Relation = 0 | 1 | 2 | 3 | 4 | 5 | 100 | 101 | 102
type CrsString = 'GCJ02' | 'BD09LL' | 'WGS84'

type GeoJSONGeometry = {
  type: string
  coordinates: Coordinates
}

type Feature<T = Obj | null> = {
  id?: FeatureID
  type: 'Feature'
  geometry: GeoJSONGeometry
  properties: T
  symbol?: Obj | Obj[]
}

type FeatureCollection = {
  type: 'FeatureCollection'
  features: Feature[]
}

type SpatialFilter = {
  geometry: GeoJSONGeometry
  relation: Relation
  crs: CrsString
}
