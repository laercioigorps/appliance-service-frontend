import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import MainWidgetsDropdown from '../widgets/MainWidgetsDropdown'

async function getServiceStatus(days) {
  return fetch(`http://127.0.0.1:8000/services/services-by-status/${days}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
  }).then((data) => data.json())
}

const Dashboard = () => {
  const [loaded, setLoaded] = useState(false)

  const [serviceStatusData30, setServiceStatusData30] = useState()
  const [serviceStatusLabels30, setServiceStatusLabels30] = useState()

  const [serviceStatusData90, setServiceStatusData90] = useState()
  const [serviceStatusLabels90, setServiceStatusLabels90] = useState()

  useEffect(() => {
    if (!loaded) {
      getServiceStatus(30).then((response) => {
        setServiceStatusData30(response.data)
        setServiceStatusLabels30(response.labels)
        console.log(response)
      })
      getServiceStatus(90).then((response) => {
        setServiceStatusData90(response.data)
        setServiceStatusLabels90(response.labels)
        console.log(response)
      })
      setLoaded(true)
    }
  })
  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'class',
      _props: { scope: 'col' },
    },
    {
      key: 'heading_1',
      label: 'Heading',
      _props: { scope: 'col' },
    },
    {
      key: 'heading_2',
      label: 'Heading',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 1,
      class: 'Mark',
      heading_1: 'Otto',
      heading_2: '@mdo',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      class: 'Jacob',
      heading_1: 'Thornton',
      heading_2: '@fat',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      class: 'Larry the Bird',
      heading_2: '@twitter',
      _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
    },
  ]

  return (
    <>
      <MainWidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={6}>
              <CCard className="mb-4">
                <CChart
                  type="bar"
                  data={{
                    labels: serviceStatusLabels30
                      ? serviceStatusLabels30
                      : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: '30 days Services Status',
                        backgroundColor: '#0000FF',
                        data: serviceStatusData30
                          ? serviceStatusData30
                          : [40, 20, 12, 39, 10, 40, 39, 80, 40],
                      },
                    ],
                  }}
                  labels="months"
                />
              </CCard>
            </CCol>
            <CCol sm={6}>
              <CCard className="mb-4">
                <CChart
                  type="bar"
                  data={{
                    labels: serviceStatusLabels90
                      ? serviceStatusLabels90
                      : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: '90 days Services Status',
                        backgroundColor: '#f87979',
                        data: serviceStatusData90
                          ? serviceStatusData90
                          : [40, 20, 12, 39, 10, 40, 39, 80, 40],
                      },
                    ],
                  }}
                  labels="months"
                />
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
