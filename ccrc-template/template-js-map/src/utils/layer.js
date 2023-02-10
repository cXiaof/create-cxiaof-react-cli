import * as $$ from '@/constants'
import * as utils from '@/utils'

export const getLayer = (layerName, map = window.map) => {
  const layer = map.getLayer(layerName)
  if (layer) return layer
  const group = map.getLayer($$.GroupGL)
  if (!group) return null
  return group.getChildLayer(layerName)
}

export const getNewLayer = (options, map = window.map) => {
  removeLayer(options.layerName, map)
  return newLayerSwitchType(options)
}

export const showLayer = (layerName, map = window.map) => {
  basicDealAPI('show', layerName, map)
}

export const hideLayer = (layerName, map = window.map) => {
  basicDealAPI('hide', layerName, map)
}

export const clearLayer = (layerName, map = window.map) => {
  basicDealAPI('clear', layerName, map)
}

export const removeLayer = (layerName, map = window.map) => {
  layerPackDeal(
    layerName,
    map,
    (layer) => layer.remove(),
    (name) => removeLayerFromGroup(name),
  )
}

export const layerExist = (layerName, map = window.map) => {
  let result = true
  utils.items.packAttrToArr(layerName, (item) => {
    result = result && getLayer(item, map)?.isVisible()
  })
  return result
}

export const layerIdentify = async (params, layers) => {
  if (layers.length === 0) return []
  return new Promise((resolve) => {
    const options = { coordinate: params.coordinate, tolerance: 5, layers }
    params.target.identify(options, resolve)
  })
}

export const addLayerToGroup = (layer, map = window.map) => {
  let group = map.getLayer($$.GroupGL)
  if (!group) {
    const newLayerAttr = { layerName: $$.GroupGL, type: 'GroupGL' }
    group = getNewLayer(newLayerAttr).addTo(map).bringToBack()
  }
  utils.items.packAttrToArr(layer, (item) => {
    removeLayerFromGroup(item.getId(), map)
    group.addLayer(item)
  })
}

export const removeLayerFromGroup = (layerName, map = window.map) => {
  const group = map.getLayer($$.GroupGL)
  if (group) {
    utils.items.packAttrToArr(layerName, (item) => {
      if (group.getChildLayer(item)) group.removeLayer(item)
    })
  }
}

export const removeGeoById = (geoId, layerName, map = window.map) => {
  getLayer(layerName, map)?.getGeometryById(geoId)?.remove()
}

const newLayerSwitchType = (attr) => {
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

const basicDealAPI = (API, layerName, map) => {
  layerPackDeal(
    layerName,
    map,
    (layer) => layer[API](),
    (name) => getLayer(name, map)[API](),
  )
}

const layerPackDeal = (layerName, map, success, error) => {
  utils.items.packAttrToArr(layerName, (item) => {
    if (map.getLayer(item)) success(getLayer(item, map))
    else if (getLayer(item, map)) error(item)
  })
}
