import * as $$ from '@/constants'
import * as utils from '@/utils'

interface NewLayerOpts {
  type?: string
  layerName: string
  options?: Obj
  data?: any
}

export const getLayer = (layerName: string, map = window.map) => {
  const layer = map.getLayer(layerName)
  if (layer) return layer
  const group = map.getLayer($$.GroupGL)
  if (!group) return null
  return group.getChildLayer(layerName)
}

export const getNewLayer = (options: NewLayerOpts, map = window.map) => {
  removeLayer(options.layerName, map)
  return newLayerSwitchType(options)
}

export const showLayer = (layerName: string | string[], map = window.map) => {
  basicDealAPI('show', layerName, map)
}

export const hideLayer = (layerName: string | string[], map = window.map) => {
  basicDealAPI('hide', layerName, map)
}

export const clearLayer = (layerName: string | string[], map = window.map) => {
  basicDealAPI('clear', layerName, map)
}

export const removeLayer = (layerName: string | string[], map = window.map) => {
  layerPackDeal(
    layerName,
    map,
    (layer) => layer.remove(),
    (name) => removeLayerFromGroup(name, map),
  )
}

export const layerExist = (layerName: string | string[], map = window.map) => {
  let result = true
  utils.items.packAttrToArr(layerName, (item) => {
    result = result && getLayer(item, map)?.isVisible()
  })
  return result
}

export const layerIdentify = async (
  params: any,
  layers: any[],
): Promise<any[]> => {
  if (layers.length === 0) return []
  return new Promise((resolve) => {
    const options = { coordinate: params.coordinate, tolerance: 5, layers }
    params.target.identify(options, resolve)
  })
}

export const addLayerToGroup = (layer: any, map = window.map) => {
  let group = map.getLayer($$.GroupGL)
  if (!group) {
    const newLayerAttr = { layerName: $$.GroupGL, type: 'GroupGL' }
    group = getNewLayer(newLayerAttr, map).addTo(map).bringToBack()
  }
  utils.items.packAttrToArr(layer, (item) => {
    removeLayerFromGroup(item.getId(), map)
    group.addLayer(item)
  })
}

export const removeLayerFromGroup = (
  layerName: string | string[],
  map = window.map,
) => {
  const group = map.getLayer($$.GroupGL)
  if (group) {
    utils.items.packAttrToArr(layerName, (item) => {
      if (group.getChildLayer(item)) group.removeLayer(item)
    })
  }
}

export const removeGeosSameLayer = (geos: any) => {
  if (!geos) return
  const [firstGeo] = utils.items.packAttrToArr(geos)
  if (!firstGeo) return
  firstGeo.getLayer().removeGeometry(geos)
}

export const removeGeoById = (
  layerName: string,
  geoId: FeatureID,
  map: any,
) => {
  removeGeosSameLayer(getLayer(layerName, map)?.getGeometryById(geoId))
}

const newLayerSwitchType = (attr: NewLayerOpts) => {
  const { type, layerName, options } = attr
  const data = attr.data || []
  switch (type) {
    case 'Tile':
      return new maptalks.TileLayer(layerName, options)
    case 'GroupTile':
      return new maptalks.GroupTileLayer(layerName, options)
    case 'Vector':
      return new maptalks.VectorLayer(layerName, data, options)
    case 'Point':
      return new maptalks.PointLayer(layerName, data, options)
    case 'Line':
      return new maptalks.LineStringLayer(layerName, data, options)
    case 'Polygon':
      return new maptalks.PolygonLayer(layerName, data, options)
    case 'Group':
      return new maptalks.GroupGLLayer(layerName, data, options)
    case 'Image':
      return new maptalks.ImageLayer(layerName, options)
    case 'VTS':
      return new maptalks.VectorTileLayer(layerName, options)
    case 'GeoJSON':
      return new maptalks.GeoJSONVectorTileLayer(layerName, options)
    default:
      return new maptalks.VectorLayer(layerName, data, options)
  }
}

const basicDealAPI = (API: string, layerName: string | string[], map: any) => {
  layerPackDeal(
    layerName,
    map,
    (layer) => layer[API](),
    (name) => getLayer(name, map)[API](),
  )
}

const layerPackDeal = (
  layerName: string | string[],
  map: any,
  success: (layer: any) => any,
  error: (layerName: string) => any,
) => {
  utils.items.packAttrToArr(layerName, (item) => {
    if (map.getLayer(item)) success(getLayer(item, map))
    else if (getLayer(item, map)) error(item)
  })
}
