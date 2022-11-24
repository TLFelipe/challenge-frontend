import React, { useCallback, useMemo } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form'
import Button from '@mui/material/Button'
import { TextField, Select, MenuItem, Modal, Typography, Box, InputLabel } from '@material-ui/core'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import InputMask from 'react-input-mask'

import useStyles from './styles'
import { API_URL } from '../../config/environment'

const ModalForm = ({ setOpen, data }) => {
  const styles = useStyles()

  const defaultValues = useMemo(() => {
    if(data) return data
  }, [data])

  const {register, control, handleSubmit} = useForm({ 
    defaultValues
  })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = useCallback(
    handleSubmit(formData => {
      axios.post(`${API_URL}/orders/`, formData).then(res => {
        if(res?.statusText === "Created")
          handleClose()
      })
    }), []
  )

  return (
    <Modal
      open
      onClose={handleClose}
    >
      <Box className={styles.container}>
        <Typography className={styles.title} variant="h6" component="h2">
          {data ? "Detalhes do pedido" : "Novo pedido"}
        </Typography>
        <form onSubmit={onSubmit}>
          <div className={styles.modalContent}>
            <div className={styles.modalColumn}>
              <div className={styles.modalTwoFields}>
                <TextField
                  label="Nome"
                  {...register("name", { required: true })}
                  className={styles.textField}
                  required={!data}
                  disabled={data}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({
                    field: { onChange, value} 
                  }) => (
                    <InputMask
                      label="Telefone"
                      mask="(99) 99999-9999"
                      value={value}
                      onChange={onChange}
                      className={styles.textField}
                      required={!data}
                      disabled={data}
                    >
                      {inputProps => {
                        return (
                          <TextField
                            disabled={data}
                            {...inputProps}
                          />
                        )
                      }}
                    </InputMask>
                  )}
                />
                
              </div>
              <TextField
                label="Descrição"
                {...register("order_description", { required: true })}
                multiline
                rows={4}
                required={!data}
                disabled={data}
              />
              <InputLabel>Categoria</InputLabel>
              <Controller
                name="order_category"
                control={control}
                defaultValue={null}
                render={({
                  field: { onChange, value} 
                }) => (
                  <Select
                    label="Categoria"
                    value={value}
                    onChange={onChange}
                    required={!data}
                    disabled={data}
                  >
                    <MenuItem value="hydraulics">Hidráulica</MenuItem>
                    <MenuItem value="infiltration">Infiltração</MenuItem>
                    <MenuItem value="electric">Elétrica</MenuItem>
                    <MenuItem value="furniture removal">Retirada de mobília</MenuItem>
                  </Select>
                )}
              />
            </div>
            <div className={styles.modalColumn}>
              <TextField
                label="Imobiliária"
                {...register("real_estate_agency", { required: true })}
                className={styles.textField}
                required={!data}
                disabled={data}
              />
              <TextField
                label="Empresa"
                {...register("company", { required: true })}
                className={styles.textField}
                required={!data}
                disabled={data}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="deadline"
                  control={control}
                  defaultValue={null}
                  render={({
                    field: { onChange, value }
                  }) =>
                    <DesktopDatePicker
                      label="Prazo"
                      value={value}
                      disabled={data}
                      className={styles.textField}
                      onChange={(value) =>
                        onChange(dayjs(value).format("YYYY-MM-DD"))
                      }
                      renderInput={(params) => 
                        <TextField
                          required={!data}
                          {...params}
                        />
                      }
                    />
                  }
                />
              </LocalizationProvider>
            </div>
          </div>
          {!data && (
            <div className={styles.modalButton}>
              <Button variant="contained" type="submit">
                Salvar
              </Button>
            </div>
          )}
        </form>
      </Box>
    </Modal>
  );
}

export default ModalForm;
