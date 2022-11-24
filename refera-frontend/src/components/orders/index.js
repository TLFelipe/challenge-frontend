import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import ModalForm from '../modal-form'

import useStyles from './styles'
import { API_URL } from '../../config/environment'

const DataTable = () => {
  const styles = useStyles()
  const [formOpen, setFormOpen] = useState(false)
  const [detailsInfo, setDetailsInfo] = useState(false)
  const [ordersData, setOrdersData] = useState([])

  const handleFormOpen = () => {
    setFormOpen(true)
  }

  const handleCellClick = (params) => {
    setDetailsInfo(params?.row)
  }

  useEffect(() => {
    axios.get(`${API_URL}/orders/`).then(res => {
      if(res?.data) setOrdersData(res?.data)
    })
  }, [formOpen, detailsInfo])

  const columns = [
    { field: 'id', headerName:'ID', width: 70 },
    { 
      field: 'order_category',
      headerName:'Categoria',
      width: 150,
      valueGetter: (params) => {
        if(params.row.order_category == "electric") return "Elétrica"
        else if(params.row.order_category == "infiltration") return "Infiltração"
        else if(params.row.order_category == "hydraulics") return "Hidráulica"
        else if(params.row.order_category == "furniture removal") return "Retirada de mobília"
        else return params.row.order_category
      }
    },
    {
      field: 'phone',
      headerName: 'Contato',
      sortable: false,
      width: 400,
      valueGetter: (params) =>
        `${params.row.name || ''} ${params.row.phone || ''}`,
    },
    { field: 'real_estate_agency', headerName:'Imobiliária', width: 200 },
    { field: 'company', headerName:'Empresa', width: 200 },
    { field: 'deadline', headerName: 'Prazo', type: 'number', width: 100, }
  ]

  return (
    <div className={styles.container}>
      <Button style={{marginBottom: 8}}variant="contained" onClick={handleFormOpen}>
        Novo pedido
      </Button>
      <DataGrid
        rows={ordersData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={handleCellClick}
        className={styles.dataGrid}
        disableSelectionOnClick
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'desc' }],
          },
        }}
      />
      {formOpen && <ModalForm setOpen={setFormOpen}/>}
      {detailsInfo && <ModalForm setOpen={setDetailsInfo} data={detailsInfo}/>}
    </div>
  );
}

export default DataTable
