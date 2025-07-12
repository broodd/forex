/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col } from 'antd'
import { useMemo } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { geoPatterson } from 'd3-geo-projection'
import cls from './traffic-map.module.scss'

// TopoJSON data for a low-resolution world map (needed by react-simple-maps)
// You might need to download this file and place it in your public folder or src
// For simplicity, we'll use a direct link for demonstration, but for production,
// it's better to host it locally or proxy it.
// 'https://raw.githubusercontent.com/d3/d3.github.com/refs/heads/master/world-110m.v1.json'
const geoUrl = '/word-map.json'

// Dummy data for the map points and the list below it
// In a real app, this data would come from your backend API
const mapData = [
  { name: 'Spain', value: 116, percentage: '88.5%', coordinates: [-3.7038, 40.4168], color: 'red' },
  { name: 'Italy', value: 6, percentage: '4.6%', coordinates: [12.5674, 41.9028], color: 'orange' },
  { name: 'Ukraine', value: 4, percentage: '3.1%', coordinates: [30.5234, 50.4501], color: 'gold' },
  {
    name: 'Czech Republic',
    value: 3,
    percentage: '2.3%',
    coordinates: [14.4378, 50.0755],
    color: 'green',
  },
  { name: 'Canada', value: 2, percentage: '1.5%', coordinates: [-75.6972, 45.4215], color: 'blue' },
]

const TrafficMap = () => {
  // const [selectedMetric, setSelectedMetric] = useState('Impressions') // State for dropdown

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleMenuClick = (e: any) => {
  //   setSelectedMetric(e.key)
  // }

  // const metricMenu = (
  //   <Menu onClick={handleMenuClick}>
  //     <Menu.Item key='Impressions'>Impressions</Menu.Item>
  //     <Menu.Item key='Clicks'>Clicks</Menu.Item>
  //     <Menu.Item key='Leads'>Leads</Menu.Item>
  //   </Menu>
  // )

  const customProjection = useMemo(() => {
    return geoPatterson()
      .scale(190) // <-- Apply scale directly to the projection instance
      .center([40, 30]) // <-- Apply center directly to the projection instance
  }, [])

  return (
    <Col span={24} className={cls.trafficCard}>
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <AntdTitle level={5} style={{ color: '#f3c75d', margin: 0 }}>
          Traffic Map
        </AntdTitle>
        <Dropdown overlay={metricMenu} trigger={['click']}>
          <Button type='link' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            {selectedMetric} <DownOutlined style={{ marginLeft: 5 }} />
          </Button>
        </Dropdown>
      </div> */}

      <div
        style={{
          width: '100%',
          height: '170px',
          overflow: 'hidden',
        }}
      >
        <ComposableMap
          projection={customProjection}
          // projectionConfig={{
          //   scale: 500, // Adjust scale as needed for the new projection
          //   center: [0, 0], // Default center for Patterson, adjust if necessary
          // }}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
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
                />
              ))
            }
          </Geographies>
          {/* Dynamically add Markers */}
          {mapData.map(({ name, coordinates, color }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle
                r={20}
                fill={color}
                stroke={color}
                strokeWidth='30'
                stroke-opacity='0.2'
                cursor='pointer'
              />
            </Marker>
          ))}
        </ComposableMap>
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
