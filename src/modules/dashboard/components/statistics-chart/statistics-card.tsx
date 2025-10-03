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
  type Plugin,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import cls from './statistics-card.module.scss'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const StatisticsChart = ({
  chartData,
  options,
  plugins,
}: {
  chartData: any
  options?: ChartOptions<'line'>
  plugins?: Plugin<any>[]
}) => {
  // Calculate totals for legend if you want "Impressions 131" format
  const calculateTotals = (datasets: any) => {
    const totals: any = {}
    datasets.forEach((dataset: any) => {
      const sum = dataset.data.reduce((acc: any, val: any) => acc + val, 0)
      totals[dataset.label] = sum
    })
    return totals
  }

  const totals = calculateTotals(chartData.datasets)

  // Adjust dataset labels to include totals if needed, for the legend
  const datasetsWithTotals = chartData.datasets.map((dataset: any) => ({
    ...dataset,
    label: `${dataset.label} ${totals[dataset.label]}`, // e.g., "Impressions 131"
  }))

  const finalChartData = {
    labels: chartData.labels,
    datasets: datasetsWithTotals,
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
        callbacks: {
          label: function (context) {
            // context.dataset.label gives "Impressions", "Leads", "FTDs"
            // context.parsed.y gives the data value (e.g., 18, 0, 2)
            return `${context.dataset.label?.split(' ')[0]}: ${context.parsed.y}` // This will show "Impressions: 18", "Leads: 0", etc.
          },
        },
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
    ...options,
  }

  return (
    <Col span={24} className={cls.metricCard}>
      <div style={{ height: 200 }}>
        <Line data={finalChartData} options={chartOptions} plugins={plugins} />
      </div>
    </Col>
  )
}

export default StatisticsChart
