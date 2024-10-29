import React, { useState, useRef, useEffect } from 'react';
import {
  Grid, TextField, Button, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton,Snackbar,
  Alert,
} from '@mui/material';
import { Edit as EditIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import logoImage from '../assets/logogr.png';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { generateDeliveryChallanPDF } from './DeliveryChallanPDF';
import { saveChallanToStorage, getLastChallanNumber } from './DeliveryChallanStorage';
const DeliveryChallan = () => {
  const [challanData, setChallanData] = useState({
    customerName: '',
    customerSubBranchName: '',
    gstNumber:'',
    shippingAddress: '',
    challanNumber: '',
    vehicleNumber:'',
    transportMode:'',
    driverName:'',
    contactNumber:'',
    challanDate: new Date().toISOString().slice(0, 10),
    items: [
      { description: '', width: 0, height: 0, qty: 1 },
    ],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(challanData.challanNumber);
  useEffect(() => {
    const newChallanNumber = getLastChallanNumber();
    setChallanData(prev => ({      ...prev,
      challanNumber: newChallanNumber
    }));
  }, []);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...challanData.items];
    items[index][name] = value;
    setChallanData({ ...challanData, items });
  };

  const addItem = () => {
    setChallanData(prevState => ({
      ...prevState,
      items: [
        ...prevState.items,
        { description: '', width: 0, height: 0, qty: 1 },
      ],
    }));
  };

  const deleteItem = (index) => {
    setChallanData(prevState => ({
      ...prevState,
      items: prevState.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotalQty = () => {
    return challanData.items.reduce((acc, item) => acc + (parseFloat(item.qty) || 0), 0);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setChallanData(prev => ({
      ...prev,
      challanNumber: tempValue
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(challanData.challanNumber);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const challanRef = useRef(null);
  const totals=calculateTotalQty();
  const handleGeneratePDF = () => {
    generateDeliveryChallanPDF(challanData,totals);
  };
  // Initialize invoice number when component mounts
 

  const handleSaveChallan = () => {
    // Add timestamp for sorting/reference
    const challanToSave = {
      ...challanData,
      timestamp: new Date().toISOString(),
    };

    if (saveChallanToStorage(challanToSave)) {
      setSnackbar({
        open: true,
        message: 'Challan saved successfully!',
        severity: 'success'
      });

   
      resetForm();
    } else {
      setSnackbar({
        open: true,
        message: 'Error saving challan',
        severity: 'error'
      });
    }
  };

  const resetForm = () => {
    const newChallanNumber = getLastChallanNumber();
    setChallanData({
        customerName: '',
        customerSubBranchName: '',
        gstNumber:'',
        shippingAddress: '',
        challanNumber: newChallanNumber,
    vehicleNumber:'',
    transportMode:'',
    driverName:'',
    contactNumber:'',
        challanDate: new Date().toISOString().slice(0, 10),
        items: [
          { description: '', width: 0, height: 0, qty: 1 },
        ],
    });
  };

  const tableStyles = {
    '& .MuiTableCell-root': {
      padding: '2px',
      fontSize: '10px',
      height: '32px'
    },
    '& .MuiInputBase-root': {
      height: '24px',
    },
    '& .MuiInputBase-input': {
      fontSize: '10px',
      padding: '2px 4px',
    }
  };

  return (
    <Grid>
      <Grid container ref={challanRef} sx={{ width: '70%', margin: '0 auto', padding: '20px', border: '1px solid #000', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
        {/* Header */}
        <Grid container spacing={2} alignItems="center">
  <Grid item>
    <img src={logoImage} alt="Company Logo" style={{ width: '150px' }} />
  </Grid>
  <Grid item xs>
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'red', textAlign: 'center' }}>
      Delivery Challan
    </Typography>
  </Grid>
</Grid>


        {/* Company and Delivery Address */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: 'bold', color: '#333', marginTop: '10px', fontSize: '10px' }}>Company Address:</Typography>
            <Typography sx={{ fontSize: '10px' }}>Road 6 Venkat Rao Nagar, Kukatpally,</Typography>
            <Typography sx={{ fontSize: '10px' }}>Hyderabad,Telangana - 500072</Typography>
           
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: 'bold', color: '#333', marginTop: '10px', fontSize: '10px' }}>Delivery Address:</Typography>
            <TextField
              fullWidth
              label="Customer Name"
              size="small"
              value={challanData.customerName}
              onChange={(e) => setChallanData({ ...challanData, customerName: e.target.value })}
              sx={{ marginBottom: '10px', backgroundColor: '#fff', '& .MuiInputLabel-root': { fontSize: '10px' }, '& .MuiInputBase-input': { 
                fontSize: '10px',
                padding: '2px 4px',
                height: '20px'
              } }}
            />
            <TextField
              fullWidth
              label="Sub Name"
              size="small"
              value={challanData.customerSubBranchName}
              onChange={(e) => setChallanData({ ...challanData, customerSubBranchName: e.target.value })}
              sx={{ marginBottom: '10px', backgroundColor: '#fff', '& .MuiInputLabel-root': { fontSize: '10px' }, '& .MuiInputBase-input': { 
                fontSize: '10px',
                padding: '2px 4px',
                height: '20px'
              } }}
            />
            <TextField
              fullWidth
              label="GST Number"
              size="small"
              value={challanData.gstNumber}
              onChange={(e) => setChallanData({ ...challanData, gstNumber: e.target.value })}
              sx={{ marginBottom: '10px', backgroundColor: '#fff', '& .MuiInputLabel-root': { fontSize: '10px' }, '& .MuiInputBase-input': { 
                fontSize: '10px',
                padding: '2px 4px',
                height: '20px'
              } }}
            />
            <TextField
              fullWidth
              label="Delivery Address"
              size="small"
              value={challanData.shippingAddress}
              multiline
              onChange={(e) => setChallanData({ ...challanData, shippingAddress: e.target.value })}
              sx={{ marginBottom: '10px', backgroundColor: '#fff', '& .MuiInputLabel-root': { fontSize: '10px' }, '& .MuiInputBase-input': { 
                fontSize: '10px',
                padding: '2px 4px',
                height: '20px'
              } }}
            />
          </Grid>
        </Grid>

        {/* Challan Number and Date */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {isEditing ? (
              <>
                <TextField
                  size="small"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  autoFocus
                  sx={{ width: '150px' }}
                />
                <IconButton size="small" onClick={handleSave} sx={{ ml: 1 }}>
                  <CheckIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleCancel}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <>
                <Typography sx={{ fontWeight: 'bold', color: '#333', fontSize: '10px' }}>
                  Challan Number: {challanData.challanNumber}
                </Typography>
                <IconButton size="small" onClick={handleEdit} sx={{ ml: 1 }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Challan Date"
              type="date"
              value={challanData.challanDate}
              onChange={(e) => setChallanData({ ...challanData, challanDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: '10px', backgroundColor: '#fff', '& .MuiInputLabel-root': { fontSize: '10px' }, '& .MuiInputBase-input': { fontSize: '10px' } }}
            />
          </Grid>
        </Grid>

        {/* Items Table */}
        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ ...tableStyles, border: '1px solid #000' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>S.No</TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Width</TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Height</TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Qty</TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {challanData.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <TextField
                          onChange={(e) => handleInputChange(e, index)}
                          size="small"
                          name='description'
                          multiline
                          rows={1}
                          maxRows={4}
                          sx={{
                            width: '250px',
                            '& .MuiInputBase-root': {
                              minHeight: '20px',
                              height: 'auto',
                            },
                            '& .MuiInputBase-input': {
                              fontSize: '10px',
                              padding: '2px 4px',
                              overflow: 'auto',
                              resize: 'vertical',
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="width"
                          type="number"
                          value={item.width}
                          onChange={(e) => handleInputChange(e, index)}
                          size="small"
                          sx={{ width: '50px' }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="height"
                          type="number"
                          value={item.height}
                          onChange={(e) => handleInputChange(e, index)}
                          size="small"
                          sx={{ width: '50px' }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="qty"
                          type="number"
                          value={item.qty}
                          onChange={(e) => handleInputChange(e, index)}
                          size="small"
                          sx={{ width: '50px' }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton color="error" onClick={() => deleteItem(index)}>
                          <DeleteIcon style={{fontSize: 18}}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {/* Add Item Button */}
        <Grid container justifyContent="flex-start">
          <Button variant="contained" onClick={addItem} sx={{ margin: '20px 0' }}>Add Item</Button>
        </Grid>

        {/* Total Quantity */}
        <Grid container justifyContent="flex-end" sx={{ marginTop: '20px' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Total Quantity: {calculateTotalQty()}
          </Typography>
        </Grid>

        {/* Signature */}
        <Grid item xs={12}>
          <Typography sx={{ textAlign: 'right', mt: 2, mr: 2 }}>
            Signature
          </Typography>
        </Grid>
      </Grid>

      {/* Download Button */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGeneratePDF}
          >
            Download Challan
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleSaveChallan}
          >
            Save Challan
          </Button>
        </Grid>
      </Grid>
        {/* Snackbar for notifications */}
        <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default DeliveryChallan;