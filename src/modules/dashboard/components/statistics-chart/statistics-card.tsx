/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col } from 'antd'
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import cls from './statistics-card.module.scss'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const StatisticsChart = ({ chartData }: { chartData: any }) => {
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
            size: 11,
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

  return (
    <Col span={24} className={cls.metricCard}>
      <div style={{ height: 200 }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Col>
  )
}

export default StatisticsChart
