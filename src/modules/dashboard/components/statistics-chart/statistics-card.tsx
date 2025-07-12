import { Dropdown, Menu, Button, Col } from 'antd'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { DownOutlined } from '@ant-design/icons'
import cls from './statistics-card.module.scss'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const StatisticsChart = () => {
  // Dummy data for the chart, mimicking the trend in the image
  const chartData = {
    labels: ['04 Jul', '05 Jul', '06 Jul', '07 Jul', '08 Jul', '09 Jul', '10 Jul', '11 Jul'],
    datasets: [
      {
        label: 'Impressions 131',
        data: [18, 0, 4, 28, 22, 29, 18, 10], // Data points mimicking the orange line
        borderColor: '#f3c75d', // Orange color from the image
        backgroundColor: 'rgba(243, 199, 93, 0.2)', // Light orange fill
        pointBackgroundColor: '#f3c75d',
        pointBorderColor: '#f3c75d',
        pointRadius: 4,
        tension: 0.4, // Smooth curves
      },
      {
        label: 'Leads 94',
        data: [15, 0, 2, 23, 16, 19, 13, 10], // Data points mimicking the green line
        borderColor: '#52c41a', // Green color from the image
        backgroundColor: 'rgba(82, 196, 26, 0.2)', // Light green fill
        pointBackgroundColor: '#52c41a',
        pointBorderColor: '#52c41a',
        pointRadius: 4,
        tension: 0.4, // Smooth curves
      },
      {
        label: 'FTDs 0',
        data: [0, 0, 0, 0, 0, 0, 0, 0], // Data points for FTDs (appears flat at 0)
        borderColor: '#ffffff', // White color from the image
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Very light white fill
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#ffffff',
        pointRadius: 4,
        tension: 0.4, // Smooth curves
      },
    ],
  }

  // Chart options to match the visual style in the image
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill its container
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          color: 'white', // Legend text color
          font: {
            size: 14,
          },
          usePointStyle: true, // Use circular points for legend items
          boxHeight: 5,
          boxWidth: 3, // Size of the color box
          padding: 30, // Padding between legend items
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.7)', // Dark tooltip background
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#4a4a4a',
        borderWidth: 1,
      },
      title: {
        display: false, // We'll use Ant Design Typography for the title
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0)',
        },
        ticks: {
          color: '#aaaaaa', // X-axis label color
        },
        border: {
          display: false, // Hide x-axis line
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          // color: 'rgba(0, 0, 0, 0)',
          // color: '#3a3a3a', // Darker grid lines
          // drawBorder: false,
        },
        ticks: {
          color: '#aaaaaa', // Y-axis label color
          stepSize: 10, // Adjust step size as needed
        },
        border: {
          display: false, // Hide y-axis line
        },
      },
    },
  }

  const dropdownMenu = (
    <Menu
      items={[
        { key: '1', label: 'Option 1' },
        { key: '2', label: 'Option 2' },
        { key: '3', label: 'Option 3' },
      ]}
    />
  )

  return (
    <Col span={24} className={cls.metricCard}>
      <div
        style={{
          // display: 'flex',
          display: 'none',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Dropdown overlay={dropdownMenu} trigger={['click']}>
          <Button type='link' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            3 selected <DownOutlined style={{ marginLeft: 5 }} />
          </Button>
        </Dropdown>
      </div>
      <div style={{ height: 200 }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Col>
  )
}

export default StatisticsChart
