/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col } from 'antd'
import { geoPatterson } from 'd3-geo-projection'
import { useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import cls from './traffic-map.module.scss'

// TopoJSON data for a low-resolution world map (needed by react-simple-maps)
// You might need to download this file and place it in your public folder or src
// For simplicity, we'll use a direct link for demonstration, but for production,
// it's better to host it locally or proxy it.
// 'https://raw.githubusercontent.com/d3/d3.github.com/refs/heads/master/world-110m.v1.json'
const geoUrl = '/word-map-prop.json'

// Dummy data for the map points and the list below it
// In a real app, this data would come from your backend API

const TrafficMap = ({
  mapData,
}: {
  mapData: {
    name: string
    value: string | number
    percentage: string
    coordinates: any
    color: string
  }[]
}) => {
  const customProjection = useMemo(() => {
    return geoPatterson()
      .scale(190) // <-- Apply scale directly to the projection instance
      .center([40, 30]) // <-- Apply center directly to the projection instance
  }, [])

  const [tooltipContent, setTooltipContent] = useState('aga')

  return (
    <Col span={24} className={cls.trafficCard}>
      <div
        style={{
          width: '100%',
          height: '170px',
          overflow: 'hidden',
        }}
      >
        <ComposableMap
          projection={customProjection}
          style={{ width: '100%', height: '100%' }}
          data-tip=''
          data-for='map-tooltip'
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(geo.properties.name)
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('')
                  }}
                  style={{
                    default: {
                      fill: '#dee2e8', // Default country fill color
                      stroke: '#2a2a2a', // Country border color
                      outline: 'none',
                    },
                    hover: {
                      fill: '#6a6a6a', // Hover color
                      stroke: '#2a2a2a',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#6a6a6a', // Click color
                      stroke: '#2a2a2a',
                      outline: 'none',
                    },
                  }}
                ></Geography>
              ))
            }
          </Geographies>
          {mapData.map(({ coordinates, color }, index) => (
            <Marker key={index} coordinates={coordinates}>
              <circle
                r={20}
                fill={color}
                stroke={color}
                strokeWidth='30'
                strokeOpacity='0.2'
                cursor='pointer'
              />
            </Marker>
          ))}
        </ComposableMap>
        <ReactTooltip
          id='map-tooltip'
          backgroundColor='white'
          textColor='black'
          arrowColor='transparent'
          padding='0 2px'
          // disableInternalStyle={true}
        >
          {tooltipContent}
        </ReactTooltip>
      </div>

      <div className={cls.trafficMapList}>
        {mapData.map((country, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <span
              className={cls.point}
              style={{
                background: country.color,
              }}
            ></span>
            <span className={cls.country}>{country.name}</span>
            <span className={cls.countryValue}>{country.value}</span>
            <span className={cls.percentage}>{country.percentage}</span>
          </div>
        ))}
      </div>
    </Col>
  )
}

export default TrafficMap
