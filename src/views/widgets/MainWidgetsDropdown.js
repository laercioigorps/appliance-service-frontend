import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import useToken from 'src/components/App/useToken'
import { API_URL } from 'src/components/App/urls'

function divideMatrix(matrix1, matrix2) {
  let mat = []
  for (let i = 0; i < matrix1.length; i++) {
    mat.push(matrix1[i] / matrix2[i])
  }
  return mat
}

async function getCustomerHistory(token) {
  return fetch(`${API_URL}/profiles/customer-history`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

async function getServiceHistory(token) {
  return fetch(`${API_URL}/services/service-history`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

const MainWidgetsDropdown = () => {
  const { token } = useToken()

  const [loaded, setLoaded] = useState(false)

  const [customerLabels, setCustomerLabels] = useState(false)
  const [customerData, setCustomerData] = useState(false)
  const [customerTotal, setCustomerTotal] = useState(0)
  const [customerDifference, setCustomerDifference] = useState(10)

  const [incomeHistoryData, setIncomeHistoryData] = useState(false)
  const [incomeHistoryLabels, setIncomeHistoryLabels] = useState(false)
  const [incomeDifference, setIncomeDifference] = useState(10)

  const [serviceCountHistoryData, setServiceCountHistoryData] = useState(false)
  const [serviceCountDataDifference, setServiceCountDataDifference] = useState(false)

  const [incomePerServicesData, setIncomePerServicesData] = useState(false)
  const [incomePerServicesDifference, setIncomePerServicesDifference] = useState(false)

  useEffect(() => {
    if (!loaded) {
      getCustomerHistory(token).then((history) => {
        console.log(history)
        setCustomerData(history.data)
        setCustomerLabels(history.labels)
        setCustomerTotal(history.total)
        calculateDiff(history.data)
        setCustomerDifference(calculateDiff(history.data).toFixed(2))
      })
      getServiceHistory(token).then((history) => {
        setIncomeHistoryData(history.incomeHistoryData)
        setIncomeHistoryLabels(history.incomeHistoryLabels)
        setIncomeDifference(calculateDiff(history.incomeHistoryData).toFixed(2))

        setServiceCountHistoryData(history.serviceCountHistoryData)
        setServiceCountDataDifference(calculateDiff(history.serviceCountHistoryData).toFixed(2))

        let incPerService = divideMatrix(history.incomeHistoryData, history.serviceCountHistoryData)
        setIncomePerServicesData(incPerService)
        setIncomePerServicesDifference(calculateDiff(incPerService).toFixed(2))
      })
      setLoaded(true)
    }
  })

  function calculateDiff(arr) {
    let now = arr[arr.length - 1]
    let last = arr[arr.length - 2]
    return ((now - last) / last) * 100
  }

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              {customerTotal}{' '}
              <span className="fs-6 fw-normal">
                ({customerDifference}%{' '}
                <CIcon icon={customerDifference > 0 ? cilArrowTop : cilArrowBottom} />)
              </span>
            </>
          }
          title="Customers"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: customerLabels
                  ? customerLabels
                  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: customerData ? customerData : [0, 0, 0, 0, 0, 0, 0],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              $
              {incomeHistoryData
                ? incomeHistoryData[incomeHistoryData.length - 1].toFixed(2)
                : '00.0'}{' '}
              <span className="fs-6 fw-normal">
                ({incomeDifference}%{' '}
                <CIcon icon={incomeDifference > 0 ? cilArrowTop : cilArrowBottom} />)
              </span>
            </>
          }
          title="Income"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: incomeHistoryLabels
                  ? incomeHistoryLabels
                  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: incomeHistoryData ? incomeHistoryData : [0, 0, 0, 0, 0, 0, 0],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              {serviceCountHistoryData
                ? serviceCountHistoryData[serviceCountHistoryData.length - 1]
                : ''}{' '}
              <span className="fs-6 fw-normal">
                ({serviceCountDataDifference}%{' '}
                <CIcon icon={serviceCountDataDifference > 0 ? cilArrowTop : cilArrowBottom} />)
              </span>
            </>
          }
          title="Services count"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: incomeHistoryLabels
                  ? incomeHistoryLabels
                  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-warning'),
                    data: serviceCountHistoryData ? serviceCountHistoryData : [0, 0, 0, 0, 0, 0, 0],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              {'$ '}
              {incomePerServicesData
                ? incomePerServicesData[incomePerServicesData.length - 1].toFixed(2)
                : '0'}{' '}
              <span className="fs-6 fw-normal">
                ({incomePerServicesDifference}%{' '}
                <CIcon icon={incomePerServicesDifference > 0 ? cilArrowTop : cilArrowBottom} />)
              </span>
            </>
          }
          title="Income / Services"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: incomeHistoryLabels
                  ? incomeHistoryLabels
                  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-danger'),
                    data: serviceCountHistoryData ? incomePerServicesData : [0, 0, 0, 0, 0, 0, 0],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default MainWidgetsDropdown
